import { Component } from "react";
import NavBar       from "../../components/navbar/navbar";
import {Container}  from 'react-bootstrap';

const ComponentView = props => (
    <div className='pseudo-body'>
        <NavBar/>
        <Container>
            <props.component/>
        </Container>
    </div>
);

export default ComponentView;