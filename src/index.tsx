import React from "react";
import ReactDOM from "react-dom/client";
import { Replacer } from "@react-transformer/replacer";

interface IComponent {
  data: {
    text: string;
  };
}

const Button = (props: IComponent) => {
  const { text } = props.data;

  return <button>{text}</button>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Replacer
      config={{
        pattern: {
          prefix: "<<",
          suffix: ">>>",
          seperator: "|",
        },
        elementTypes: {
          button: Button,
        },
      }}
    >
      <h1>Test</h1>
      <div>
        <p>{`<<|button|${JSON.stringify({
          data: { text: "Test Button" },
        })}|>>>`}</p>
      </div>
    </Replacer>
  </React.StrictMode>
);
