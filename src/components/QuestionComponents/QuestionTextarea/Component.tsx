import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextareaDefaultProps, QuestionTextareaPropsType } from './interface'

const QuestionTextarea: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
    const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }
    return (
        <div>
            <Typography.Paragraph strong>{title}</Typography.Paragraph>
            <div>
                <Input.TextArea placeholder={placeholder} />
            </div>
        </div>
    )
}
export default QuestionTextarea
