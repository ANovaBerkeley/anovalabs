import React, { useEffect, useState } from 'react';
import '../stylesheets/Roster.css';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';
import 'antd/dist/antd.css';
import { Button, Radio } from 'antd';
import { UserRefreshClient } from 'google-auth-library';

const Roster = props => {
  const { isMentor } = props;
  const [mentorRoster, setMentorRoster] = useState([]);
  const [studentRoster, setStudentRoster] = useState([]);
  const [showActive, setShowActive] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('active');

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

  const handleFilterChange = e => {
    setFilter(e.target.value);
    if (e.target.value === 'active') {
      setShowActive(true);
      setShowAll(false);
    } else if (e.target.value === 'inactive') {
      setShowActive(false);
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  const renderFilterButtons = () => {
    let filterButtons;
    if (isMentor) {
      filterButtons = (
        <div style={{padding: '0px 0px 20px 0px'}}>
          <Radio.Group value={filter} onChange={handleFilterChange}>
            <Radio.Button
              value="active"
              className="studentFilterButtons"
            >
              Active
            </Radio.Button>
            <Radio.Button
              value="inactive"
              className="studentFilterButtons"
            >
              Inactive
            </Radio.Button>
            <Radio.Button
              value="all"
              className="studentFilterButtons"
            >
              All
            </Radio.Button>
          </Radio.Group>
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
