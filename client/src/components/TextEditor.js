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

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onBulletClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))
  }

  const onHeaderClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'header-one'))
  }

  const onHeader2Click = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'header-two'))
  }

  const onHeader3Click = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'header-three'))
  }

  const onCodeClick = () => {
    onChange(RichUtils.toggleBlockType(editorState, 'code-block'))
  }

  const handleTab = (e) => {
    onChange(RichUtils.onTab(e, editorState, 4))
  }

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
            <button className="editorButton" onClick={onBulletClick}>
              Bullet
            </button>
            <button className="editorButton" onClick={onHeaderClick}>
              H1
            </button>
            <button className="editorButton" onClick={onHeader2Click}>
              H2
            </button>
            <button className="editorButton" onClick={onHeader3Click}>
              H3
            </button>
            <button className="editorButton" onClick={onCodeClick}>
              Code
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
        onTab={handleTab}
      />
    </div>
  );
};

export default TextEditor;
