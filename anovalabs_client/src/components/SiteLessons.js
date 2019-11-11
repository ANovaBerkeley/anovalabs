import React, { Component } from 'react';
import { Avatar, List, Button, Modal, Row, Col } from 'antd';
import { DatePicker, Checkbox, Select} from 'antd';
import { GoPlus } from 'react-icons/go';
import LessonCard from './LessonCard';
import '../stylesheets/SiteLessons.css';
import * as decode from 'jwt-decode';
// import '../stylesheets/Lessons.css';

// TODO: Need to show lessons based on user's assigned ID'
// TODO: display site name at top

// TODO
// add protocol for when component doesn't mount
// add is loaded: false handling in comopnent did mount
// add documentation for each function

// calls API setting state + preparing lessons

  // TODO: make items more descriptions .mentor should be is mentor (make smol function)
  // eg site lessons
class SiteLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentor: true,
      showModal: false,
      siteLessons: [],
      allLessons: [],
      site: 'default',
      modalSelectedValue: '',
      modalDate: ''
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);

    fetch('http://localhost:5000/api/v1/profile/'+d_tok.id + '?uid=' + d_tok.id)
      .then(res => res.json())
      .then(profile => {

          this.setState({
            mentor: profile[0].role == 'mentor'
          });
        });

    fetch('http://localhost:5000/api/v1/lessons/site?uid='+d_tok.id)
      .then(res => res.json())
      .then(site => {
          this.setState({
            site
          });
        });
    fetch('http://localhost:5000/api/v1/lesson_site/all?uid='+d_tok.id)

      .then(res => res.json())
      .then(siteLessons => {
        this.setState({
          siteLessons
        });
      });
    fetch('http://localhost:5000/api/v1/lessons/all')
      .then(res => res.json())
      .then(allLessons => {
        this.setState({
          allLessons
        });
      });
  }

  onChangeCheck(e) {
    console.log('checked = ', e.target.checked);
  }

  addLesson(item, date) {
    console.log(date);
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);
    fetch('http://localhost:5000/api/v1/lesson_site/add?uid='+d_tok.id, {
      method: 'POST',
      body: JSON.stringify({ lesson_id: item, date: date}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(_ => {
        this.showModal(false);
        this.setState(prevState => ({
          siteLessons: [...prevState.siteLessons, item]
        }));
      });
  }

  showModal(bool) {
    this.setState({ showModal: bool });
  }

  deleteHandler(lessonDetails) {
    fetch('http://localhost:5000/api/v1/lesson_site/delete', {
      method: 'POST',
      body: JSON.stringify({ lesson_id: lessonDetails.id }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(() =>
      this.setState(prevState => ({
        siteLessons: prevState.siteLessons.filter(
          lesson => lesson.id !== lessonDetails.id
        )
      }))
    );
  }

  onChange(date, dateString) {
    this.setState({ modalDate: dateString });
  }

  onSelectChange(value) {
    this.setState({ modalSelectedValue: value });
  }

  onBlur() {
    console.log('blur');
  }

  onFocus() {
    console.log('focus');
  }

  onSearch(val) {
    console.log('search:', val);
  }

  renderLessons = () => {
    const {
      mentor,
      siteLessons,
      allLessons,
      addLesson,
      showModal,
      site
    } = this.state;
    if (!mentor) {
      return (
        <div className="container">
        <div className='title'>
          <h1>All Lessons</h1>
        </div>
          <div className="lessonsContainer">
            {siteLessons.map(item => (
              <LessonCard lessonDetails={item} />
            ))}
          </div>
        </div>
      );
    }


    return (
      <div className="container">
        <div className="lessons_title">
          <h1>{this.site} All Lessons</h1>
        </div>
        <div className="lessonsContainer">
          {siteLessons.map(item => (
            <LessonCard
              deleteHandler={this.deleteHandler}
              lessonDetails={item}
            />
          ))}
          <div className="plusCard">
            <GoPlus
              onClick={() => this.showModal(true)}
              size={100}
              color="grey"
            />
            <Modal
              className="addModal"
              title="Add a Lesson"
              centered
              visible={showModal}
              onOk={() => this.addLesson(this.state.modalSelectedValue, this.state.modalDate)}
              onCancel={() => this.showModal(false)}
            >
              <div className="addLesson">
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a lesson"
                  optionFilterProp="children"
                  onChange={this.onSelectChange.bind(this)}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.allLessons.map((item, index) => (
                     <Option value={index+1}>{item.title}</Option> ))}
                </Select>
                  <br />
              <div> <DatePicker onChange={this.onChange.bind(this)}/> </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const component = this.renderLessons();
    return <div>{component}</div>;
  }
}
export default SiteLessons;
