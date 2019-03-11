import React, { Component } from 'react';

import './LessonComponent.css';

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
              <div className = "description">{this.props.lessonDetails.description}</div>
            </div>
            <div className = "buttonContainer">
              <input type="submit" value="View Assignment" />
            </div>
          </div>


    );
  }
}
export default LessonComponent;
