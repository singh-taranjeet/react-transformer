import * as React from 'react'
import { render, screen } from './utils'

import 'jest-canvas-mock'

import { Replacer } from '../src'
import { Button } from './components/Button'
import { Bold } from './components/Bold'

const config = {
  pattern: {
    prefix: '<<',
    suffix: '>>',
    seperator: '|',
  },
  elementTypes: {
    button: Button,
    bold: Bold,
  },
}

describe('Renders correctly', () => {
  it('renders without crashing', () => {
    render(
      <Replacer config={config}>
        <h1>Test</h1>
      </Replacer>,
    )
  })
  it('replaces pattern with components', () => {
    render(
      <Replacer config={config}>
        <div data-testid={'test'}>corr{`<<|bold|${JSON.stringify({ data: { text: 'ect and wor' } })}|>>`}king</div>
      </Replacer>,
    )
    const element = screen.getByTestId('test')
    expect(element.textContent).toBe('correct and working')
  })
})
