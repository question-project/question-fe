export * from './QuestionInput'
export * from './QuestionTitle'

import { FC } from 'react'
// 各个组件的 prop type
import QuestionInputConf, { QuestionInputProps } from './QuestionInput'
import QuestionTitleConf, { QuestionTitleProps } from './QuestionTitle'
export type ComponentPropsType = QuestionInputProps & QuestionTitleProps

// 组件的配置
export type ComponentConfType = {
    title: string
    type: string
    Component: FC<ComponentPropsType>
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
}

// 组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionTitleConf],
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf],
    },
]

const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

export const getComponentConfByType = (type: string) => {
    return componentConfList.find(item => item.type === type)
}
