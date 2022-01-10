import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

const FeedbackModal = (props) => {
    const {lesson_id, title, site} = props;
    const [showModal, setShowModal] = useState(false);
    const [classFeedback, setClassFeedback] = useState([]);
    const [studentAverage, setStudentAverage] = useState(0);
    const [mentorAverage, setMentorAverage] = useState(0);

    const getClassFeedback = () => {
        fetch('/api/v1/feedback/get_class_feedback/' + "?class=" + site + "&lesson_id=" + lesson_id)
        .then(res => res.json())
        .then(
          result => {
            setClassFeedback(result.data)
            getAverageRatings(result.data)   
          }
        )
    }

    const getAverageRatings = (data) => {
        var [studentSum, studentCount, mentorSum, mentorCount] = [0, 0, 0, 0]
        for (let i = 0; i < data.length; i++) {
            if (data[i].mentor) {
                mentorSum += data[i].rating;
                mentorCount++;
            } else {
                studentSum += data[i].rating;
                studentCount++;
            }
        }
        if (studentSum > 0) {
            setStudentAverage(studentSum/studentCount);
        }
        if (mentorSum > 0) {
            setMentorAverage(mentorSum/mentorCount);
        }
        
    }

    useEffect(() => {
        getClassFeedback()
    }, [ showModal ])

    const mentorFeedback = classFeedback.filter(feedback => feedback.mentor);
    const studentFeedback = classFeedback.filter(feedback => !feedback.mentor);

    const mentorComps = mentorFeedback.map((feedback, index) => {
        return(
        <div style={{width: "95%"}}>
            <p><strong>Mentor {index + 1}</strong></p>
            <p>What did you think of today's lesson? <br></br>{feedback.text}</p>
            <p>General Feedback? <br></br>{feedback.gtext}</p>
        </div> 
        )
    })

    const studentComps = studentFeedback.map((feedback, index) => {
        return(
        <div style={{width: "95%"}}>
            <p><strong>Student {index + 1}</strong></p>
            <p>What did you think of today's lesson? <br></br>{feedback.text}</p>
            <p>General Feedback? <br></br>{feedback.gtext}</p>
        </div> 
        )
    })
    
    return (
        <div>

        <button className="submitButton" onClick={() => setShowModal(true)}> View All Feedbacks</button>

        <Modal 
            visible={showModal}
            title={""}
            onCancel={() => setShowModal(false)}
            footer={null}
            width={"80vw"}
            >
            <div className="feedbackModalSurround">
                <div className="feedbackModalLeft">  
                    <div className="feedbackScroll">
                        <h1 style={{color: "#0489c5", fontSize:"2em", height: "5vh"}}>Feedback</h1>
                        <h3>Mentors</h3>
                        {mentorComps}
                        <h3>Students</h3>
                        {studentComps}
                    </div> 
                </div>

                <div align="right" className="feedbackModalRight">
                    <div className="modalRightRect">
                        <div>
                            Lesson
                            <h2>{title}</h2>
                        </div>
                        
                    </div>

                    <div className="modalRightRect">
                        <div>
                            Student Lesson Rating
                            <h2>{studentAverage == 0 ? "No data" : studentAverage + "/5"}</h2>
                        </div>
                    </div>

                    <div className="modalRightRect">
                        <div>
                            Mentor Lesson Rating
                            <h2>{mentorAverage == 0 ? "No data" : mentorAverage + "/5"}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        </div>
    );
}

export default FeedbackModal;