import React, { Component } from 'react';
import '../stylesheets/Roster.css';
import { Button } from 'antd';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';
import 'antd/dist/antd.css';

export default class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: [],
      isMentor: this.props.ismentor,
      showAttendance: false,
      present: [],
    };

    this.attendanceClick = this.attendanceClick.bind(this);
    this.updateAttendance = this.updateAttendance.bind(this);
  }

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const dTok = decode(tok);
    const { isMentor } = this.state;

    let rosterFetchCall = `/api/v1/roster?uid=${dTok.id}`;
    if (isMentor) {
      rosterFetchCall += '&roleToRetrieve=student';
    } else {
      rosterFetchCall += '&roleToRetrieve=mentor';
    }

    fetch(rosterFetchCall)
      .then(res => res.json())
      .then(roster => {
        this.setState({ roster });
      });
  }

  updateAttendance(e, student) {
    const { present } = this.state;
    const studentId = student.state.userId;
    if (e.target.checked && !present.includes(studentId)) {
      present.push(studentId);
    } else if (!e.target.checked && present.includes(studentId)) {
      present.splice(present.indexOf(studentId), 1);
    }
  }

  attendanceClick() {
    const tok = localStorage.getItem('anovaToken');
    const dTok = decode(tok);
    if (this.state.showAttendance) {
      fetch(`/api/v1/site/updateAttendance?present=${this.state.present}&uid=${dTok.id}`,
           {method: 'POST'})
        .then(res => res.json())
      console.log(this.state.present);
      this.setState({ present : []});
    }
    this.setState({ showAttendance: !this.state.showAttendance });
  }

  renderAttendanceButton() {
    let maybeAttendanceButton;
    if (this.state.isMentor) {
      maybeAttendanceButton = (<div className = "innerContainer">
        <Button type='primary' size="large" onClick={this.attendanceClick}>
        {this.state.showAttendance ? "Submit" : "Track Attendance"}</Button>
      </div>);
    }
    return maybeAttendanceButton;
  }

  render() {
    const { isMentor, roster, showAttendance, } = this.state;
    const maybeAttendanceButton = this.renderAttendanceButton();
    const rosterCards = roster.map(person => (
      <RosterCard key={person.id} person={person} mentor={isMentor} showAttendance={showAttendance} updateAttendance={this.updateAttendance}/>));

    return (
      <div className="container">
        {maybeAttendanceButton}
        <div className="innerContainer">
           <div className="containerGrid">{rosterCards}</div>
        </div>
      </div>
    );
  }
}
