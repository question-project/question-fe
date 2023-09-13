import Component from './Components'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

export default {
    title: '输入框',
    // 要统一
    type: 'questionInput',
    Component,
    defaultProps: QuestionInputDefaultProps,
}
