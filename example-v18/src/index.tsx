import React, {useState} from 'react';
// import {Replacer} from '@react-transformer/replacer'
import {Replacer} from './Replacer';
import {createRoot} from 'react-dom/client';
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

const RandomConcat = () => {
  const [str, setStr] = useState(
    `corr${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BUTTON}${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}king`,
  )
  const onClick = () => {
    setStr(`${Math.random()} ((*)) ${str} ((*))`)
  }
  return <strong onClick={onClick}>{str}</strong>
}

const PREFIX = '<<'
const SUFFIX = '>>'
const SEPERATOR = '!'
const JSON = '{"data":{"text":"ect and wor"}}'

enum ELEMENT_TYPE {
  BUTTON = 'button',
  BOLD = 'bold',
}
const ShowHideString = () => {
  const [show, setShow] = React.useState(true)
  const onClick = () => {
    setShow(!show)
  }

  return (
    <div>
      {show ? null : (
        <p data-testid={'paragraph'}>
          corr{`${PREFIX}${SEPERATOR}bold${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}`}king
        </p>
      )}
      <button onClick={onClick}>show/hide</button>
    </div>
  )
}

const StringManagedByState = () => {
  const [str, setStr] = React.useState(`<<!bold!'{"data":{"text":"ect and wor"}}'!>>king`)
  const onClick = () => {
    setStr(`corr${str} corr${str}`);
    console.log("done", `corr${str} corr${str}`)
  }

  return (
    <p onClick={onClick} data-testid={'paragraph'}>
      {str}
    </p>
  )
}

const MiniCms = (props: {cms: string}) => {

  return (
    <p>{props.cms}</p>
  );

}

const App = () => {

  const [cms, setCms] = useState('');

  return (
    <div>
      <section>
        <p>{'Corr<<|BOLD|ect and |>> working'}</p>
        <input type="text" value={cms} onChange={(e: any) => setCms(e.target.value)} />
      </section>
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
        <section>
          <h1>1. String Managed By State</h1>
          <StringManagedByState></StringManagedByState>
        </section>

        {/* Multiple patterns in single string */}
        <section>
          <h1>2. Multiple patterns in single string</h1>
          <p>{`corr<<!bold!{"data":{"text":"ect and wor"}}!>>king corr<<!bold!'{"data":{"text":"ect and wor"}}'!>>king corr<<!bold!'{"data":{"text":"ect and wor"}}'!>>king`}</p>
        </section>

        {/* Multiple variable strings */}
        <section>
          <h1>3. Multiple variable strings</h1>
          <p>
            corr
            {`${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BOLD}${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}king corr${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BOLD}${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}king||corr${PREFIX}${SEPERATOR}${ELEMENT_TYPE.BOLD}${SEPERATOR}${JSON}${SEPERATOR}${SUFFIX}`}
            king
          </p>
          <RandomConcat />
        </section>

        <section>
          <h1>4. Show hide pattern test</h1>
          <ShowHideString />
        </section>
      </Replacer>
      <Replacer>
      <section>
          <h1>5. Default configuration</h1>
          {`co<<|BOLD|rr|>>ect <<|ITALIC|and|>> wor <<|H1|king|>>`}
        </section>

        <section>
          <h1>6. Dynamic string and get updated</h1>
          <MiniCms cms={cms} />
        </section>
      </Replacer>
    </div>
  )
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
