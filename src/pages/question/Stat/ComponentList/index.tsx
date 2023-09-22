import React, { FC } from 'react'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import styles from './index.module.scss'
import classNames from 'classnames'
import { getComponentConfByType } from '../../../../components/QuestionComponents'
interface PropsType {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (id: string) => void
}

export const ComponentList: FC<PropsType> = (props: PropsType) => {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
    const { componentList } = useGetComponentInfo()

    return (
        <div className={styles.container}>
            {componentList
                .filter(c => !c.isHidden)
                .map(c => {
                    const { fe_id, type, props } = c
                    const ComponentConf = getComponentConfByType(type)
                    if (ComponentConf == null) return null

                    const { Component } = ComponentConf
                    return (
                        <div
                            className={classNames(styles.componentWrapper, {
                                [styles.selected]: selectedComponentId === fe_id,
                            })}
                            key={fe_id}
                            onClick={() => {
                                setSelectedComponentId(fe_id)
                                setSelectedComponentType(type)
                            }}
                        >
                            <div className={styles.component}>
                                <Component {...props} />
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
