import React, { FC } from 'react'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hook/useLoadQuestionData'

const Stat: FC = () => {
    const { loading } = useLoadQuestionData()
    return <div className={styles.container}>{loading ? 'loading...' : <>{111}</>}</div>
}
export default Stat
