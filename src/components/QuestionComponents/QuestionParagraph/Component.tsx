import React, { FC } from 'react'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'
import { Typography } from 'antd'

const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }
    return (
        <Typography.Paragraph
            style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '10px' }}
        >
            {text}
        </Typography.Paragraph>
    )
}
export default QuestionParagraph
