import React, { useEffect, useState } from 'react';
import '../stylesheets/Roster.css';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';
import 'antd/dist/antd.css';

const Roster = props => {
  const { ismentor } = props;

  const [roster, setRoster] = useState([]);

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
