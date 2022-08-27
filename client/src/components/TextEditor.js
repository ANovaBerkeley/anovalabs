import React from 'react';
import { RichUtils, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Editor from 'draft-js-plugins-editor';
import addLinkPlugin from '../utils/addLink.js';

const TextEditor = props => {
  const { editMode, editorState, onChange } = props;

  const editing = editMode ? 'editing' : '';

  const plugins = [addLinkPlugin];

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

  const onAddLinkClick = () => {
    const selection = editorState.getSelection();
    const link = window.prompt('Embed hyperlink here : ', 'https://');
    if (!link) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    } else if (!link.includes('http')) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
      window.alert('Error: Must include "https://" in link');
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      'create-entity',
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  return (
    <div className={'textBox ' + editing}>
      {editMode && (
        <>
          <div>
            <button className="editorButton" onClick={onBoldClick}>
              <b>B</b>
            </button>
            <button className="editorButton" onClick={onItalicClick}>
              <em>I</em>
            </button>
            <button className="editorButton" onClick={onUnderlineClick}>
              U
            </button>
            <button className="editorButton" onClick={onAddLinkClick}>
              Link
            </button>
          </div>
        </>
      )}
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        plugins={plugins}
        readOnly={!editMode}
      />
    </div>
  );
};

export default TextEditor;
