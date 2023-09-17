import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
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
