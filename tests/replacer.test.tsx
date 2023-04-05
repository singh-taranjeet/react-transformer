import * as React from 'react'
import { render, screen } from './utils'

import 'jest-canvas-mock'

import { Replacer } from '../src'
import { Button } from './components/Button'
import { Bold } from './components/Bold'

const PREFIX = '<<'
const SUFFIX = '>>'
const SEPERATOR = '|'

const config = {
  pattern: {
    prefix: PREFIX,
    suffix: SUFFIX,
    seperator: SEPERATOR,
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
  it('replaces single pattern with components', () => {
    render(
      <Replacer config={config}>
        <div data-testid={'test'}>
          corr
          {`${PREFIX}${SEPERATOR}bold${SEPERATOR}${JSON.stringify({
            data: { text: 'ect and wor' },
          })}${SEPERATOR}${SUFFIX}`}
          king
        </div>
      </Replacer>,
    )
    const element = screen.getByTestId('test')
    expect(element.textContent).toBe('correct and working')
  })
})
