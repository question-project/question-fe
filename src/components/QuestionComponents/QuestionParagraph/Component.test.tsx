import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
    render(<Component />)
    const span = screen.getByText('多行文本段落')
    expect(span).toBeInTheDocument()
})

test('默认属性', () => {
    render(<Component text="hello world" isCenter={true} />)
    const span = screen.getByText('hello world')
    expect(span).toBeInTheDocument()

    // 父元素
    const p = span.parentElement
    // 不为空
    expect(p).not.toBeNull()

    const style = p!.style || ''
    expect(style.textAlign).toBe('center')
})

test('多行文字', () => {
    render(<Component text={'a\nb\b\nc'} />)
    const span = screen.getByText('a')
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent('a')
    // 被换行了
    expect(span).not.toHaveTextContent('ab')
})
