import React from 'react';

export const I = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <i>{data}</i>
}

export const B = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <b>{data}</b>
}

export const H1 = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <h1>{data}</h1>
}

export const H2 = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <h2>{data}</h2>
}

export const H3 = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <h3>{data}</h3>
}

export const H4 = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <h4>{data}</h4>
}

export const H5 = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <h5>{data}</h5>
}

export const H6 = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <h6>{data}</h6>
}

export const P = (props: {data: React.ReactNode}) => {

    const {data} = props;

    return <p>{data}</p>
}