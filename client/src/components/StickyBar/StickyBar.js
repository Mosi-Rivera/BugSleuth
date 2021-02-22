import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import('./stickybar.css');
export const highlighted_sticky_style = {
    borderBottomColor: 'var(--button-color-primary)',
    color: 'var(--text-color-primary)'
}

const StickyBar = props => {
    return <div className='c-sticky-bar'>
        <Container style={{height: '48px'}} fluid='xl'>
            <Row>
                {console.log(props.reverse)}
                {
                    props.reverse ? [
                        <Col style={{display: 'flex'}} key={'sticky-col-0'} sm={12} md={9} >{props.body}</Col>,
                        <Col key={'sticky-col-1'} sm={12} md={3} ></Col>
                    ] : [
                        <Col key={'sticky-col-0'} sm={12} md={3} ></Col>,
                        <Col key={'sticky-col-1'} sm={12} md={9} >{props.body}</Col>
                    ]
                }
            </Row>
        </Container>
    </div>
}

export default StickyBar;