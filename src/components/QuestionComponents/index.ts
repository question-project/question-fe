export * from './QuestionInput'
export * from './QuestionTitle'

import { FC } from 'react'
// 各个组件的 prop type
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, {
    QuestionRadioPropsType,
    QuestionRadioStatPropsType,
} from './QuestionRadio'
import QuestionCheckboxConf, {
    QuestionCheckboxPropsType,
    QuestionCheckboxStatPropsType,
} from './QuestionCheckbox'
export type ComponentPropsType = QuestionInputPropsType &
    QuestionTitlePropsType &
    QuestionParagraphPropsType &
    QuestionInfoPropsType &
    QuestionTextareaPropsType &
    QuestionRadioPropsType &
    QuestionCheckboxPropsType

// 组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

// 组件的配置
export type ComponentConfType = {
    title: string
    type: string
    Component: FC<ComponentPropsType>
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
    StatComponent?: FC<ComponentStatPropsType>
}

// 组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf, QuestionTextareaConf],
    },
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf, QuestionCheckboxConf],
    },
]

const componentConfList: ComponentConfType[] = [
    QuestionInputConf,
    QuestionTitleConf,
    QuestionParagraphConf,
    QuestionInfoConf,
    QuestionTextareaConf,
    QuestionRadioConf,
    QuestionCheckboxConf,
]

export const getComponentConfByType = (type: string) => {
    return componentConfList.find(item => item.type === type)
}
