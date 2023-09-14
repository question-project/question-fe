import React, { FC } from 'react'
import styles from './index.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { getComponentConfByType } from '../../../../components/QuestionComponents'
import { ComponentInfoType } from '../../../../store/componentsReducer'

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
    const { componentList } = useGetComponentInfo()

    const { loading } = props
    if (loading) return <Spin />

    return (
        <div className={styles.canvas}>
            {componentList.map(item => {
                return (
                    <div className={styles.componentWrapper} key={item.fe_id}>
                        <div className={styles.component}>{genComponent(item)}</div>
                    </div>
                )
            })}
        </div>
    )
}
