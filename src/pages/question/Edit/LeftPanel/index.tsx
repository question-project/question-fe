import { Tabs } from 'antd'
import React, { FC } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { ComponentLib } from '../ComponentLib'
import { Layers } from '../Layers'

export const LeftPanel: FC = () => {
    const tabsItems = [
        {
            key: 'componentLib',
            label: (
                <span>
                    <AppstoreOutlined />
                    组件库
                </span>
            ),
            children: <ComponentLib />,
        },
        {
            key: 'layers',
            label: (
                <span>
                    <BarsOutlined />
                    图层
                </span>
            ),
            children: <Layers />,
        },
    ]
    return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}
