export type QuestionParagraphPropsType = {
    text?: string
    isCenter?: boolean
    onChange?: (newProps: QuestionParagraphPropsType) => void
    disabled?: boolean
}

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
    text: '多行文本段落',
    isCenter: false,
}
