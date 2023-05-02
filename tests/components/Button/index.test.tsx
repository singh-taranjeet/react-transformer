import React from 'react'
import { Button } from './index'
import { render, screen } from '../../test-tools'

describe('Renders button', () => {
  it('test if renders correctly', () => {
    const text = 'test button'
    render(<Button data={{ text }} />)
    expect(screen.getByRole('button').textContent).toBe(text)
  })
})
