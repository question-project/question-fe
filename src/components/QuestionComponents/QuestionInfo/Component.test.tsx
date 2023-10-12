import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
    // 渲染组件
    render(<Component />)
    // 根据文本获取元素
    const h = screen.getByText('问卷标题')
    expect(h).toBeInTheDocument()
})

test('传入属性', () => {
    render(<Component title="hello" desc="world" />)

    const h = screen.getByText('hello')
    expect(h).toBeInTheDocument()

    const p = screen.getByText('world')
    expect(p).toBeInTheDocument()
})

test('多行文字', () => {
    render(<Component desc={'a\nb\b\nc'} />)
    const span = screen.getByText('a')
    expect(span).toBeInTheDocument()
    expect(span).toHaveTextContent('a')
    // 被换行了
    expect(span).not.toHaveTextContent('ab')
})
