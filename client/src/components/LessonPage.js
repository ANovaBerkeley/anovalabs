import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import ContentEditable from 'react-contenteditable';

import '../stylesheets/LessonPage.css';


const LessonPage = props => {
  const { id, ismentor } = props;

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [descriptionHTML, setDescriptionHTML] = useState('');
  const [resourcesHTML, setResourcesHTML] = useState('');
  const [labHTML, setLabHTML] = useState('');
  const [exitTicketHTML, setExitTicketHTML] = useState('');

  useEffect(() => {
    fetch('/api/v1/lessons/' + id + '?id=' + id)
      .then(res => res.json())
      .then(lesson => {
        setTitle(lesson[0].title);
        setDescriptionHTML(lesson[0].descriptionHTML);
        setResourcesHTML(lesson[0].resourcesHTML);
        setLabHTML(lesson[0].labHTML);
        setExitTicketHTML(lesson[0].exitTicketHTML);
      });
  }, [id]);

  const handleDescriptionChange = evt => {
    setDescriptionHTML(evt.target.value);
  };

  const handleResourcesChange = evt => {
    setResourcesHTML(evt.target.value);
  };

  const handleLabChange = evt => {
    setLabHTML(evt.target.value);
  };

  const handleExitTicketChange = evt => {
    setExitTicketHTML(evt.target.value);
  };

  const saveChanges = () => {
    fetch('/api/v1/lessons/updatePage', {
      method: 'POST',
      body: JSON.stringify({
        lessonId: id,
        editedDescriptionHTML: descriptionHTML,
        editedResourcesHTML: resourcesHTML,
        editedLabHTML: labHTML,
        editedExitTicketHTML: exitTicketHTML,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(setEditMode(false));
  };

  let maybeEditButton;
  if (ismentor) {
    maybeEditButton = (
      <button className="editButton" onClick={() => setEditMode(true)} type="button">
        <FiEdit size="42" />
      </button>
    );
  }
  let maybeSaveButton;
  let editing = '';
  if (editMode) {
    maybeSaveButton = (
      <button className="saveButton" onClick={saveChanges} type="button">
        Save
      </button>
    );
    editing = 'editing';
  }
  return (
    <div className="page">
      <div className="lessonPageContainer">
        <div className="title-container">
          <h1 className="lessonPageTitle">{title}</h1>
          {maybeEditButton}
        </div>
        <ContentEditable
          className={'textBox ' + editing}
          html={descriptionHTML}
          disabled={!editMode}
          onChange={handleDescriptionChange} // handle innerHTML change
        />
        <h2 className="textTitle"> Lesson Resources </h2>
        <ContentEditable
          className={'textBox ' + editing}
          html={resourcesHTML}
          disabled={!editMode}
          onChange={handleResourcesChange} // handle innerHTML change
        />
        <h2 className="textTitle"> Lab </h2>
        <ContentEditable
          className={'textBox ' + editing}
          html={labHTML}
          disabled={!editMode}
          onChange={handleLabChange} // handle innerHTML change
        />
        <h2 className="textTitle"> Exit Ticket </h2>
        <ContentEditable
          className={'textBox ' + editing}
          html={exitTicketHTML}
          disabled={!editMode}
          onChange={handleExitTicketChange} // handle innerHTML change
        />
        {maybeSaveButton}
      </div>
    </div>
  );
};

export default LessonPage;
