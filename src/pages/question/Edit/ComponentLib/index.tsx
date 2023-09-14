import React, { FC } from 'react'
import { ComponentConfType, componentConfGroup } from '../../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../../store/componentsReducer'
import { nanoid } from 'nanoid'
interface ComponentLibProps {
    [key: string]: any
}

const genComponent = (component: ComponentConfType) => {
    const { Component, title, type, defaultProps } = component
    const dispath = useDispatch()
    return (
        <div
            className={styles.wrapper}
            onClick={() => {
                dispath(
                    addComponent({
                        fe_id: nanoid(),
                        title,
                        type,
                        props: defaultProps,
                    })
                )
            }}
            key={type}
        >
            <div className={styles.component}>
                <Component />
            </div>
        </div>
    )
}

export const ComponentLib: FC<ComponentLibProps> = (props: ComponentLibProps) => {
    return (
        <>
            {componentConfGroup.map((group, index) => {
                const { groupId, groupName, components } = group
                return (
                    <div key={groupId}>
                        <Typography.Title
                            level={3}
                            style={{ fontSize: '18px', marginTop: index > 0 ? '20px' : 0 }}
                        >
                            {groupName}
                        </Typography.Title>
                        <div>{components.map(component => genComponent(component))}</div>
                    </div>
                )
            })}
        </>
    )
}
