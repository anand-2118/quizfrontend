import React, { useState } from 'react'
import styles from '../dashboard/Dashboard.module.css'
import Createquizmodal from '../quiz/Createquizmodal';

function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateQuizClick = ()=>{
        setIsModalOpen(true)
    }

    const handleCloseModal = ()=>{
        setIsModalOpen(false)
    }

    return (
        <>
            <div className={styles.dashboardPage}>
                <div className={styles.left}>
                    <div className={styles.quizzie}>
                        <h1>QUIZZIE</h1>
                    </div>
                    <div className={styles.dbOptions}>
                          <h2>Dashboard</h2>
                          <h2>Analysis</h2>
                          <h2 onClick={handleCreateQuizClick} className={styles.clickable}>Create Quiz</h2>
                    </div>

                    <div className={styles.logout}>
                        <h1>LOGOUT</h1>
                    </div>
                </div>
                <div className={styles.right}>right</div>
            </div>
            <Createquizmodal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    )
}

export default Dashboard