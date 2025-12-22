import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps();
	const postId = useSelect((select) => {
		return select('core/editor').getCurrentPostId();
	}, []);
	const currentUser = useSelect((select) => {
		return select('core').getCurrentUser?.() || null;
	}, []);
	const blocks = useSelect((select) => {
		return select('core/block-editor').getBlocks();
	}, []);
	const { editPost } = useDispatch('core/editor');

	const [comments, setComments] = useState(null);
	const [newEntryContent, setNewEntryContent] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingEntryId, setEditingEntryId] = useState(null);
	const [editingContent, setEditingContent] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const [deletingEntryId, setDeletingEntryId] = useState(null);

	// Update post meta when block is present
	useEffect(() => {
		if (!postId) {
			return;
		}

		const hasLiveblogBlock = (blockList) => {
			for (const block of blockList) {
				if (block.name === 'liveblog/liveblog-block') {
					return true;
				}
				if (block.innerBlocks && block.innerBlocks.length > 0) {
					if (hasLiveblogBlock(block.innerBlocks)) {
						return true;
					}
				}
			}
			return false;
		};

		if (hasLiveblogBlock(blocks)) {
			editPost({ meta: { liveblog: 'enable' } });
		}
	}, [postId, blocks, editPost]);

	const formatTimestamp = (timestamp) => {
		if (!timestamp) return '';
		const date = new Date(timestamp * 1000);
		return date.toLocaleString();
	};

	const formatRelativeTime = (timestamp) => {
		if (!timestamp) return '';
		const now = Math.floor(Date.now() / 1000);
		const diff = now - timestamp;

		if (diff < 60) {
			return __('just now', 'liveblog-block');
		} else if (diff < 3600) {
			const minutes = Math.floor(diff / 60);
			return minutes === 1 
				? __('a minute ago', 'liveblog-block')
				: __('{count} minutes ago', 'liveblog-block').replace('{count}', minutes);
		} else if (diff < 86400) {
			const hours = Math.floor(diff / 3600);
			return hours === 1
				? __('an hour ago', 'liveblog-block')
				: __('{count} hours ago', 'liveblog-block').replace('{count}', hours);
		} else if (diff < 604800) {
			const days = Math.floor(diff / 86400);
			return days === 1
				? __('a day ago', 'liveblog-block')
				: __('{count} days ago', 'liveblog-block').replace('{count}', days);
		} else if (diff < 2592000) {
			const weeks = Math.floor(diff / 604800);
			return weeks === 1
				? __('a week ago', 'liveblog-block')
				: __('{count} weeks ago', 'liveblog-block').replace('{count}', weeks);
		} else if (diff < 31536000) {
			const months = Math.floor(diff / 2592000);
			return months === 1
				? __('a month ago', 'liveblog-block')
				: __('{count} months ago', 'liveblog-block').replace('{count}', months);
		} else {
			const years = Math.floor(diff / 31536000);
			return years === 1
				? __('a year ago', 'liveblog-block')
				: __('{count} years ago', 'liveblog-block').replace('{count}', years);
		}
	};

	const fetchEntries = () => {
		if (!postId) {
			return;
		}

		// Get all entries by using a wide time range (0 to current timestamp)
		const startTime = 0;
		const endTime = Math.floor(Date.now() / 1000); // Current Unix timestamp

		apiFetch({
			path: `/liveblog/v1/${postId}/entries/${startTime}/${endTime}`,
		}).then(response => {
			// Response structure: { entries: [...], latest_timestamp: ..., refresh_interval: ..., pages: ... }
			const entries = response?.entries || [];
			
			// Filter out invalid entries: empty content, delete type, or no render content
			const validEntries = entries.filter(entry => {
				// Exclude entries with no content
				if (!entry.content || entry.content.trim() === '') {
					return false;
				}
				// Exclude entries with no render content (empty HTML)
				if (!entry.render || entry.render.trim() === '' || entry.render.trim() === '<p></p>') {
					return false;
				}
				// Exclude delete type entries
				if (entry.type === 'delete') {
					return false;
				}
				return true;
			});
			
			// Ensure entries are in descending order (newest first) by timestamp
			const sortedEntries = [...validEntries].sort((a, b) => {
				const timestampA = a.timestamp || a.entry_time || 0;
				const timestampB = b.timestamp || b.entry_time || 0;
				return timestampB - timestampA;
			});
			setComments(sortedEntries);
		}).catch(error => {
			console.error('Error fetching liveblog entries:', error);
			setComments([]);
		});
	};

	useEffect(() => {
		fetchEntries();
	}, [postId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (!newEntryContent.trim() || !postId || isSubmitting) {
			return;
		}

		setIsSubmitting(true);

		try {
			const requestData = {
				crud_action: 'insert',
				post_id: postId,
				content: newEntryContent,
			};

			if (currentUser?.id) {
				requestData.author_id = currentUser.id;
			}

			await apiFetch({
				path: `/liveblog/v1/${postId}/crud`,
				method: 'POST',
				data: requestData,
			});

			setNewEntryContent('');
			fetchEntries();
		} catch (error) {
			console.error('Error creating liveblog entry:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEdit = (entry) => {
		setEditingEntryId(entry.id);
		setEditingContent(entry.content || '');
	};

	const handleCancelEdit = () => {
		setEditingEntryId(null);
		setEditingContent('');
	};

	const handleUpdate = async (entryId) => {
		if (!editingContent.trim() || !postId || isUpdating) {
			return;
		}

		setIsUpdating(true);

		try {
			const requestData = {
				crud_action: 'update',
				post_id: postId,
				entry_id: entryId,
				content: editingContent,
			};

			if (currentUser?.id) {
				requestData.author_id = currentUser.id;
			}

			await apiFetch({
				path: `/liveblog/v1/${postId}/crud`,
				method: 'POST',
				data: requestData,
			});

			setEditingEntryId(null);
			setEditingContent('');
			fetchEntries();
		} catch (error) {
			console.error('Error updating liveblog entry:', error);
		} finally {
			setIsUpdating(false);
		}
	};

	const handleDelete = async (entryId) => {
		if (!window.confirm(__('Are you sure you want to delete this entry?', 'liveblog-block'))) {
			return;
		}

		if (!postId || deletingEntryId) {
			return;
		}

		setDeletingEntryId(entryId);

		try {
			const requestData = {
				crud_action: 'delete',
				post_id: postId,
				entry_id: entryId,
			};

			await apiFetch({
				path: `/liveblog/v1/${postId}/crud`,
				method: 'POST',
				data: requestData,
			});

			fetchEntries();
		} catch (error) {
			console.error('Error deleting liveblog entry:', error);
		} finally {
			setDeletingEntryId(null);
		}
	};


	if (!comments) {
		return <p {...blockProps}>Loading comments...</p>;
	}

	return (
		<div {...blockProps}>
			<h3>Liveblog Entries ({comments.length})</h3>
			
			<form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
				<textarea
					value={newEntryContent}
					onChange={(e) => setNewEntryContent(e.target.value)}
					placeholder={__('Write a new liveblog entry...', 'liveblog-block')}
					rows={4}
					style={{
						width: '100%',
						padding: '8px',
						marginBottom: '10px',
						fontFamily: 'inherit',
						fontSize: '14px',
					}}
					disabled={isSubmitting}
				/>
				<button
					type="submit"
					disabled={!newEntryContent.trim() || isSubmitting}
					style={{
						padding: '8px 16px',
						backgroundColor: '#2271b1',
						color: 'white',
						border: 'none',
						borderRadius: '3px',
						cursor: 'pointer',
					}}
				>
					{isSubmitting ? __('Submitting...', 'liveblog-block') : __('Submit Entry', 'liveblog-block')}
				</button>
			</form>

			{comments.map(entry => (
				<div key={entry.id} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
						<div>
							<strong>{entry.authors?.[0]?.name || 'Unknown'}</strong>
							{entry.timestamp && (
								<span style={{ marginLeft: '8px', fontSize: '12px', color: '#666' }}>
									{formatRelativeTime(entry.timestamp)} • {formatTimestamp(entry.timestamp)}
								</span>
							)}
						</div>
						<div style={{ display: 'flex', gap: '8px' }}>
							{editingEntryId === entry.id ? (
								<button
									onClick={handleCancelEdit}
									style={{
										padding: '4px 8px',
										backgroundColor: '#ccc',
										color: 'black',
										border: 'none',
										borderRadius: '3px',
										cursor: 'pointer',
										fontSize: '12px',
									}}
								>
									{__('Cancel', 'liveblog-block')}
								</button>
							) : (
								<>
									<button
										onClick={() => handleEdit(entry)}
										style={{
											padding: '4px 8px',
											backgroundColor: '#2271b1',
											color: 'white',
											border: 'none',
											borderRadius: '3px',
											cursor: 'pointer',
											fontSize: '12px',
										}}
									>
										{__('Edit', 'liveblog-block')}
									</button>
									<button
										onClick={() => handleDelete(entry.id)}
										disabled={deletingEntryId === entry.id}
										style={{
											padding: '4px 8px',
											backgroundColor: '#dc3232',
											color: 'white',
											border: 'none',
											borderRadius: '3px',
											cursor: deletingEntryId === entry.id ? 'not-allowed' : 'pointer',
											fontSize: '12px',
											opacity: deletingEntryId === entry.id ? 0.6 : 1,
										}}
									>
										{deletingEntryId === entry.id ? __('Deleting...', 'liveblog-block') : __('Delete', 'liveblog-block')}
									</button>
								</>
							)}
						</div>
					</div>
					{editingEntryId === entry.id ? (
						<div>
							<textarea
								value={editingContent}
								onChange={(e) => setEditingContent(e.target.value)}
								rows={4}
								style={{
									width: '100%',
									padding: '8px',
									marginBottom: '10px',
									fontFamily: 'inherit',
									fontSize: '14px',
								}}
								disabled={isUpdating}
							/>
							<button
								onClick={() => handleUpdate(entry.id)}
								disabled={!editingContent.trim() || isUpdating}
								style={{
									padding: '8px 16px',
									backgroundColor: '#2271b1',
									color: 'white',
									border: 'none',
									borderRadius: '3px',
									cursor: 'pointer',
								}}
							>
								{isUpdating ? __('Saving...', 'liveblog-block') : __('Save', 'liveblog-block')}
							</button>
						</div>
					) : (
						<div dangerouslySetInnerHTML={{ __html: entry.render }} />
					)}
				</div>
			))}
		</div>
	);
}
