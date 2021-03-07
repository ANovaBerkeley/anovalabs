import React, { useEffect, useState } from 'react';
import '../stylesheets/Roster.css';
import { Button } from 'antd';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';
import 'antd/dist/antd.css';

const Roster = props => {
  const { ismentor } = props;
  //this.updateAttendance = this.updateAttendance.bind(this);

  const [roster, setRoster] = useState([]);
  const [takeAttendance, setTakeAttendance] = useState(false);
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

  const clickAttendance = () => {
    if (takeAttendance) {
      // TODO: API call
      console.log("attendance taken!!!!! present: ", present);
      setPresent([]);
    }
    setTakeAttendance(!takeAttendance);
  }

  const updateAttendance = (e, studentId) => {
    if (e.target.checked && !present.includes(studentId)) {
      present.push(studentId);
    } else if (!e.target.checked && present.includes(studentId)) {
      present.splice(present.indexOf(studentId), 1);
    }
    console.log(present);
  }

  const renderAttendanceButton = () => {
    let maybeAttendanceButton;
    if (ismentor) {
      maybeAttendanceButton = (<div className = "innerContainer">
        <Button type='primary' size="large" onClick={clickAttendance}>
        {takeAttendance ? "Submit" : "Take Attendance"}</Button>
      </div>);
    }
    return maybeAttendanceButton;
  }

  const maybeAttendanceButton = renderAttendanceButton();

  const rosterCards = roster.map(person => (
    <RosterCard key={person.id} person={person} mentor={ismentor} showCheckbox={takeAttendance} updateAttendance={updateAttendance}/>
  ));

  return (
    <div className="container">
      {maybeAttendanceButton}
      <div className="innerContainer">
        <div className="containerGrid">{rosterCards}</div>
      </div>
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
