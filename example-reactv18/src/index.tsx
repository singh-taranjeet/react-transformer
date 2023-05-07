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
const JSON = '{"data":{"text":"ect and wor"}}';

enum ELEMENT_TYPE {
  BUTTON = 'button',
  BOLD = 'bold'
}
const Temp = () => {
  const [show, setShow] = React.useState(true)
  const sep = '====';
  const onClick = () => {
    //setStr(`${sep}${str}${sep}`);
    setShow(false);
  }

  return <div>
    dsf
    {
      show ? <p  onClick={onClick} data-testid={'paragraph'}>corr{`${PREFIX}${SEPERATOR}bold${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}`}king</p> : null
    }
    <h1>Taranjeet</h1>
  </div>
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
        <section>
          <h1>Temp</h1>
          <Temp></Temp>
        </section>
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
