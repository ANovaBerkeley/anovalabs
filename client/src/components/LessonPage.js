import React, { useState, useEffect } from 'react';
import { Modal, Input, Row, Col, DatePicker } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import TextEditor from './TextEditor';
import 'draft-js/dist/Draft.css';
import '../stylesheets/LessonPage.css';
import { handleErrors } from '../utils/helpers';

// added 4/12
import { GoPlus } from 'react-icons/go';

const LessonPage = props => {
  const { id, ismentor } = props;

  const [showModal, setShowModal] = useState(false); // added 4/12
  const [modalDate, setModalDate] = useState(''); // added 4/12

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
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
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetch('/api/v1/lessons/' + id + '?id=' + id)
      .then(res => res.json())
      .then(lesson => {
        setTitle(lesson[0].title);
        setSummary(lesson[0].summary);
        console.log(lesson[0]);
        if (lesson[0].description_state) {
          const content = convertFromRaw(lesson[0].description_state);
          console.log(content);
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

      });
  }, [id]);

  const handleDescriptionChange = newState => {
    setDescriptionState(newState);
    console.log(newState);
  };

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
        setEditMode(false);
      })
      .catch(() =>
        Modal.error({
          title: 'Unable to save changes.',
          centered: true,
        }),
      );
  };
  
  const onDateChange = date => {
    setModalDate(date);
  };

  const addLessonToPool = () => {
    const titleAdd = document.getElementById('titleAdd');
    const summaryAdd = document.getElementById('summaryAdd');

    if (!titleAdd.value || !summaryAdd.value) {
      Modal.error({
        title: 'Please fill out all fields.',
        centered: true,
      });
    } else {
      const item = {
        title: titleAdd.value,
        summary: summaryAdd.value,
      };
      fetch('/api/v1/lessons/add', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(handleErrors)
        .then(newLessonInfo => {
          item['id'] = newLessonInfo.id;
          setShowModal(false);
        })
        .catch(() =>
          Modal.error({
            title: 'Unable to add lesson.',
            centered: true,
          }),
        );
    }
  };

  let makeCopy;
  if (ismentor) {
    makeCopy = (
      <div>
        <button type="button" onClick={() => setShowModal(true)}>
          Copy
        </button>

        <Modal
          className="addModal"
          title="Add a New Lesson"
          centered
          visible={showModal}
          onOk={addLessonToPool}
          onCancel={() => setShowModal(false)}
        >
          <div className="addFields">
            <Row>
              <Col>
                <Input
                  id="titleAdd"
                  allowClear
                  addonBefore="Title:"
                  autosize="true"
                  defaultValue={"Copy of " + title}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Input
                  id="summaryAdd"
                  allowClear
                  addonBefore="Summary:"
                  autosize="true"
                  defaultValue={summary}
                />
              </Col>
            </Row>
            <Row>
              <DatePicker onChange={onDateChange} />
            </Row>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="lessonPageContainer">
        <div className="title-container">
          <h1 className="lessonPageTitle">{title}</h1>
          {ismentor && (
            <div>
              <button
                className="editButton"
                onClick={() => setEditMode(true)}
                type="button"
              >
                <FiEdit size="42" />
              </button>
              {/* change made 4/12 */}
              {makeCopy} 
            </div>
          )}
        </div>
        <TextEditor
          editorState={descriptionState}
          editMode={editMode}
          onChange={handleDescriptionChange}
        />
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
