import React from 'react'
import styles from '../quiz/Createquizmodal.module.css'

function Createquizmodal({isOpen,onClose}) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalLayout}>
            <div className={styles.modalContent}>
                <form action="">
                    <div className={styles.formGroup}>
                        <input type="text" placeholder='Quiz name' />
                    </div>
                    <div className={styles.quizType}>
                        <label htmlFor="quizType"> Quiz Type</label>
                        <div className={styles.type1} name="quizType">
                            Q&A
                        </div>
                        <div className={styles.type2} name="quizType">
                            Poll
                        </div>
                    </div>
                    <div className={styles.formActions}>
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Createquizmodal