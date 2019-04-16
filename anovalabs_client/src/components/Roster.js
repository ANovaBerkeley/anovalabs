import React, { Component } from 'react'
import axios from 'axios';
import '../stylesheets/Roster.css';
import ProfileCard from './ProfileCard'
import { Icon, Card, Avatar, Col, Row } from 'antd';
import "antd/dist/antd.css";

var students = [
     {
          key : "1",
          profileimage: "https://image.flaticon.com/icons/svg/1141/1141771.svg",
          username: "John Smith",
          email: "potatofries@gmail.com",
          grade: "Senior",
          bio: "Once upon a time",
          candy: "Twix",
     },
     {
          key : "2",
          profileimage: "https://image.flaticon.com/icons/svg/1141/1141771.svg",
          username: "John Smithson",
          email: "potatopotato@gmail.com",
          grade: "Freshman",
          bio: "Once on time",
          candy: "Candy",
     },
     {
          key : "3",
          profileimage: "https://image.flaticon.com/icons/svg/1141/1141771.svg",
          username: "John Smithson",
          email: "potatopotato@gmail.com",
          grade: "Freshman",
          bio: "Once on time",
          candy: "Candy",
     },
     {
          key : "4",
          profileimage: "https://image.flaticon.com/icons/svg/1141/1141771.svg",
          username: "John Smithson",
          email: "potatopotato@gmail.com",
          grade: "Freshman",
          bio: "Once on time",
          candy: "Candy",
     },
     {
          key : "5",
          profileimage: "https://image.flaticon.com/icons/svg/326/326933.svg",
          username: "John Smithson",
          email: "potatopotato@gmail.com",
          grade: "Freshman",
          bio: "Once on time",
          candy: "Candy",
     },
     {
          key : "2",
          profileimage: "https://image.flaticon.com/icons/svg/1141/1141771.svg",
          username: "John Smithson",
          email: "potatopotato@gmail.com",
          grade: "Freshman",
          bio: "Once on time",
          candy: "Candy",
     },
     {
          key : "2",
          profileimage: "https://image.flaticon.com/icons/svg/1141/1141771.svg",
          username: "John Smithson",
          email: "potatopotato@gmail.com",
          grade: "Freshman",
          bio: "Once on time",
          candy: "Candy",
     }
]

export default class Roster extends Component {
     state = {
          mentor : false
     }
     render() {
          return (
               <div className="container">
               <div className="containerGrid">
               {students.map((student) => <ProfileCard key = {student.key} student = {student} mentor = {this.state.mentor}/>)}
               </div>
               </div>
          )
     }
}
