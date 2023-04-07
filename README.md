# my-react-typescript-package

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

This repo is the example of the article ["How to create and publish React Typescript npm package with demo and automated build"](https://medium.com/@igaponov/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca).

You can clone it and step by step create your own NPM package and publish it.

It is simple React counter.

[**Live Demo**](https://gapon2401.github.io/my-react-typescript-package/)

## Installation:

```bash
npm install @react-transformer/replacer --save
```

or

```bash
yarn add @react-transformer/replacer
```

## Usage :

Add `Replacer` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Replacer } from '@react-transformer/replacer'

const Button = (props: IComponent) => {
  const { text } = props.data

  return <button>{text}</button>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
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
      <div>
        <p>{`<<|button|${JSON.stringify({ data: { text: 'Test Button' } })}|>>>`}</p>
      </div>
    </Replacer>
  </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/@react-transformer/replacer
[npm-image]: https://img.shields.io/npm/v/@react-transformer/replacer
[github-license]: https://img.shields.io/github/license/gapon2401/@react-transformer/replacer
[github-license-url]: https://github.com/gapon2401/@react-transformer/replacer/blob/master/LICENSE
[github-build]: https://github.com/gapon2401/@react-transformer/replacer/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/gapon2401/@react-transformer/replacer/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/@react-transformer/replacer
