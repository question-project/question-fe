import React, { FC } from 'react'
import { ComponentConfType, componentConfGroup } from '../../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './index.module.scss'

interface ComponentLibProps {
    [key: string]: any
}

const genComponent = (component: ComponentConfType) => {
    const { Component } = component
    return (
        <div className={styles.wrapper}>
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
