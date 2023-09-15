import React, { FC } from 'react'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hook/useLoadQuestionData'
import { EditCanvas } from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'
import { EditHeader } from './EditHeader'

const Edit: FC = () => {
    const { loading } = useLoadQuestionData()

    const dispatch = useDispatch()

    const clearSelectIed = () => {
        dispatch(changeSelectedId(''))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <EditHeader />
            </div>

            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel />
                    </div>

                    <div className={styles.main} onClick={clearSelectIed}>
                        <div className={styles.canvasWrapper}>
                            <EditCanvas loading={loading} />
                        </div>
                    </div>

                    <div className={styles.right}>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Edit
