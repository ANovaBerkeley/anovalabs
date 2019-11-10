import React, { Component } from 'react';
import { Modal, Input, Button, Row, Col, Avatar, Alert } from 'antd';
import { GoPlus } from 'react-icons/go';
import LessonComponent from './LessonComponent';
import MentorLessonComponent from './MentorLessonComponent';
import '../stylesheets/LessonPool.css';

// TODO: Need to show lessons based on user's assigned ID'
// TODO: this should not differ from the lesson componenent in that it should not show a date
class LessonPool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      mentor: true,
      showModal: false,
      items: [],
      usedIds:  []
    };
    this.showModal = this.showModal.bind(this);
    this.showErrorModal = this.showErrorModal.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/v1/lessons/all')
      .then(res => res.json())
      .then(
        allLessons => {
          this.setState({
            isLoaded: true,
            items: allLessons
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

  showModal() {
    this.setState({ showModal: true });
  }

  showErrorModal(){
    this.setState({showErrorModal:true})
  }

  generateId = nums => {
    const swap = (i, j) => {
      const tmp = nums[i];
      nums[i] = nums[j];
      nums[j] = tmp;
  };

  for (let i = 0; i < nums.length; i++) {
      while (
        0 < nums[i] &&
        nums[i] - 1 < nums.length &&
        nums[i] != i + 1 &&
        nums[i] != nums[nums[i] - 1]) {
          swap(i, nums[i] - 1);
      }
  }

  for (let i = 0; i < nums.length; i++) {
      if (nums[i] != i + 1) {
          return i + 1;
      }
  }
  return nums.length + 1;
  }

  deleteHandler(lessonDetails) {
    fetch('http://localhost:5000/api/v1/lessons/delete', {
      method: 'POST',
      body: JSON.stringify({ id: lessonDetails.id }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(() =>
      this.setState(prevState => ({
        items: prevState.items.filter(item => item.id !== lessonDetails.id)
      }))
    );
  }

  applyChanges() {
    var titleAdd = document.getElementById("titleAdd");
    var summaryAdd = document.getElementById("summaryAdd");
    var linkAdd = document.getElementById("linkAdd");
    var today = new Date();
    var todayStr = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "Z";
    var showModal = false;
    var usedIds = []
    for (let i = 0; i < this.state.items.length; i++) {
      usedIds = usedIds.concat(this.state.items[i].id)
    }
    let nextId = this.generateId(usedIds)

    if (titleAdd.value == "" || summaryAdd.value == "" || linkAdd.value == "") {
      Modal.error({
          title: 'Please fill out all fields.',
          centered: true
        });
      return;
    } else {

      fetch('http://localhost:5000/api/v1/lessons/add',
        { method: 'POST',
          body: JSON.stringify({ title: titleAdd.value, summary: summaryAdd.value, link: linkAdd.value }),
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
        })
        .then(res => res.json())
        .then(
          addedLesson => {
            console.log(addedLesson);
            this.setState({ showModal: false });
        });

      this.setState(state => {
          const items = state.items.concat({
          id: nextId,
          title: titleAdd.value,
          summary: summaryAdd.value,
          link: linkAdd.value,
          created_at: todayStr,
          updated_at: todayStr,
          date: today.getMonth()+1 + "/" + today.getDate()
        })
      return {
        items,
        showModal
      }
    }
      )
  }
}


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
        <div className = "container">
          <div className='lessons_title'>
            <h1>All Lessons</h1>
          </div>
          <div className = "lessonPoolContainer">
            {items.map(item => (
              <LessonComponent  lessonDetails={item}></LessonComponent>
            ))}
          </div>
        </div>
      );
    }
    if (mentor){
      // return <h3> Lets go for a < GoPlus/>? </h3>
      return (
        <div className = "container">
          <div className='lessons_title'>
            <h1>All Lessons</h1>
          </div>
          <div className = "lessonPoolContainer">
            {items.map(item => (
              <MentorLessonComponent deleteHandler={this.deleteHandler} lessonDetails={item}></MentorLessonComponent>
            ))}
            <button className = "plusCard" onClick={() => this.showModal(true)}>
              <GoPlus size = {100} color='grey'/>
            </button>

            <Modal
              className="addModal"
              title="Add a New Lesson"
              centered
              visible={this.state.showModal}
              onOk={() => this.applyChanges()}
              onCancel={() => this.setState({showModal:false})}
            >
              <div className="addFields">
                    <Row>
                        <Col>
                              <Input id="titleAdd" allowClear={true} addonBefore="Title:" autosize={true} defaultValue= ""></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                              <Input id="summaryAdd" allowClear={true} addonBefore="Summary:" autosize="true" defaultValue=""></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                              <Input id="linkAdd" allowClear={true} addonBefore="Link:" autosize="true" defaultValue=""></Input>
                        </Col>
                    </Row>
              </div>
          </Modal>



          </div>
        </div>

      );
    }
  }
}
export default LessonPool;
