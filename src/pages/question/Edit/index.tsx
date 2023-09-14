import React, { FC } from 'react'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hook/useLoadQuestionData'
import { EditCanvas } from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'

const Edit: FC = () => {
    const { loading } = useLoadQuestionData()

    const dispatch = useDispatch()

    const clearSelectIed = () => {
        dispatch(changeSelectedId(''))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>header</div>

            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <div className={styles.left}>left</div>

                    <div className={styles.main} onClick={clearSelectIed}>
                        <div className={styles.canvasWrapper}>
                            <EditCanvas loading={loading} />
                        </div>
                    </div>

                    <div className={styles.right}>right</div>
                </div>
            </div>
        </div>
    )
}
export default Edit
