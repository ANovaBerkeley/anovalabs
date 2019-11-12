import React, { Component } from 'react'
import axios from 'axios';
import '../stylesheets/Roster.css';
import ProfileCard from './ProfileCard'
import { Icon, Card, Avatar, Col, Row } from 'antd';
import "antd/dist/antd.css";



export default class Roster extends Component {
  state = {
    students: [],
    mentors: [],
    mentor: true
  }
  componentDidMount() {
    fetch('http://localhost:5000/api/v1/rosterStudent')
      .then(res => res.json())
      .then(students1 => {
          this.setState({
            students: students1});
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      fetch('http://localhost:5000/api/v1/rosterMentor')
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
     if(!this.state.mentor) {
       return (
            <div className="container">
            <div className="containerGrid">
            {this.state.mentors.map((mentor, index) => <ProfileCard key = {index} student = {mentor} mentor = {this.state.mentor}/>)}
            </div>
            </div>
       )
     } else {
       return (
            <div className="container">
            <div className="containerGrid">
            {this.state.students.map((student, index) => <ProfileCard key = {index} student = {student} mentor = {this.state.mentor}/>)}
            </div>
            </div>
       )
     }
   }
}
