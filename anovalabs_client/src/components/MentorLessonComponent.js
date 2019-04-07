
import React, { Component } from 'react';

import './MentorLessonComponent.css';



import { GoPlus } from 'react-icons/go';
import { GoTrashcan } from 'react-icons/go';
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
              // <GoPlus/>
              // </li>
              <div className = "card">

                <div className = "titleContainer">
                  <div className = "lessonTitle">
                  {this.props.lessonDetails.title}

                  </div>
                  <button className = "deleteButton">
                    <GoTrashcan size="20"/>
                  </button>
                </div>
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
