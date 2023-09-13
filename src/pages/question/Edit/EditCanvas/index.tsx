import React, { FC } from 'react'
import styles from './index.module.scss'
import QuestionTitle from '../../../../components/QuestionComponents/QuestionTitle/Components'
import QuestionInput from '../../../../components/QuestionComponents/QuestionInput/Components'
import { Spin } from 'antd'

interface EditCanvasProps {
    loading?: boolean
}

export const EditCanvas: FC<EditCanvasProps> = (props: EditCanvasProps) => {
    const { loading } = props
    if (loading) return <Spin />

    return (
        <div className={styles.canvas}>
            <div className={styles.componentWrapper}>
                <div className={styles.component}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles.componentWrapper}>
                <div className={styles.component}>
                    <QuestionInput />
                </div>
            </div>
        </div>
    )
}
