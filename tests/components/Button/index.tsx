import React from 'react'

export const Button = (props: { data: { text: string } }) => {
  const { text } = props.data
  return <button>{text}</button>
}
