import React, { Component } from 'react';
import { FiEdit } from 'react-icons/fi';
import ContentEditable from 'react-contenteditable';

import '../stylesheets/LessonPage.css';

export default class LessonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      title: '',
      descriptionHTML: '',
      resourcesHTML: '',
      labHTML: '',
      exitTicketHTML: '',
      mentor: this.props.ismentor,
    };
    // this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleResourcesChange = this.handleResourcesChange.bind(this);
    this.handleLabChange = this.handleLabChange.bind(this);
    this.handleExitTicketChange = this.handleExitTicketChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    fetch('/api/v1/lessons/' + this.props.id + '?id=' + this.props.id)
      .then(res => res.json())
      .then(lesson => {
        console.log('LESSON');
        console.log(lesson);
        this.setState(
          {
            title: lesson[0].title,
            descriptionHTML: lesson[0].descriptionHTML,
            resourcesHTML: lesson[0].resourcesHTML,
            labHTML: lesson[0].labHTML,
            exitTicketHTML: lesson[0].exitTicketHTML,
          },
          () => {
            console.log(this.state.title);
          },
        );
      })
      .then(() => {
        if (this.state.descriptionHTML === '') {
          this.setState({ descriptionHTML: '<p> </p>' });
        }
        if (this.state.resourcesHTMLL === '') {
          this.setState({ resourcesHTML: '<p> </p>' });
        }
        if (this.state.labHTML === '') {
          this.setState({ labHTML: '<p> </p>' });
        }
      });
  }

  /*
handleTitleChange(evt) {
  this.setState({title: evt.target.value});
}
*/

  handleDescriptionChange(evt) {
    this.setState({ descriptionHTML: evt.target.value });
  }

  handleResourcesChange(evt) {
    this.setState({ resourcesHTML: evt.target.value });
  }

  handleLabChange(evt) {
    this.setState({ labHTML: evt.target.value });
  }

  handleExitTicketChange(evt) {
    this.setState({ exitTicketHTML: evt.target.value });
  }

  saveChanges() {
    fetch('/api/v1/lessons/updatePage', {
      method: 'POST',
      body: JSON.stringify({
        lessonId: this.props.id,
        editedDescriptionHTML: this.state.descriptionHTML,
        editedResourcesHTML: this.state.resourcesHTML,
        editedLabHTML: this.state.labHTML,
        editedExitTicketHTML: this.state.exitTicketHTML,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(this.setState({ editMode: false }));
  }

  render() {
    let maybeEditButton;
    if (this.state.mentor) {
      maybeEditButton = (
        <button
          className="editButton"
          onClick={() => this.setState({ editMode: true })}
          type="button"
        >
          <FiEdit size="42" />
        </button>
      );
    }
    let maybeSaveButton;
    let editing = '';
    if (this.state.editMode) {
      maybeSaveButton = (
        <button className="saveButton" onClick={this.saveChanges} type="button">
          Save
        </button>
      );
      editing = 'editing';
    }
    return (
      <div className="page">
        <div className="lessonPageContainer">
          <div className="title-container">
            <h1 className="lessonPageTitle">{this.state.title}</h1>
            {maybeEditButton}
          </div>
          <ContentEditable
            className={'textBox ' + editing}
            html={this.state.descriptionHTML}
            disabled={!this.state.editMode}
            onChange={this.handleDescriptionChange} // handle innerHTML change
          />
          <h2 className="textTitle"> Lesson Resources </h2>
          <ContentEditable
            className={'textBox ' + editing}
            html={this.state.resourcesHTML}
            disabled={!this.state.editMode}
            onChange={this.handleResourcesChange} // handle innerHTML change
          />
          <h2 className="textTitle"> Lab </h2>
          <ContentEditable
            className={'textBox ' + editing}
            html={this.state.labHTML}
            disabled={!this.state.editMode}
            onChange={this.handleLabChange} // handle innerHTML change
          />
          <h2 className="textTitle"> Exit Ticket </h2>
          <ContentEditable
            className={'textBox ' + editing}
            html={this.state.exitTicketHTML}
            disabled={!this.state.editMode}
            onChange={this.handleExitTicketChange} // handle innerHTML change
          />
          {maybeSaveButton}
        </div>
      </div>
    );
  }
}
