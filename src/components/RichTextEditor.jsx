import React, { useRef, useState, useEffect } from 'react';
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiCheckSquare,
  FiCode,
  FiLink,
  FiEye,
  FiEdit3,
} from 'react-icons/fi';
import './RichTextEditor.css';

export default function RichTextEditor({ value = '', onChange, placeholder = 'Write your content here...' }) {
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' | 'preview'
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (command, val = null) => {
    if (activeTab !== 'edit') {
      setActiveTab('edit');
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          document.execCommand(command, false, val);
          handleInput();
        }
      }, 50);
      return;
    }

    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, val);
      handleInput();
    }
  };

  const addHeading = (tag) => {
    exec('formatBlock', `<${tag}>`);
  };

  const addLink = () => {
    const url = prompt('Enter link URL (e.g. https://...):');
    if (url) {
      exec('createLink', url);
    }
  };

  return (
    <div className="rich-text-editor-container">
      {/* TOOLBAR */}
      <div className="rte-toolbar">
        <div className="rte-group">
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('bold')}
            title="Bold (Ctrl+B)"
          >
            <FiBold />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('italic')}
            title="Italic (Ctrl+I)"
          >
            <FiItalic />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('underline')}
            title="Underline (Ctrl+U)"
          >
            <FiUnderline />
          </button>
        </div>

        <div className="rte-group">
          <button
            type="button"
            className="rte-btn text-btn"
            onClick={() => addHeading('h2')}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            className="rte-btn text-btn"
            onClick={() => addHeading('h3')}
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            className="rte-btn text-btn"
            onClick={() => addHeading('p')}
            title="Paragraph"
          >
            P
          </button>
        </div>

        <div className="rte-group">
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('insertUnorderedList')}
            title="Bullet List"
          >
            <FiList />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => exec('insertOrderedList')}
            title="Numbered List"
          >
            <FiCheckSquare />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => addHeading('blockquote')}
            title="Quote Block"
          >
            “
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={() => addHeading('pre')}
            title="Code Block"
          >
            <FiCode />
          </button>
          <button
            type="button"
            className="rte-btn"
            onClick={addLink}
            title="Insert Link"
          >
            <FiLink />
          </button>
        </div>

        {/* Tab switcher: Edit vs Preview */}
        <div className="rte-tabs">
          <button
            type="button"
            className={`rte-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <FiEdit3 /> Edit
          </button>
          <button
            type="button"
            className={`rte-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <FiEye /> Preview
          </button>
        </div>
      </div>

      {/* EDITOR AREA */}
      {activeTab === 'edit' ? (
        <div
          ref={editorRef}
          className="rte-content-area"
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder}
          suppressContentEditableWarning
        />
      ) : (
        <div
          className="rte-preview-area"
          dangerouslySetInnerHTML={{
            __html: value || '<p style="color:#64748b; font-style:italic;">No content to preview.</p>',
          }}
        />
      )}
    </div>
  );
}
