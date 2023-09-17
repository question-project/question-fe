export * from './QuestionInput'
export * from './QuestionTitle'

import { FC } from 'react'
// 各个组件的 prop type
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
export type ComponentPropsType = QuestionInputPropsType &
    QuestionTitlePropsType &
    QuestionParagraphPropsType

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
        components: [QuestionTitleConf, QuestionParagraphConf],
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf],
    },
]

const componentConfList: ComponentConfType[] = [
    QuestionInputConf,
    QuestionTitleConf,
    QuestionParagraphConf,
]

export const getComponentConfByType = (type: string) => {
    return componentConfList.find(item => item.type === type)
}
