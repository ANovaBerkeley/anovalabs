import React from 'react';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextEditor = props => {
  const { editMode, editorState, onChange } = props;

  const editing = editMode ? 'editing' : '';

  const handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
    }
  };

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  return (
    <div className={'textBox ' + editing}>
      {editMode && (
        <>
          <div>
            <button className="editorButton" onClick={onUnderlineClick}>
              U
            </button>
            <button className="editorButton" onClick={onBoldClick}>
              <b>B</b>
            </button>
            <button className="editorButton" onClick={onItalicClick}>
              <em>I</em>
            </button>
          </div>
          <div className="line" />
        </>
      )}
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        readOnly={!editMode}
      />
    </div>
  );
};

export default TextEditor;
