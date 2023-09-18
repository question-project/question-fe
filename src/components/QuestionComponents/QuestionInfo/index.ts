/**
 * @description: 问卷 info 组件
 * @author: wangqiaoling
 * @date: 2023/09/18
 */
import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

export default {
    title: '问卷信息',
    type: 'questionInfo',
    Component,
    defaultProps: QuestionInfoDefaultProps,
    PropComponent,
}
