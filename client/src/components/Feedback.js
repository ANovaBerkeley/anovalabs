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
            lessonId: this.props.match.params.id
        };
    }
    componentDidMount() {
        var get_url = '/api/v1/lessons/get_feedback/';
        fetch(get_url + '?lessonId='+ lessonId)
            .then(res => res.json())
            .then(
                feedback => {
                    this.setState({
                        isLoaded: true,
                        notes:  feedback.mentor_feedback,
                     });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                },
            );
    }
    editFeedback() {
        var get_url = '/api/v1/lessons/submit_feedback/'
    }
    render() {
        return (
            <div></div>
        );
    }
}