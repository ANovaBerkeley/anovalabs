import React from 'react';

import '../stylesheets/LessonComponent.css';

export const LessonComponent = () => (
  <div className="card">
    <div className="lessonTitle">{this.props.lessonDetails.title}</div>
    <div className="date">{this.props.lessonDetails.date}</div>
    <div className="descriptionContainer">
      <div className="description">{this.props.lessonDetails.summary}</div>
    </div>
    <div className="buttonContainer">
      <div className="viewAssignment">
        <a href={this.props.lessonDetails.link}>View Assignment</a>
      </div>
    </div>
  </div>
);
export default LessonComponent;
