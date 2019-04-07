import React, { Component } from 'react';
import LessonComponent from './LessonComponent';
import MentorLessonComponent from './MentorLessonComponent';

import './Lessons.css';
import { GoPlus } from 'react-icons/go';

// TODO: Need to show lessons based on user's assigned ID'
class Lessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      mentor: true,
      items: [{"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}
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
    const { error, isLoaded, items, mentor } = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    if (!mentor){
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

            <div className = "plusCard">
              <GoPlus size = {100} color='grey'/>
            </div>


          </div>
        </div>
      );
    }
    if (mentor){
      // return <h3> Lets go for a < GoPlus/>? </h3>
      return (
        <div className = "container">
          <div className = "lessonsContainer">

            {items.map(item => (
              <MentorLessonComponent lessonDetails={item}></MentorLessonComponent>
            ))}

            <div className = "plusCard">
              <GoPlus size = {100} color='grey'/>
            </div>


          </div>
        </div>
      );
    }
  }
}
export default Lessons;
