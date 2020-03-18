import React, { Component } from 'react';
import '../stylesheets/Roster.css';
import * as decode from 'jwt-decode';
import RosterCard from './RosterCard';

export default class Roster extends Component {
  state = {
    roster: [],
    isMentor: this.props.ismentor
  };

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const dTok = decode(tok);
    const { isMentor } = this.state;

    let rosterFetchCall = `http://localhost:5000/api/v1/roster?uid=${dTok.id}`;
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

  render() {
    const { isMentor, roster } = this.state;
    const rosterCards = roster.map(person => (
      <RosterCard key={person.id} person={person} mentor={isMentor} />
    ));

    return (
      <div className="container">
        <div className="grid-container">
          <div className="grid-row">{rosterCards}</div>
        </div>
      </div>
    );
  }
}
