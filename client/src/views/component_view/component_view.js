import { Component } from "react";
import NavBar       from "../../components/navbar/navbar";
import {Container}  from 'react-bootstrap';

const ComponentView = props => (
    <div className='pseudo-body'>
        <NavBar logout={props.logout}/>
        { props.sticky_bar && <props.sticky_bar reverse /> }
        <Container fluid={ props.size ? props.size : 'xl'}>
            {props.component}
        </Container>
    </div>
);

export default ComponentView;