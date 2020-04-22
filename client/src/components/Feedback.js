import React, { Component } from 'react';
import { Popconfirm, Button, Modal, Row, Col, Input } from 'antd';
import { GoTrashcan } from 'react-icons/go';
import PropTypes from 'prop-types';
import * as decode from 'jwt-decode';

class Feedback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            studentRating: null,
            mentorRating: null,
            notes: null,
            lessonName: null,
            isMentor: this.props.isMentor,
            lessonID: this.props.match.params.id
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <div></div>
        );
    }
}