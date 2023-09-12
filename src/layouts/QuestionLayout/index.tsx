import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './index.module.scss'
import useLoadUserData from '../../hook/useLoadUserData'
import useNavPage from '../../hook/useNavPage'

const QuestionLayout: FC = () => {
    const { waiting } = useLoadUserData()
    useNavPage(waiting)
    return (
        <div className={styles.container}>
            <div className={styles.left}> QuestionLayout left</div>
            <div className={styles.right}>{waiting && <Outlet />}</div>
        </div>
    )
}
export default QuestionLayout
