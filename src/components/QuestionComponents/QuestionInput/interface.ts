export type QuestionInputProps = {
    title?: string
    placeholder?: string
    onChange?: (newProps: QuestionInputProps) => void
}

export const QuestionInputDefaultProps: QuestionInputProps = {
    title: '输入框标题',
    placeholder: '请输入...',
}
