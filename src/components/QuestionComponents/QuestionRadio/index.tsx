/**
 * @description: 问卷 radio 组件
 * @author: wangqiaoling
 * @date: 2023/09/18
 */
import Component from './Component'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'
export * from './interface'
export * from './Component'

export default {
    title: '单选',
    type: 'questionRadio',
    Component,
    defaultProps: QuestionRadioDefaultProps,
    PropComponent,
    StatComponent,
}
