import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'

const QuestionLayout: FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}> QuestionLayout left</div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    )
}
export default QuestionLayout
