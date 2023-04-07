import * as React from 'react'
import { render, screen } from './test-tools'

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

describe('Test: Replacer component', () => {
  it('renders without crashing', () => {
    render(
      <Replacer config={config}>
        <h1>Test</h1>
      </Replacer>,
    )
  })

  it('Replaces valid pattern to react components', () => {
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
    const expectedResult = `correct and working`
    expect(element.textContent).toBe(expectedResult)
  })

  it('Does not replace invalid pattern', () => {
    const inValidString = `corr${PREFIX}${SEPERATOR}${SEPERATOR}bold${SEPERATOR}${JSON.stringify({
      data: { text: 'ect and wor' },
    })}${SEPERATOR}${SUFFIX}king`
    render(
      <Replacer config={config}>
        <div data-testid={'test'}>{inValidString}</div>
      </Replacer>,
    )
    const element = screen.getByTestId('test')
    expect(element.textContent).toBe(inValidString)
  })
})
