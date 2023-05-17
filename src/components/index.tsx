import React from 'react';

export const I = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <i>{children}</i>
}

export const B = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <b>{children}</b>
}

export const H1 = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <h1>{children}</h1>
}

export const H2 = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <h2>{children}</h2>
}

export const H3 = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <h3>{children}</h3>
}

export const H4 = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <h4>{children}</h4>
}

export const H5 = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <h5>{children}</h5>
}

export const H6 = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <h6>{children}</h6>
}

export const P = (props: {children: React.ReactNode}) => {

    const {children} = props;

    return <p>{children}</p>
}