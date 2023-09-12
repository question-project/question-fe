import React, { FC } from 'react'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hook/useLoadQuestionData'

const Edit: FC = () => {
    const { data } = useLoadQuestionData()

    return (
        <div className={styles.container}>
            <div className={styles.header}>header</div>

            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <div className={styles.left}>left</div>

                    <div className={styles.main}>
                        <div className={styles.canvasWrapper}>
                            <div style={{ height: '900px' }}>{JSON.stringify(data)}</div>
                        </div>
                    </div>

                    <div className={styles.right}>right</div>
                </div>
            </div>
        </div>
    )
}
export default Edit
