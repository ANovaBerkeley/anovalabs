import React, { Component, useEffect, useState } from 'react';
import '../stylesheets/FeedbackPage.css';
import { Redirect } from 'react-router-dom';
import * as decode from 'jwt-decode';
import { getAnovaToken } from '../utils/utils';
import FeedbackModal from "./FeedbackModal";

const Feedback = (props) => {
    const lessonId = props.id;
    const isMentor = props.ismentor;

    const [uid, setUid] = useState(props.userid);

    const [submitted, setSubmitted] = useState(false);
    const [exists, setExists] = useState(false);

    const [lessonText, setLessonText] = useState("");
    const [generalText, setGeneralText] = useState("");
    const [title, setTitle] = useState("");
    const [site, setSite] = useState("");

    const [rating, setRating] = useState(null);

    useEffect(() => {
        const tok = localStorage.getItem('anovaToken');
        const d_tok = decode(tok);
        var {id} = decode(getAnovaToken());

        fetch(`/api/v1/site/current?uid=${d_tok.id}`)
            .then(res => res.json())
            .then(siteFound => {
                setSite(siteFound.schoolName);
            });

        fetch('/api/v1/lessons/' + lessonId + '?id=' + lessonId)
            .then(res => res.json())
            .then(lesson => {
                console.log(lesson[0].title);
                setTitle(lesson[0].title); 
            })

        var id_str = id.toString();
        setUid(id_str);
        

        const get_url = '/api/v1/feedback/get_feedback/';
        fetch(get_url + id_str+ "?lesson_id=" + lessonId + "&uid=" + id_str)
        .then(res => res.json())
        .then(  
            result => {
                if (result.data.length > 0) {
                    setLessonText(result.data[0].text)
                    setGeneralText(result.data[0].gtext);
                    setRating(result.data[0].rating)
                    setExists(true);
                }
            },
            error => {
                console.log("no match found");
            },
        )
        }, [])
    
    const submitFeedback = (() => {
        fetch('/api/v1/feedback/submit_feedback', {
            method: 'POST',
            body: JSON.stringify({
              uid: uid,
              lesson_id: lessonId,
              text: lessonText,
              rating: rating,
              mentor: isMentor,
              gtext: generalText,
              site_name: site
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          }).then(setSubmitted(true));
    })

    const updateFeedback = (() => {
        fetch('/api/v1/feedback/update', {
            method: 'POST',
            body: JSON.stringify({
                text: lessonText,
                gtext: generalText,
                uid: uid,
                rating: rating,
                lessonId: lessonId
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(setSubmitted(true));
    })

    return (
        (submitted ? <Redirect to="/SiteLessons" /> :
        
        <div className="page">
        <h1 id="lessonTitle">{title}</h1>
        <div className="feedbackBoxContainer">
          <h3>What did you think of today's lesson?</h3>
          <textarea
            className="feedbackTextarea"
            placeholder="Add feedback"
            defaultValue={lessonText}
            onChange={event => setLessonText(event.target.value)}
          ></textarea>
        </div>
        <div className="feedbackBoxContainer">
          <h3>General Feedback/Thoughts?</h3>
          <textarea
            className="feedbackTextarea"
            placeholder="Add feedback"
            defaultValue={generalText}
            onChange={event => setGeneralText(event.target.value)}
          ></textarea>
        </div>
        <div className="ratingContainer">
          <h3 className="rateText">Rate today's lesson on a scale from 1-5!</h3>
          <div className="buttonContainer">
            <button
              className={rating === 1 ? 'rate-selected' : 'rate'}
              onClick={() => setRating(1)}
              type="button"
            >
              1
            </button>
            <button
              className={rating === 2 ? 'rate-selected' : 'rate'}
              onClick={() => setRating(2)}
              type="button"
            >
              2
            </button>
            <button
              className={rating === 3 ? 'rate-selected' : 'rate'}
              onClick={() => setRating(3)}
              type="button"
            >
              3
            </button>
            <button
              className={rating === 4 ? 'rate-selected' : 'rate'}
              onClick={() => setRating(4)}
              type="button"
            >
              4
            </button>
            <button
              className={rating === 5 ? 'rate-selected' : 'rate'}
              onClick={() => setRating(5)}
              type="button"
            >
              5
            </button>  
          </div>
        </div>
        
        <div className = "feedbackButtons">
          {isMentor ?
            <FeedbackModal 
              lesson_id={lessonId} 
              title={title}
              site={site}
            /> : 
            null
          }
          <button
            className="submitButton"
            onClick={() => {exists ? updateFeedback() : submitFeedback()}}
            type="button"
          >
            {exists ? 'Save Changes' : 'Submit Feedback'}
          </button>
        </div> 
      </div>
      )
    )


}

Feedback.defaultProps = {};
export default Feedback;

