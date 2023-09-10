import React, { FC } from 'react'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hook/useLoadQuestionData'

const Stat: FC = () => {
    const { data, loading } = useLoadQuestionData()
    return (
        <div className={styles.container}>
            {loading ? 'loading...' : <>{JSON.stringify(data)}</>}
        </div>
    )
}
export default Stat
