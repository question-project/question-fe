import React, { FC, useEffect, useState } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import useGetComponentInfo from '../../../../hook/useGetComponentInfo'
import { ComponentProp } from '../ComponentProp'
import { PageSetting } from '../PageSetting'

// TS 枚举
enum TAB_KEYS {
    PROP_KEY = 'prop',
    SETTING_KEY = 'setting',
}

export const RightPanel: FC = () => {
    const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
    const { selectedId } = useGetComponentInfo()

    useEffect(() => {
        if (selectedId) {
            setActiveKey(TAB_KEYS.PROP_KEY)
        } else {
            setActiveKey(TAB_KEYS.SETTING_KEY)
        }
    }, [selectedId])

    const tabsItems = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProp />,
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <PageSetting />,
        },
    ]

    return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>
}
