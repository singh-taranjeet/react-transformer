import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Replacer } from '@react-transformer/replacer'

interface IComponent {
  data: {
    text: string
  }
}

const Button = (props: IComponent) => {
  const { text } = props.data
  return <button>{text}</button>
}

const Bold = (props: IComponent) => {
  const { text } = props.data
  return <strong>{text}</strong>
}

const Strong = () => {
  
  const [str, setStr] = useState(`Hello Taranjeet Singh <=========> ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Strong Text"}}'${SEPERATOR}${SUFFIX} ->>>>>>>>>>- `);
  const onClick = () => {
    setStr(`added another ==_------_== ${str}`);
  }
  return <strong onClick={onClick}>Strong {str}</strong>
}

const PREFIX = '<<';
const SUFFIX = '>>';
const SEPERATOR = '!';

enum ELEMENT_TYPE {
  BUTTON = 'button',
  BOLD = 'bold'
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Replacer
      config={{
        pattern: {
          prefix: PREFIX,
          suffix: SUFFIX,
          seperator: SEPERATOR,
        },
        elementTypes: {
          [ELEMENT_TYPE.BUTTON]: Button,
          [ELEMENT_TYPE.BOLD]: Bold
        },
      }}
    >
      <h1>Test</h1>
      <div>
        <p>{`corr<<!bold!{"data":{"text":"ect and wor"}}!>>king corr<<!bold!'{"data":{"name":"ect and wor"}}'!>>king corr<<!bold!'{"data":{"name":"ect and wor"}}'!>>king`}</p>
        <h1>String string</h1>
        <p>{`Hello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are you`}</p>
      </div>
      <div>
        <h1>Multiple string</h1>
        <p>{`Hello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BOLD}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are you`}</p>
        <Strong></Strong>
        <p>{`Hello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are you`}</p>
        <p>{`Hello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BOLD}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are you`}</p>
      </div>
      <div>
        <h1>Multiple patterns in single string</h1>
        <p>{`Hello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are you`}</p>
      </div>
    </Replacer>
  </React.StrictMode>,
)
