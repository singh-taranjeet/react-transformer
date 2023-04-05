import React from 'react'
export const Bold = (props: { data: { text: string } }) => {
  const { text } = props.data
  return <b>{text}</b>
}
