import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Replacer } from '../.';
import { useState } from 'react';

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
  const [str, setStr] = useState(
    `${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Strong Text"}}'${SEPERATOR}${SUFFIX}`,
  )
  const onClick = () => {
    setStr(`${Math.random()} added another=> ${str} pl`)
  }
  return <strong onClick={onClick}>Strong {str}</strong>
}

const PREFIX = '<<'
const SUFFIX = '>>'
const SEPERATOR = '!'
const JSON = '{"data":{"text":"ect and wor"}}'

enum ELEMENT_TYPE {
  BUTTON = 'button',
  BOLD = 'bold',
}
const Temp = () => {
  const [show, setShow] = React.useState(true)
  const sep = '===='
  const onClick = () => {
    //setStr(`${sep}${str}${sep}`);
    setInterval(() => {
      setShow(!show)
    }, 10)
  }

  return (
    <div>
      dsf
      {show ? null : (
        <p data-testid={'paragraph'}>
          corr{`${PREFIX}${SEPERATOR}bold${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}`}king Taranjeet Singh
        </p>
      )}
      <h1 onClick={onClick}>Taranjeet</h1>
    </div>
  )
}

const Temp2 = () => {
  const [str, setStr] = React.useState(`<<!bold!'{"data":{"text":"ect and wor"}}'!>>king`)
  const onClick = () => {
    setInterval(() => {
      setStr(`corr${str}`)
    }, 5)
  }

  return (
    <p onClick={onClick} data-testid={'paragraph'}>
      {str}
    </p>
  )
}

const App = () => {
  return (
    <div>
      <Replacer
      config={{
        pattern: {
          prefix: PREFIX,
          suffix: SUFFIX,
          seperator: SEPERATOR,
        },
        elementTypes: {
          [ELEMENT_TYPE.BUTTON]: Button,
          [ELEMENT_TYPE.BOLD]: Bold,
        },
      }}
    >
      <h1>Test#1</h1>
      <div>
        <section>
          <h1>Temp</h1>
          <Temp2></Temp2>
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
        <p
          style={{ backgroundColor: 'red' }}
        >{`Hello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are you Hello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are youHello Taranjeet Singh <<!bold!'{"data":{"text":"Test Button"}}'!>> How are you`}</p>
      </div>
      <div>
        <h1>Multiple patterns in single string</h1>
        <p>{`Hello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are youHello Taranjeet Singh ${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}'{"data":{"text":"Test Button"}}'${SEPERATOR}${SUFFIX} How are you`}</p>
      </div>
      
    </Replacer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
