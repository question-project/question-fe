import React, { FC } from 'react'
import { componentConfGroup } from '../../../../components/QuestionComponents'
import { Typography } from 'antd'

interface ComponentLibProps {
    [key: string]: any
}

export const ComponentLib: FC<ComponentLibProps> = (props: ComponentLibProps) => {
    return (
        <>
            {componentConfGroup.map((group, index) => {
                const { groupId, groupName } = group
                return (
                    <div key={groupId}>
                        <Typography.Title
                            level={3}
                            style={{ fontSize: '18px', marginTop: index > 0 ? '20px' : 0 }}
                        >
                            {groupName}
                        </Typography.Title>
                    </div>
                )
            })}
        </>
    )
}
