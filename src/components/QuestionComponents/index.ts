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
    defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

export const getComponentConfByType = (type: string) => {
    return componentConfList.find(item => item.type === type)
}
