import React, { useState, useEffect } from 'react';
import QuizPublishedModal from './QuizPublishedModal'; // Import the modal component
import styles from '../quiz/Quizform.module.css';

function QuizForm({ quizDetails, onCancel }) {
    const [questions, setQuestions] = useState([
        { 
            text: '', 
            questionType: quizDetails.questionType, 
            optionType: 'text', 
            selectedOption: null, 
            options: [{ text: '', imageUrl: '' }, { text: '', imageUrl: '' }, { text: '', imageUrl: '' }, { text: '', imageUrl: '' }], 
            timer: 'off', 
            remainingTime: null 
        },
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isQuizPublished, setIsQuizPublished] = useState(false);
    const [quizLink, setQuizLink] = useState('');

    useEffect(() => {
        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.remainingTime !== null && currentQuestion.remainingTime > 0) {
            const timer = setInterval(() => {
                setQuestions(prevQuestions => {
                    const updatedQuestions = [...prevQuestions];
                    const updatedQuestion = { ...updatedQuestions[currentQuestionIndex] };
                    updatedQuestion.remainingTime -= 1;
                    updatedQuestions[currentQuestionIndex] = updatedQuestion;
                    return updatedQuestions;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [questions, currentQuestionIndex]);

    const handleQuestionTextChange = (e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].text = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleOptionTypeChange = (e) => {
        const { value } = e.target;
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].optionType = value;
        // Reset the options based on the new optionType
        updatedQuestions[currentQuestionIndex].options = [
            { text: '', imageUrl: '' },
            { text: '', imageUrl: '' },
            { text: '', imageUrl: '' },
            { text: '', imageUrl: '' },
        ];
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].selectedOption = optionIndex;
        setQuestions(updatedQuestions);
    };

    const handleOptionTextChange = (e, index) => {
        const updatedQuestions = [...questions];
        const currentOption = updatedQuestions[currentQuestionIndex].options[index];
        const optionType = updatedQuestions[currentQuestionIndex].optionType;

        if (optionType === 'text') {
            currentOption.text = e.target.value;
        } else if (optionType === 'imageUrl') {
            currentOption.imageUrl = e.target.value;
        } else if (optionType === 'textImageUrl') {
            currentOption[e.target.name] = e.target.value; // Handling both text and imageUrl
        }

        setQuestions(updatedQuestions);
    };

    const handleTimerChange = (timerValue) => {
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].timer = timerValue;

        if (timerValue === '5 sec') {
            updatedQuestions[currentQuestionIndex].remainingTime = 5;
        } else if (timerValue === '10 sec') {
            updatedQuestions[currentQuestionIndex].remainingTime = 10;
        } else {
            updatedQuestions[currentQuestionIndex].remainingTime = null; // Turn off the timer
        }

        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        if (questions.length < 5) {
            setQuestions([...questions, { text: '', questionType: quizDetails.questionType, optionType: 'text', selectedOption: null, options: [{ text: '', imageUrl: '' }, { text: '', imageUrl: '' }, { text: '', imageUrl: '' }, { text: '', imageUrl: '' }], timer: 'off', remainingTime: null }]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleNavigateToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleSubmit = () => {
        console.log('Quiz Submitted:', questions);
        const generatedQuizLink = 'https://your-quiz-link.com'; // Replace this with your actual logic
        setQuizLink(generatedQuizLink);
        setIsQuizPublished(true);
    };

    const handleCloseModal = () => {
        setIsQuizPublished(false);
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

            {quizDetails.questionType === 'qa' ? (
                <>
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
                                {questions[currentQuestionIndex].optionType === 'text' && (
                                    <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionTextChange(e, index)}
                                        placeholder={`Option ${index + 1}`}
                                    />
                                )}
                                {questions[currentQuestionIndex].optionType === 'imageUrl' && (
                                    <input
                                        type="text"
                                        value={option.imageUrl}
                                        onChange={(e) => handleOptionTextChange(e, index)}
                                        placeholder={`Option ${index + 1}`}
                                    />
                                )}
                                {questions[currentQuestionIndex].optionType === 'textImageUrl' && (
                                    <>
                                        <input
                                            type="text"
                                            name="text"
                                            value={option.text}
                                            onChange={(e) => handleOptionTextChange(e, index)}
                                            placeholder={`Text ${index + 1}`}
                                        />
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={option.imageUrl}
                                            onChange={(e) => handleOptionTextChange(e, index)}
                                            placeholder={`Image URL ${index + 1}`}
                                        />
                                    </>
                                )}
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
                </>
            ) : (
                <div className={styles.optionType}>
                    <label>Options:</label>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={index} className={styles.option}>
                            {questions[currentQuestionIndex].optionType === 'text' && (
                                <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => handleOptionTextChange(e, index)}
                                    placeholder={`Option ${index + 1}`}
                                />
                            )}
                            {questions[currentQuestionIndex].optionType === 'imageUrl' && (
                                <input
                                    type="text"
                                    value={option.imageUrl}
                                    onChange={(e) => handleOptionTextChange(e, index)}
                                    placeholder={`Option ${index + 1}`}
                                />
                            )}
                            {questions[currentQuestionIndex].optionType === 'textImageUrl' && (
                                <>
                                    <input
                                        type="text"
                                        name="text"
                                        value={option.text}
                                        onChange={(e) => handleOptionTextChange(e, index)}
                                        placeholder={`Text ${index + 1}`}
                                    />
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={option.imageUrl}
                                        onChange={(e) => handleOptionTextChange(e, index)}
                                        placeholder={`Image URL ${index + 1}`}
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.buttonContainer}>
                <button onClick={onCancel}>Cancel</button>
                <button onClick={handleSubmit}>Create Quiz</button>
            </div>

            {isQuizPublished && (
                <QuizPublishedModal 
                    quizLink={quizLink} 
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default QuizForm;
