import React, { Component } from 'react'
import axios from 'axios';
import '../stylesheets/Roster.css';
import RosterCard from './RosterCard'
import { Icon, Card, Avatar, Col, Row } from 'antd';
import "antd/dist/antd.css";
import * as decode from 'jwt-decode';

export default class Roster extends Component {
  state = {
    students: [],
    mentors: [],
    isMentor: this.props.ismentor
  };

  componentDidMount() {
    const tok = localStorage.getItem('anovaToken');
    const d_tok = decode(tok);

    fetch('http://localhost:5000/api/v1/rosterStudent?uid='+d_tok.id)
      .then(res => res.json())
      .then(students => {
          this.setState({
            students});
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      fetch('http://localhost:5000/api/v1/rosterMentor?uid='+d_tok.id)
        .then(res => res.json())
        .then(mentors1 => {
            this.setState({
              mentors: mentors1});
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
  }

  render() {
    let roster;
    const { isMentor, students, mentors } = this.state;
    if (isMentor) {
      roster = students.map(student => (
        <RosterCard key={student.id} person={student} mentor={isMentor} />
      ));
    } else {
      roster = mentors.map(mentor => (
        <RosterCard key={mentor.id} person={mentor} mentor={isMentor} />
      ));
    }

    return (
      <div className="container">
        <div className="containerGrid">{roster}</div>
      </div>
    );
  }
}
