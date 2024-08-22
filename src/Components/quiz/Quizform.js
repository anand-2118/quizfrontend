import React, { useState } from 'react';
import styles from '../quiz/Quizform.module.css';

function QuizForm({ quizDetails, onCancel }) {
    const [questions, setQuestions] = useState([
        { text: '', questionType: quizDetails.questionType,optionType: 'text', selectedOption: null, options: ['', '', '', ''], timer: 'off' },
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Handle changes to the question text
    const handleQuestionTextChange = (e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].text = e.target.value;
        setQuestions(updatedQuestions);
    };


    const handleOptionTypeChange = (e) => {
        const { value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].optionType = value;
        setQuestions(updatedQuestions);
    };


    // Handle option change for the current question
    const handleOptionChange = (optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].selectedOption = optionIndex;
        setQuestions(updatedQuestions);
    };

    // Handle option type change for the current question
    const handleOptionTextChange = (e, index) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].options[index] = e.target.value;
        setQuestions(updatedQuestions);
    };

    // Handle timer change for the current question
    const handleTimerChange = (timerValue) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].timer = timerValue;
        setQuestions(updatedQuestions);
    };

    // Add a new question and reset the form for the next question
    const handleAddQuestion = () => {
        if (questions.length < 5) {
            setQuestions([...questions, { text: '',optionType: 'text', questionType: quizDetails.questionType, selectedOption: null, options: ['', '', '', ''], timer: 'off' }]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     const updatedQuestions = [...questions];
    //     updatedQuestions[currentQuestionIndex][name] = value;
    //     setQuestions(updatedQuestions);
    // };

    // Navigate to a specific question
    const handleNavigateToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    // Handle form submission
    const handleSubmit = () => {
        // Submit the quiz form here, e.g., send the questions array to the server
        console.log('Quiz Submitted:', questions);
        // Redirect to a "Quiz Created" page or show a success message
    };

    return (
        <div className={styles.quizForm}>

            <div className={styles.questionNavigation}>
                {questions.map((_, index) => (
                    <button
                        key={index}
                        className={index === currentQuestionIndex ? styles.activeQuestionButton : styles.questionButton}
                        onClick={() => handleNavigateToQuestion(index)}
                    >
                        {index + 1}
                    </button>
                ))}
                {questions.length < 5 && (
                    <button className={styles.addQuestionButton} onClick={handleAddQuestion}>
                        + 
                    </button>
                )}
            </div>

            <div className={styles.questionInput}>
                <label>Question Text:</label>
                <input
                    type="text"
                    value={questions[currentQuestionIndex].text}
                    onChange={handleQuestionTextChange}
                    placeholder={`Enter Question ${currentQuestionIndex + 1}`}
                />
            </div>

            <div className={styles.optionType}>
                <label>Option Type</label>
                <div>
                    <input
                        type="radio"
                        id="text"
                        name="optionType"
                        value="text"
                        checked={questions[currentQuestionIndex].optionType === 'text'}
                        onChange={handleOptionTypeChange}
                    />
                    <label htmlFor="text">Text</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="imageUrl"
                        name="optionType"
                        value="imageUrl"
                        checked={questions[currentQuestionIndex].optionType === 'imageUrl'}
                        onChange={handleOptionTypeChange}
                    />
                    <label htmlFor="imageUrl">Image URL</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="textImageUrl"
                        name="optionType"
                        value="textImageUrl"
                        checked={questions[currentQuestionIndex].optionType === 'textImageUrl'}
                        onChange={handleOptionTypeChange}
                    />
                    <label htmlFor="textImageUrl">Text and Image URL</label>
                </div>
            </div>

            <div className={styles.optionType}>
                <label>Options:</label>
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className={styles.option}>
                        <input
                            type="radio"
                            id={`option${index}`}
                            name={`answer${currentQuestionIndex}`}
                            checked={questions[currentQuestionIndex].selectedOption === index}
                            onChange={() => handleOptionChange(index)}
                        />
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionTextChange(e, index)}
                            placeholder={`Option ${index + 1}`}
                        />
                    </div>
                ))}
            </div>

            <div className={styles.timer}>
                <h4>Timer:</h4>
                <button onClick={() => handleTimerChange('off')} className={questions[currentQuestionIndex].timer === 'off' ? styles.activeTimerButton : ''}>
                    Off
                </button>
                <button onClick={() => handleTimerChange('5 sec')} className={questions[currentQuestionIndex].timer === '5 sec' ? styles.activeTimerButton : ''}>
                    5 sec
                </button>
                <button onClick={() => handleTimerChange('10 sec')} className={questions[currentQuestionIndex].timer === '10 sec' ? styles.activeTimerButton : ''}>
                    10 sec
                </button>
            </div>

            <div className={styles.formActions}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={handleSubmit}>Submit Quiz</button>
            </div>
        </div>
    );
}

export default QuizForm;
