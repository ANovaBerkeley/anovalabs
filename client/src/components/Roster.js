import React, { useEffect, useState } from 'react';
import '../stylesheets/Roster.css';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { UserRefreshClient } from 'google-auth-library';

const Roster = props => {
  const { isMentor } = props;

  const [mentorRoster, setMentorRoster] = useState([]);
  const [studentRoster, setStudentRoster] = useState([]);
  const [showActive, setShowActive] = useState(true);
  const [showAll, setShowAll] = useState(false);

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
    <RosterCard key={person.id} person={person} mentorCard={true} isMentor={isMentor} />
  ));

  const studentRosterCards = studentRoster.map(person => (
    <RosterCard
      key={person.id}
      person={person}
      mentorCard={false}
      isMentor={isMentor}
      showActive={showActive}
      showAll={showAll}
    />
  ));

  const renderFilterButtons = () => {
    let filterButtons;
    if (isMentor) {
      filterButtons = (
        <div>
          <Button
            className="studentFilterButtons"
            onClick={() => {
              setShowActive(true);
              setShowAll(false);
            }}
          >
            Active
          </Button>
          <Button
            className="studentFilterButtons"
            onClick={() => {
              setShowActive(false);
              setShowAll(false);
            }}
          >
            Inactive
          </Button>
          <Button
            className="studentFilterButtons"
            onClick={() => {
              setShowAll(true);
            }}
          >
            All
          </Button>
        </div>
      );
    }
    return filterButtons;
  };

  const maybeFilterButtons = renderFilterButtons();

  return (
    <body>
      <div className="container">
        <h1 style={{ height: 'inherit' }}>Mentors</h1>
        <div className="containerGrid">{mentorRosterCards}</div>
        <div>
          <h1 style={{ marginTop: '30px', height: 'inherit' }}>Students</h1>
          {maybeFilterButtons}
        </div>
        <div className="containerGrid">{studentRosterCards}</div>
      </div>
    </body>
  );
};

export default Roster;
