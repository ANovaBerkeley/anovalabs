import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import TextEditor from './TextEditor';
import 'draft-js/dist/Draft.css';
import '../stylesheets/LessonPage.css';
import { handleErrors } from '../utils/helpers';

const LessonPage = props => {
  const { id, ismentor } = props;

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [replit, setReplit] = useState('');
  const [editedReplit, setEditedReplit] = useState();
  const [descriptionState, setDescriptionState] = useState(EditorState.createEmpty());
  const [resourcesState, setResourcesState] = useState(EditorState.createEmpty());
  const [labState, setLabState] = useState(EditorState.createEmpty());
  const [exitTicketState, setExitTicketState] = useState(EditorState.createEmpty());
  const [oldDescriptionState, setOldDescriptionState] = useState(
    EditorState.createEmpty(),
  );
  const [oldResourcesState, setOldResourcesState] = useState(EditorState.createEmpty());
  const [oldLabState, setOldLabState] = useState(EditorState.createEmpty());
  const [oldExitTicketState, setOldExitTicketState] = useState(EditorState.createEmpty());

  useEffect(() => {
    fetch('/api/v1/lessons/' + id + '?id=' + id)
      .then(res => res.json())
      .then(lesson => {
        setTitle(lesson[0].title);
        if (lesson[0].description_state) {
          const content = convertFromRaw(lesson[0].description_state);
          setDescriptionState(EditorState.createWithContent(content));
          setOldDescriptionState(EditorState.createWithContent(content));
        }
        if (lesson[0].resources_state) {
          const content = convertFromRaw(lesson[0].resources_state);
          setResourcesState(EditorState.createWithContent(content));
          setOldResourcesState(EditorState.createWithContent(content));
        }
        if (lesson[0].lab_state) {
          const content = convertFromRaw(lesson[0].lab_state);
          setLabState(EditorState.createWithContent(content));
          setOldLabState(EditorState.createWithContent(content));
        }
        if (lesson[0].exit_ticket_state) {
          const content = convertFromRaw(lesson[0].exit_ticket_state);
          setExitTicketState(EditorState.createWithContent(content));
          setOldExitTicketState(EditorState.createWithContent(content));
        }
        if (lesson[0].replitLink) {
          const content = lesson[0].replitLink
          setReplit(content);
          setEditedReplit(content);
        }
      });
  }, [id]);

  const handleDescriptionChange = newState => {
    setDescriptionState(newState);
    // console.log(newState);
  };

  const onChangeReplit = event => {
    setEditedReplit(event.target.value);
  }

  const handleResourcesChange = newState => {
    setResourcesState(newState);
  };

  const handleLabChange = newState => {
    setLabState(newState);
  };

  const handleExitTicketChange = newState => {
    setExitTicketState(newState);
  };

  const cancelChanges = () => {
    setDescriptionState(oldDescriptionState);
    setResourcesState(oldResourcesState);
    setLabState(oldLabState);
    setExitTicketState(oldExitTicketState);
    setEditMode(false);
  };

  const saveChanges = () => {
    fetch('/api/v1/lessons/updatePage', {
      method: 'POST',
      body: JSON.stringify({
        lessonId: id,
        editedDescriptionState: convertToRaw(descriptionState.getCurrentContent()),
        editedResourcesState: convertToRaw(resourcesState.getCurrentContent()),
        editedLabState: convertToRaw(labState.getCurrentContent()),
        editedExitTicketState: convertToRaw(exitTicketState.getCurrentContent()),
        editedReplitLink: editedReplit,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(handleErrors)
      .then(() => {
        setOldDescriptionState(descriptionState);
        setOldResourcesState(resourcesState);
        setOldLabState(labState);
        setOldExitTicketState(exitTicketState);
        setReplit(editedReplit);
        setEditMode(false);
      })
      .catch(() =>
        Modal.error({
          title: 'Unable to save changes.',
          centered: true,
        }),
      );
  };

  let maybeReplit;
  if (editMode) {
    maybeReplit = (
      <div>
        <h2 className="textTitle"> Examples </h2>
        <div className="textBox">
          <Input
            id="replitAdd"
            allowClear
            addonBefore="Replit link:"
            autosize="true"
            defaultValue={ replit || "https://replit.com/@anova/..." }
            onChange={onChangeReplit}
          />
        </div>
      </div>
    );
  } else if (replit) {
    maybeReplit = (
      <div>
        <h2 className="textTitle"> Examples </h2>
        <iframe 
          title="Replit example"
          className="textBox" 
          width="100%" 
          height="500px" 
          src={replit.concat("?lite=true")}
        />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="lessonPageContainer">
        <div className="title-container">
          <h1 className="lessonPageTitle">{title}</h1>
          {ismentor && (
            <button
              className="editButton"
              onClick={() => setEditMode(true)}
              type="button"
            >
              <FiEdit size="42" />
            </button>
          )}
        </div>
        <TextEditor
          editorState={descriptionState}
          editMode={editMode}
          onChange={handleDescriptionChange}
        />
        { maybeReplit }
        <h2 className="textTitle"> Lesson Resources </h2>
        <TextEditor
          editorState={resourcesState}
          editMode={editMode}
          onChange={handleResourcesChange}
        />
        <h2 className="textTitle"> Lab </h2>
        <TextEditor
          editorState={labState}
          editMode={editMode}
          onChange={handleLabChange}
        />
        <h2 className="textTitle"> Exit Ticket </h2>
        <TextEditor
          editorState={exitTicketState}
          editMode={editMode}
          onChange={handleExitTicketChange}
        />
        {editMode && (
          <div className="buttonsContainer">
            <button className="cancelButton" onClick={cancelChanges} type="button">
              Cancel
            </button>
            <button className="saveButton" onClick={saveChanges} type="button">
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
