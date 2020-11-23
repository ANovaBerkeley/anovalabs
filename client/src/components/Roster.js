import React, { useEffect, useState } from 'react';
import '../stylesheets/Roster.css';
import { Button } from 'antd';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';
import 'antd/dist/antd.css';

const Roster = props => {
  const { ismentor } = props;
  //this.attendanceClick = this.attendanceClick.bind(this);
  //this.updateAttendance = this.updateAttendance.bind(this);

  const [roster, setRoster] = useState([]);
  const [isMentor, setIsMentor] = useState(this.props.ismentor);
  const [showAttendance, setShowAttendance] = useState(false);
  const [present, setPresent] = useState([]);

  useEffect(() => {
    const tok = localStorage.getItem('anovaToken');
    const dTok = decode(tok);

    let rosterFetchCall = `/api/v1/roster?uid=${dTok.id}`;
    if (ismentor) {
      rosterFetchCall += '&roleToRetrieve=student';
    } else {
      rosterFetchCall += '&roleToRetrieve=mentor';
    }

    fetch(rosterFetchCall)
      .then(res => res.json())
      .then(roster => {
        setRoster(roster);
      });
  }, [ismentor]);

  const rosterCards = roster.map(person => (
    <RosterCard key={person.id} person={person} mentor={ismentor} />
  ));

  return (
    <div className="container">
      <div className="containerGrid">{rosterCards}</div>
    </div>
  );
};

export default Roster;
/*  }

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
    if (this.state.showAttendance) {
      // TODO: API call
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
*/
