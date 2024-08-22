import React, { useState } from 'react';
import styles from '../quiz/Createquizmodal.module.css';
import Quizform from './Quizform';

function Createquizmodal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [quizDetails, setQuizDetails] = useState({
        quizName: '',
        questionType: 'qa',
    });

    const handleQuizTypeClick = (type) => {
        setQuizDetails((prevDetails) => ({
            ...prevDetails,
            questionType: type,
        }));
    };

    const handleQuizDetailChange = (e) => {
        const { name, value } = e.target;
        setQuizDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (quizDetails.quizName) {
            setStep(2);
        } else {
            alert('Please enter a quiz name.');
        }
    };

    const handleCancel = () => {
        setStep(1);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalLayout}>
            <div className={styles.modalContent}>
                {step === 1 ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <input
                                    type="text"
                                    placeholder="Quiz name"
                                    name="quizName"
                                    value={quizDetails.quizName}
                                    onChange={handleQuizDetailChange}
                                />
                            </div>
                            <div className={styles.quizType}>
                                <label htmlFor="quizType">Quiz Type</label>
                                <div
                                    className={`${styles.type1} ${
                                        quizDetails.questionType === 'qa' ? styles.selected : ''
                                    }`}
                                    onClick={() => handleQuizTypeClick('qa')}
                                >
                                    Q&A
                                </div>
                                <div
                                    className={`${styles.type2} ${
                                        quizDetails.questionType === 'poll' ? styles.selected : ''
                                    }`}
                                    onClick={() => handleQuizTypeClick('poll')}
                                >
                                    Poll
                                </div>
                            </div>
                            <div className={styles.formActions}>
                                <button type="button" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit">Continue</button>
                            </div>
                        </form>
                    </>
                ) : (
                    <Quizform
                        onCancel={handleCancel}
                        onCreate={handleSubmit}
                        quizDetails={quizDetails} // Pass quizDetails to Quizform
                    />
                )}
            </div>
        </div>
    );
}

export default Createquizmodal;
