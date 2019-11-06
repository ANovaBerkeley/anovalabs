
import React, { Component } from 'react';

import '../stylesheets/MentorLessonComponent.css';
import { Modal, Input, Button, Row, Col, Avatar, Popconfirm } from 'antd';


import { GoPlus } from 'react-icons/go';
import { GoTrashcan } from 'react-icons/go';
// TODO: Need to show lessons based on user's assigned ID'
class LessonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      showModal: false,
      items: [{"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}, {"id":1,"title":"Python 1 for inexperienced","summary":"1st Python lesson","link":"https://docs.google.com/presentation/u/2/d/1Ow8eswXrAmz6TGTJs3C5l0kxNubV5PFVy0xVIRm5SLA/edit?usp=drive_web&ouid=107773852241053411405","created_at":"2019-03-11T01:40:56.187Z","updated_at":"2019-03-11T01:40:56.187Z", "date": "3/11"}]


    };
    this.showModal = this.showModal.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/v1/lessons/all')
      .then(res => res.json())
      .then(allLessons => {
          this.setState({
            isLoaded: true,
            items: allLessons
          });
          //console.log(this.state.items);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  showModal(){
    this.setState({showModal:true});
  }

  delete() {
    console.log("bonongo");
    var showModal = false;


    fetch('http://localhost:5000/api/v1/lessons/delete',
      { method: 'POST',
        body: JSON.stringify({ title: this.props.lessonDetails.title}),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      })
      .then(res => res.json())
      .then(
        deleteLesson => {
          this.setState({ showModal: false });
      });

    this.setState(state => {
      console.log(this.props);
      const items = state.items.filter(item => item.id != this.props.lessonDetails.id);
    return {
      items,
      showModal
    }
  })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    const readable_date = new Date(this.props.lessonDetails.date).toLocaleDateString();
    if (error) {
      return <div>Error:{error.message}</div>;
    }
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    //TODO: popup for confirmation + onclick call delete api
        return (
              // <li key={123}>
              // <GoPlus/>
              // </li>
              <div className = "card">

                <div className = "titleContainer">
                  <div className = "lessonTitle">
                  {this.props.lessonDetails.title}

                  </div>
                  <Popconfirm
                    className="deleteModal"
                    title="Delete this Lesson?"
                    centered
                    visible={this.state.showModal}
                    onConfirm={() => this.delete()}
                    onCancel={() => this.setState({showModal:false})}
                  >
<<<<<<< HEAD
                  </Modal>

=======
                    <button className = "deleteButton" onClick = {() => this.showModal(true)} >
                       <GoTrashcan size="20"/>
                    </button>
                  </Popconfirm>

>>>>>>> 81ce5f334a37357da00b10bc7a0d99b33ae04ab6


                </div>
                <div className = "date">{readable_date}</div>
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
