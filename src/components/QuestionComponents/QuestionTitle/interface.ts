export type QuestionTitleProps = {
    text?: string
    level?: 1 | 2 | 3
    isCenter?: boolean
}
export const QuestionTitleDefaultProps: QuestionTitleProps = {
    text: '一行标题',
    level: 1,
    isCenter: false,
}
