import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { Replacer } from '../src'

interface IComponent {
  data: {
    text: string
  }
}

const Button = (props: IComponent) => {
  const { text } = props.data

  return <button>{text}</button>
}

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <Replacer
        config={{
          pattern: {
            prefix: '<<',
            suffix: '>>>',
            seperator: '|',
          },
          elementTypes: {
            button: Button,
          },
        }}
      >
        <h1>Test</h1>
      </Replacer>,
    )
  })
})
