import React, { Component } from 'react';
import { FiEdit } from 'react-icons/fi';
import ContentEditable from 'react-contenteditable'

export default class LessonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      title: "",
      description: "",
      resources: "",
      lab: "",
      exitTicket: "",
      mentor: this.props.ismentor,
    };
  }


  componentDidMount() {
    fetch('/api/v1/lessons/?id=' + this.props.match.params.id)
      .then(res => res.json())
      .then(lesson => {
        this.setState({
          title: '<p>' + lesson.title + '</p>',
          description: '<p>' + lesson.summary + '</p>',
          resources: '<p>' + lesson.link + '</p>'
        })
      });
  }

handleTitleChange(evt) {
  this.setState({title: evt.target.value});
};

handleDescriptionChange(evt) {
  this.setState({description: evt.target.value});
};

handleResourcesChange(evt) {
  this.setState({resources: evt.target.value});
};

handleLabChange(evt) {
  this.setState({lab: evt.target.value});
};

handleExitTicketChange(evt) {
  this.setState({exitTicket: evt.target.value});
};

render() {
  return (
    <div className="lessonPageContainer">
      <div className="Title">
        <h1>
          <ContentEditable
            className="Title"
            html={this.state.title}
            disabled={!this.state.editMode}
            onChange={this.handleTitleChange} // handle innerHTML change
            />
        </h1>
        if (mentor) {
          <button
            className="editButton"
            onClick={() => this.setState({ editMode: true })}
            type="button"
          >
            <FiEdit size="50" />
          </button>
        }
      </div>
      <ContentEditable
        className="textBox"
        html={this.state.description}
        disabled={!this.state.editMode}
        onChange={this.handleDescriptionChange} // handle innerHTML change
      />
      <h2> Lesson Resources </h2>
      <ContentEditable
        className="textBox"
        html={this.state.resources}
        disabled={!this.state.editMode}
        onChange={this.handleResourcesChange} // handle innerHTML change
      />
      <h2> Lab </h2>
      <ContentEditable
        className="textBox"
        html={this.state.lab}
        disabled={!this.state.editMode}
        onChange={this.handleLabChange} // handle innerHTML change
      />
      <h2> Exit Ticket </h2>
      <ContentEditable
        className="textBox"
        html={this.state.exitTicket}
        disabled={!this.state.editMode}
        onChange={this.handleExitTicketChange} // handle innerHTML change
      />
    </div>
  )
}
}
