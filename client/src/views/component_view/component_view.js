import { Component } from "react";
import NavBar       from "../../components/navbar/navbar";
import {Container}  from 'react-bootstrap';

const ComponentView = props => (
    <div className='pseudo-body'>
        <NavBar/>
        { props.sticky_bar && <props.sticky_bar/> }
        <Container fluid={ props.size ? props.size : 'xl'}>
            <props.component/>
        </Container>
    </div>
);

export default ComponentView;