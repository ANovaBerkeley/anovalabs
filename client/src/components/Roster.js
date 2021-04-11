import React, { useEffect, useState } from 'react';
import '../stylesheets/Roster.css';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';
import 'antd/dist/antd.css';

const Roster = props => {
  const { isMentor } = props;

  const [mentorRoster, setMentorRoster] = useState([]);
  const [studentRoster, setStudentRoster] = useState([]);

  useEffect(() => {
    const tok = localStorage.getItem('anovaToken');
    const dTok = decode(tok);

    fetch(`/api/v1/roster?uid=${dTok.id}&roleToRetrieve=mentor`)
      .then(res => res.json())
      .then(roster => {
        setMentorRoster(roster);
      });

    fetch(`/api/v1/roster?uid=${dTok.id}&roleToRetrieve=student`)
      .then(res => res.json())
      .then(roster => {
        setStudentRoster(roster);
      });
  }, [isMentor]);

  const mentorRosterCards = mentorRoster.map(person => (
    <RosterCard key={person.id} person={person} mentorCard={true} isMentor={isMentor}/>
  ));

  const studentRosterCards = studentRoster.map(person => (
    <RosterCard key={person.id} person={person} mentorCard={false} isMentor={isMentor}/>
  ));

  return (
    <body>
      <div className="container">
        <h1 style={{ height: 'inherit' }}>Mentors</h1>
        <div className="containerGrid">{mentorRosterCards}</div>
        <h1 style={{ marginTop: '30px', height: 'inherit' }}>Students</h1>
        <div className="containerGrid">{studentRosterCards}</div>
      </div>
    </body>
  );
};

export default Roster;
