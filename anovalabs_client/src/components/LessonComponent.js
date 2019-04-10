import React, { Component } from 'react';

import '../stylesheets/LessonComponent.css';

// TODO: Need to show lessons based on user's assigned ID'
class LessonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
    };
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
          // <li key={123}>
          //
          // </li>
          <div className = "card">

            <div className = "lessonTitle">{this.props.lessonDetails.title}</div>
            <div className = "date">{this.props.lessonDetails.date}</div>
            <div className = "descriptionContainer">
              <div className = "description">{this.props.lessonDetails.summary}</div>
            </div>
            <div className = "buttonContainer">
              <div className = "viewAssignment">
                <a href={this.props.lessonDetails.link}>View Assignment</a>
              </div>
            </div>

          </div>


    );
  }
}
export default LessonComponent;
