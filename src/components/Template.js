import React, { Fragment } from 'react'
import { Footer } from './Footer'
import Sidebar from './Sidebar'
import styled from 'styled-components'

const Container = styled.div`
display:'flex';
overflow:hidden;
margin-left:250px;
`
const Item = styled.div`
width:100%;
`

const Template = ({ children }) => {
    return (
        <Fragment>
            <Sidebar />
            <Container>
                <Item>
                    {children}
                </Item>
            </Container>
            <Footer />
        </Fragment >
    )
}

export default Template