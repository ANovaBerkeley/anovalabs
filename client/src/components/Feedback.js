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
            lessonId: this.props.matchparam
        };
    }
    componentDidMount() {
        var get_url = '/api/v1/lessons/get_feedback/';
        fetch(get_url + '?lessonId='+ this.lessonId)
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
    // editLessonDetails() {
    //   const { editedTitle, editedSummary, editedLink, lessonId } = this.state;
    //   if (editedSummary.length >= 255) {
    //     Modal.error({
    //       title: 'Exceeded maximum number of characters (255).',
    //       centered: true,
    //     });
    //     return;
    //   }
    //   fetch('/api/v1/lessons/update', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       editedTitle,
    //       editedSummary,
    //       editedLink,
    //       lessonId,
    //     }),
    //     headers: new Headers({
    //       'Content-Type': 'application/json',
    //     }),
    //   })
    //     .then(res => res.json())
    //     .then(values => {
    //       this.setState({
    //         showEditModal: false,
    //         title: editedTitle,
    //         summary: editedSummary,
    //         link: editedLink,
    //       });
    //     });
    // }

    render() {
        return (
            <div></div>
        );
    }
}

Feedback.defaultProps = {};
export default Feedback;
