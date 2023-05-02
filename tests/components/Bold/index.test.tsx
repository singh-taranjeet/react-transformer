import React from 'react'
import { render, screen } from '../../test-tools'
import { Bold } from '.'

describe('Renders Bold component', () => {
  it('Renders correctly', () => {
    const text = 'text'
    render(<Bold data={{ text }} />)
    const elment = screen.getByText(text)
    expect(elment.tagName).toBe('B')
  })
})
