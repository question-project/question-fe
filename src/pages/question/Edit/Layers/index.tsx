import React, { ChangeEvent, FC, useState } from 'react'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import styles from './index.module.scss'
import classNames from 'classnames'
import { Button, Input, Space, message } from 'antd'
import { useDispatch } from 'react-redux'
import {
    changeComponentHidden,
    changeComponentTitle,
    changeSelectedId,
    toggleComponentLocked,
} from '../../../../store/componentsReducer'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

interface LayersProps {
    [key: string]: any
}

export const Layers: FC<LayersProps> = (props: LayersProps) => {
    const { componentList, selectedId } = useGetComponentInfo()

    const [changingTitleId, setChangingTitleId] = useState(selectedId)

    const dispatch = useDispatch()

    const handleTitleClick = (fe_id: string) => {
        const currentComp = componentList.find(c => c.fe_id === fe_id)
        if (currentComp && currentComp.isHidden) {
            message.info('不能选中隐藏组件')
            return
        }
        // 当前组件未被选中，执行选中
        if (fe_id !== selectedId) {
            dispatch(changeSelectedId(fe_id))
            setChangingTitleId('')
            return
        }
        // 当前组件被选中，执行修改标题
        setChangingTitleId(fe_id)
    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        if (!selectedId) return
        dispatch(changeComponentTitle({ fe_id: selectedId, title: event.target.value }))
    }

    const changeHidden = (fe_id: string, isHidden: boolean) => {
        dispatch(changeComponentHidden({ fe_id, isHidden }))
    }

    const changeLocked = (fe_id: string) => {
        dispatch(toggleComponentLocked({ fe_id }))
    }

    return (
        <>
            {componentList.map(component => {
                const { fe_id, title, isHidden, isLocked } = component
                return (
                    <div
                        key={fe_id}
                        className={styles.wrapper}
                        onClick={() => handleTitleClick(fe_id)}
                    >
                        <div
                            className={classNames(styles.title, {
                                [styles.selected]: fe_id === selectedId,
                            })}
                        >
                            {fe_id === changingTitleId ? (
                                <Input
                                    value={title}
                                    onChange={changeTitle}
                                    onPressEnter={() => setChangingTitleId('')}
                                    onBlur={() => setChangingTitleId('')}
                                />
                            ) : (
                                title
                            )}
                        </div>
                        <div className={styles.handler}>
                            <Space>
                                <Button
                                    type="link"
                                    icon={<EyeInvisibleOutlined />}
                                    className={!isHidden ? styles.btn : ''}
                                    size="small"
                                    shape="circle"
                                    onClick={() => changeHidden(fe_id, !isHidden)}
                                ></Button>
                                <Button
                                    size="small"
                                    shape="circle"
                                    className={!isLocked ? styles.btn : ''}
                                    icon={<LockOutlined />}
                                    type={isLocked ? 'primary' : 'text'}
                                    onClick={() => changeLocked(fe_id)}
                                />
                            </Space>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
