# Convert string text to React components

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

[**Live Demo**](https://codesandbox.io/s/ancient-silence-epkl8r?file=/src/App.tsx)

## Installation:

```bash
npm install @react-transformer/replacer --save
```

or

```bash
yarn add @react-transformer/replacer
```

## Use case

Your application is rendering a text sourced from an api response as shown below

```bash
const response = {id: 'xyz', title: 'Universities', subTitle: 'Admissions are opening next week, so hurry up'}
```

You are rendering the data from response title and subtitle as shown below

```bash
<div>
  <h1>{response.title}</h1>
  <h2>{response.subTitle}</h2>
</div>
```

If the content maker wants to make the `next week` a _link_ to another url, It is not possible in above case. But with React Transformer you are do it very easily as shown below

```bash
const response = {id: 'xyz', title: 'Universities', subTitle: 'Admissions are opening <<|link|'{"data":{"text":"New Button","url":"some-url"}}'|>>, so hurry up
```

Changes in code

```base
import { Replacer } from '@react-transformer/replacer'
```

```base
const Link = (props: {data: {text: string, url:string}}) => {
  const { text, url } = props.data

  return <a href={url}>{text}</a>
}
```

```base
const config = {
        pattern: {
          prefix: '<<',
          suffix: '>>',
          seperator: '|',
        },
        elementTypes: {
          link: Link,
        },
      };
```

```base
render(
  return (
    <Replacer config={config}>
      <h1>{response.title}</h1>
      <h2>{response.subTitle}</h2>
    </Replacer>
  );
)
```

## Output

Universities
Admissions are opening [next week](some-url), so hurry up

## Usage :

Add `Replacer` to your component within which you would like to replace text to react components:

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
          suffix: '>>',
          seperator: '|',
        },
        elementTypes: {
          button: Button,
        },
      }}
    >
      <h1>Example</h1>
      <div>
        <p>{`<<|button|'{"data":{"text":"New Button"}}'|>>`}</p>
      </div>
    </Replacer>
  </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/@react-transformer/replacer
[npm-image]: https://img.shields.io/npm/v/@react-transformer/replacer
[github-license]: https://img.shields.io/github/license/singh-taranjeet/react-transformer
[github-license-url]: https://github.com/singh-taranjeet/react-transformer/blob/main/LICENSE
[github-build]: https://github.com/singh-taranjeet/react-transformer/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/singh-taranjeet/react-transformer/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/@react-transformer/replacer
