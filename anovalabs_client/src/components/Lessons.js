import React, { Component } from 'react';
import LessonComponent from './LessonComponent';

import './Lessons.css';

// TODO: Need to show lessons based on user's assigned ID'
class Lessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      items: [{
        title: "Lesson 2",
        siteLeader: "Caroline Liu",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla consequat neque nec placerat. ",
        date: "3/3/18"
      }, {
        title: "Lesson 2",
        siteLeader: "Peter",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla consequat neque nec placerat. ",
        date: "3/3/18"
      }, {
        title: "Lesson 2",
        siteLeader: "Peter",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla consequat neque nec placerat. ",
        date: "3/3/18"
      },{
        title: "Lesson 2",
        siteLeader: "Peter",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla consequat neque nec placerat. ",
        date: "3/3/18"
      },{
        title: "Lesson 2",
        siteLeader: "Peter",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla consequat neque nec placerat. ",
        date: "3/3/18"
      },{
        title: "Lesson 2",
        siteLeader: "Peter",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla consequat neque nec placerat. ",
        date: "3/3/18"
      }
    ]
    };
  }

  // componentDidMount() {
  //   fetch('http://localhost:5000/api/v1/lessons')
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         this.setState({
  //           isLoaded: true,
  //           items: result
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       error => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      // <ul>
      //   {items.map(item => (
      //     <li key={123}>
      //       <div>{"week 1"}</div>
      //       <div>{"item.siteLeader"}</div>
      //     </li>
      //   ))}
      // </ul>
      <div className = "container">
        <div className = "lessonsContainer">

          {items.map(item => (
            <LessonComponent lessonDetails={item}></LessonComponent>
          ))}


        </div>
      </div>
    );
  }
}
export default Lessons;
