import React, { FC } from 'react'
import styles from './index.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { getComponentConfByType } from '../../../../components/QuestionComponents'
import { ComponentInfoType, changeSelectedId } from '../../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
interface EditCanvasProps {
    loading?: boolean
}

const genComponent = (componentInfo: ComponentInfoType) => {
    const { type, props } = componentInfo
    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return null
    const { Component } = componentConf
    return <Component {...props} />
}

export const EditCanvas: FC<EditCanvasProps> = (props: EditCanvasProps) => {
    const { componentList, selectedId } = useGetComponentInfo()

    const dispatch = useDispatch()

    const { loading } = props
    if (loading) return <Spin />

    return (
        <div className={styles.canvas}>
            {componentList.map(item => {
                const { fe_id } = item
                const wrapperClassName = classNames(styles.componentWrapper, {
                    [styles.selected]: fe_id === selectedId,
                })
                return (
                    <div
                        className={wrapperClassName}
                        key={fe_id}
                        onClick={e => {
                            e.stopPropagation()
                            dispatch(changeSelectedId(fe_id))
                        }}
                    >
                        <div className={styles.component}>{genComponent(item)}</div>
                    </div>
                )
            })}
        </div>
    )
}
