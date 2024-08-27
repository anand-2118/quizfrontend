import React from 'react';
import styles from '../quiz/QuizPublishedModal.module.css';

function QuizPublishedModal({ quizLink, onClose }) {
    const handleShare = () => {
        navigator.clipboard.writeText(quizLink);
        alert('Link copied to clipboard!');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Congrats, your quiz is published!</h2>
                <p>Your quiz link is here:</p>
                <div className={styles.quizLinkBox}>
                    <input type="text" value={quizLink} readOnly />
                </div>
                <button className={styles.shareButton} onClick={handleShare}>
                    Share Link
                </button>
                <button className={styles.closeButton} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default QuizPublishedModal;
