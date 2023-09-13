import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputDefaultProps, QuestionInputProps } from './interface'

const QuestionInput: FC<QuestionInputProps> = (props: QuestionInputProps) => {
    const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
    return (
        <div>
            <Typography.Paragraph strong>{title}</Typography.Paragraph>
            <div>
                <Input placeholder={placeholder} />
            </div>
        </div>
    )
}
export default QuestionInput
