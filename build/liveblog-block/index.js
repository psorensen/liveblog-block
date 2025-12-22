/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/liveblog-block/block.json"
/*!***************************************!*\
  !*** ./src/liveblog-block/block.json ***!
  \***************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"liveblog/liveblog-block","version":"0.1.0","title":"Liveblog","category":"widgets","icon":"welcome-write-blog","description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"textdomain":"liveblog-block","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

/***/ },

/***/ "./src/liveblog-block/edit.js"
/*!************************************!*\
  !*** ./src/liveblog-block/edit.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/liveblog-block/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







function Edit() {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();
  const postId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select('core/editor').getCurrentPostId();
  }, []);
  const currentUser = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select('core').getCurrentUser?.() || null;
  }, []);
  const blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select('core/block-editor').getBlocks();
  }, []);
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/editor');
  const [comments, setComments] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const [newEntryContent, setNewEntryContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const [isSubmitting, setIsSubmitting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [editingEntryId, setEditingEntryId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);
  const [editingContent, setEditingContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const [isUpdating, setIsUpdating] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [deletingEntryId, setDeletingEntryId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(null);

  // Update post meta when block is present
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (!postId) {
      return;
    }
    const hasLiveblogBlock = blockList => {
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
      editPost({
        meta: {
          liveblog: 'enable'
        }
      });
    }
  }, [postId, blocks, editPost]);
  const formatTimestamp = timestamp => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };
  const formatRelativeTime = timestamp => {
    if (!timestamp) return '';
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    if (diff < 60) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('just now', 'liveblog-block');
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return minutes === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('a minute ago', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('{count} minutes ago', 'liveblog-block').replace('{count}', minutes);
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return hours === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('an hour ago', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('{count} hours ago', 'liveblog-block').replace('{count}', hours);
    } else if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return days === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('a day ago', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('{count} days ago', 'liveblog-block').replace('{count}', days);
    } else if (diff < 2592000) {
      const weeks = Math.floor(diff / 604800);
      return weeks === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('a week ago', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('{count} weeks ago', 'liveblog-block').replace('{count}', weeks);
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      return months === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('a month ago', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('{count} months ago', 'liveblog-block').replace('{count}', months);
    } else {
      const years = Math.floor(diff / 31536000);
      return years === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('a year ago', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('{count} years ago', 'liveblog-block').replace('{count}', years);
    }
  };
  const fetchEntries = () => {
    if (!postId) {
      return;
    }

    // Get all entries by using a wide time range (0 to current timestamp)
    const startTime = 0;
    const endTime = Math.floor(Date.now() / 1000); // Current Unix timestamp

    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: `/liveblog/v1/${postId}/entries/${startTime}/${endTime}`
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    fetchEntries();
  }, [postId]);
  const handleSubmit = async e => {
    e.preventDefault();
    if (!newEntryContent.trim() || !postId || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const requestData = {
        crud_action: 'insert',
        post_id: postId,
        content: newEntryContent
      };
      if (currentUser?.id) {
        requestData.author_id = currentUser.id;
      }
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `/liveblog/v1/${postId}/crud`,
        method: 'POST',
        data: requestData
      });
      setNewEntryContent('');
      fetchEntries();
    } catch (error) {
      console.error('Error creating liveblog entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = entry => {
    setEditingEntryId(entry.id);
    setEditingContent(entry.content || '');
  };
  const handleCancelEdit = () => {
    setEditingEntryId(null);
    setEditingContent('');
  };
  const handleUpdate = async entryId => {
    if (!editingContent.trim() || !postId || isUpdating) {
      return;
    }
    setIsUpdating(true);
    try {
      const requestData = {
        crud_action: 'update',
        post_id: postId,
        entry_id: entryId,
        content: editingContent
      };
      if (currentUser?.id) {
        requestData.author_id = currentUser.id;
      }
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `/liveblog/v1/${postId}/crud`,
        method: 'POST',
        data: requestData
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
  const handleDelete = async entryId => {
    if (!window.confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Are you sure you want to delete this entry?', 'liveblog-block'))) {
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
        entry_id: entryId
      };
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `/liveblog/v1/${postId}/crud`,
        method: 'POST',
        data: requestData
      });
      fetchEntries();
    } catch (error) {
      console.error('Error deleting liveblog entry:', error);
    } finally {
      setDeletingEntryId(null);
    }
  };
  if (!comments) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
      ...blockProps,
      children: "Loading comments..."
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("h3", {
      children: ["Liveblog Entries (", comments.length, ")"]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("form", {
      onSubmit: handleSubmit,
      style: {
        marginBottom: '20px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
        value: newEntryContent,
        onChange: e => setNewEntryContent(e.target.value),
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Write a new liveblog entry...', 'liveblog-block'),
        rows: 4,
        style: {
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          fontFamily: 'inherit',
          fontSize: '14px'
        },
        disabled: isSubmitting
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
        type: "submit",
        disabled: !newEntryContent.trim() || isSubmitting,
        style: {
          padding: '8px 16px',
          backgroundColor: '#2271b1',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer'
        },
        children: isSubmitting ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Submitting...', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Submit Entry', 'liveblog-block')
      })]
    }), comments.map(entry => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      style: {
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #ddd'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '10px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("strong", {
            children: entry.authors?.[0]?.name || 'Unknown'
          }), entry.timestamp && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("span", {
            style: {
              marginLeft: '8px',
              fontSize: '12px',
              color: '#666'
            },
            children: [formatRelativeTime(entry.timestamp), " \u2022 ", formatTimestamp(entry.timestamp)]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          style: {
            display: 'flex',
            gap: '8px'
          },
          children: editingEntryId === entry.id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
            onClick: handleCancelEdit,
            style: {
              padding: '4px 8px',
              backgroundColor: '#ccc',
              color: 'black',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px'
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Cancel', 'liveblog-block')
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
              onClick: () => handleEdit(entry),
              style: {
                padding: '4px 8px',
                backgroundColor: '#2271b1',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Edit', 'liveblog-block')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
              onClick: () => handleDelete(entry.id),
              disabled: deletingEntryId === entry.id,
              style: {
                padding: '4px 8px',
                backgroundColor: '#dc3232',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: deletingEntryId === entry.id ? 'not-allowed' : 'pointer',
                fontSize: '12px',
                opacity: deletingEntryId === entry.id ? 0.6 : 1
              },
              children: deletingEntryId === entry.id ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Deleting...', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Delete', 'liveblog-block')
            })]
          })
        })]
      }), editingEntryId === entry.id ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("textarea", {
          value: editingContent,
          onChange: e => setEditingContent(e.target.value),
          rows: 4,
          style: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            fontFamily: 'inherit',
            fontSize: '14px'
          },
          disabled: isUpdating
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("button", {
          onClick: () => handleUpdate(entry.id),
          disabled: !editingContent.trim() || isUpdating,
          style: {
            padding: '8px 16px',
            backgroundColor: '#2271b1',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          },
          children: isUpdating ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Saving...', 'liveblog-block') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Save', 'liveblog-block')
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: entry.render
        }
      })]
    }, entry.id))]
  });
}

/***/ },

/***/ "./src/liveblog-block/editor.scss"
/*!****************************************!*\
  !*** ./src/liveblog-block/editor.scss ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/liveblog-block/index.js"
/*!*************************************!*\
  !*** ./src/liveblog-block/index.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/liveblog-block/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/liveblog-block/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/liveblog-block/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ },

/***/ "./src/liveblog-block/style.scss"
/*!***************************************!*\
  !*** ./src/liveblog-block/style.scss ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"liveblog-block/index": 0,
/******/ 			"liveblog-block/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkliveblog_block"] = globalThis["webpackChunkliveblog_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["liveblog-block/style-index"], () => (__webpack_require__("./src/liveblog-block/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map