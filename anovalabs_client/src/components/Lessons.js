import React, { Component } from 'react';
import LessonComponent from './LessonComponent';
import MentorLessonComponent from './MentorLessonComponent';

import '../stylesheets/Lessons.css';
import { GoPlus } from 'react-icons/go';

// TODO: Need to show lessons based on user's assigned ID'
class Lessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mentor: true,
      items: [
        {"id":1,
        "title":"Python 1 for inexperienced",
        "summary":"1st Python lesson",
        "link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405",
        "created_at":"2019-03-11T01:40:56.187Z",
        "updated_at":"2019-03-11T01:40:56.187Z",
        "date": "3/11"},
        {"id":1,
        "title":"Python 1 for inexperienced",
        "summary":"1st Python lesson",
        "link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405",
        "created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"},
        {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}
    ]
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/v1/lessons')
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  renderLessons = () => {
    if (!this.state.mentor) {
      return (
        <div className = "container">
          <div className = "lessonsContainer">

            {this.state.items.map(item => (
              <LessonComponent lessonDetails={item} />
            ))}

            <div className = "plusCard">
              <GoPlus size = {100} color='grey'/>
            </div>
          </div>
        </div>
      );
    } else {
      // return <h3> Lets go for a < GoPlus/>? </h3>
      return (
        <div className = "container">
          <div className = "lessonsContainer">

            {this.state.items.map(item => (
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

  render() {
    // TODO: these show behind the nav bar currently
    console.log(this.state.items);
    if (this.state.error) {
      return (<div>Error: {this.state.error.message}</div>);
    }
    if (!this.state.isLoaded) {
      return (<div>Loading...</div>);
    }

    let component = this.renderLessons();
    return (
      <div>
      {component}
      </div>
    );
  }
}
export default Lessons;
