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

const JSON = '{"data":{"text":"ect and wor"}}';

describe('Test: Replacer component', () => {
  describe('Renders without crash', () => {
    it('renders without crashing', () => {
      render(
        <Replacer config={config}>
          <h1>Test</h1>
        </Replacer>,
      )
    })
  })

  describe('Replaces valid patterns', () => {
    describe('Simple patterns', () => {
      it('Simple valid pattern', () => {
        render(
          <Replacer config={config}>
            <div data-testid={'test'}>
              corr
              {`${PREFIX}${SEPERATOR}bold${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}`}
              king
            </div>
          </Replacer>,
        )
        const element = screen.getByTestId('test')
        const expectedResult = `correct and working`
        expect(element.textContent).toBe(expectedResult)
      })
      it('Valid pattern: extra suffix', () => {
        render(
          <Replacer config={config}>
            <div data-testid={'test'}>
              corr
              {`${PREFIX}${SEPERATOR}bold${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}${SUFFIX}`}
              king
            </div>
          </Replacer>,
        )
        const element = screen.getByTestId('test')
        const expectedResult = `correct and wor${SUFFIX}king`
        expect(element.textContent).toBe(expectedResult)
      })
      it('Valid pattern: extra prefix', () => {
        render(
          <Replacer config={config}>
            <div data-testid={'test'}>
              corr
              {`${PREFIX}${PREFIX}${SEPERATOR}bold${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}`}
              king
            </div>
          </Replacer>,
        )
        const element = screen.getByTestId('test')
        const expectedResult = `corr${PREFIX}ect and working`
        expect(element.textContent).toBe(expectedResult)
      })
    })

    describe('Complex string', () => {
      it('Multiple pattern in single string', () => {
        render(
          <Replacer config={config}>
            <div data-testid={'test'}>
              {`corr<<|bold|'{"data":{"text":"ect and wor"}}'|>>king corr<<|bold|'{"data":{"text":"ect and wor"}}'|>>king corr<<|bold|'{"data":{"text":"ect and wor"}}'|>>king`}
            </div>
          </Replacer>,
        )
        const element = screen.getByTestId('test')
        const expectedResult = `correct and working correct and working correct and working`
        expect(element.textContent).toBe(expectedResult)
      })

      it('Multiple valid and invalid patterns in single string', () => {
        render(
          <Replacer config={config}>
            <div data-testid={'test'}>
              {`corr<<|bold|'{"data":{"text":"ect and wor"}}'|<>>king corr<<|bold|'{"data":{"text":"ect and wor"}}'|>>king corr<<|boldd|'{"data":{"text":"ect and wor"}}'|>>king`}
            </div>
          </Replacer>,
        )
        const element = screen.getByTestId('test')
        const expectedResult = `corr<<|bold|'{"data":{"text":"ect and wor"}}'|<>>king correct and working corr<<|boldd|'{"data":{"text":"ect and wor"}}'|>>king`
        expect(element.textContent).toBe(expectedResult)
      })
      
    })
  })

  describe('Does not replace in-valid patterns and does not touch any element', () => {
    it('Extra seperator', () => {
      const inValidString = `corr${PREFIX}${SEPERATOR}${SEPERATOR}bold${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}king`
      render(
        <Replacer config={config}>
          <div data-testid={'test'}>{inValidString}</div>
        </Replacer>,
      )
      const element = screen.getByTestId('test')
      expect(element.textContent).toBe(inValidString)
    })
    it('Correct pattern and invalid json', () => {
      const inValidString = `corr${PREFIX}${SEPERATOR}bold${SEPERATOR}'{data:{"text":"text"}}'${SEPERATOR}${SUFFIX}king`
      render(
        <Replacer config={config}>
          <div data-testid={'test'}>{inValidString}</div>
        </Replacer>,
      )
      const element = screen.getByTestId('test')
      expect(element.textContent).toBe(inValidString)
    })
    it('Correct pattern and invalid element type', () => {
      const inValidString = `corr${PREFIX}${SEPERATOR}heading${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}king`
      render(
        <Replacer config={config}>
          <div data-testid={'test'}>{inValidString}</div>
        </Replacer>,
      )
      const element = screen.getByTestId('test')
      expect(element.textContent).toBe(inValidString)
    })
    it('Invalid pattern <<0!bold!...', () => {
      const inValidString = `corr${PREFIX}0${SEPERATOR}heading${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}king`
      render(
        <Replacer config={config}>
          <div data-testid={'test'}>{inValidString}</div>
        </Replacer>,
      )
      const element = screen.getByTestId('test')
      expect(element.textContent).toBe(inValidString)
    })
    it('Invalid pattern <<!bold!...!9>>', () => {
      const inValidString = `corr${PREFIX}${SEPERATOR}heading${SEPERATOR}${JSON}${SEPERATOR}9${SUFFIX}king`
      render(
        <Replacer config={config}>
          <div data-testid={'test'}>{inValidString}</div>
        </Replacer>,
      )
      const element = screen.getByTestId('test')
      expect(element.textContent).toBe(inValidString)
    })
    it('Invalid pattern wrong suffix at end', () => {
      const inValidString = `corr${PREFIX}${SEPERATOR}heading${SEPERATOR}${JSON}${SEPERATOR}sdf${SUFFIX}king`
      render(
        <Replacer config={config}>
          <div data-testid={'test'}>{inValidString}</div>
        </Replacer>,
      )
      const element = screen.getByTestId('test')
      expect(element.textContent).toBe(inValidString)
    })
  })
})
