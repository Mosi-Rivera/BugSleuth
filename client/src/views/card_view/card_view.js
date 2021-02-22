import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import NavBar from  '../../components/navbar/navbar';
import Row from 'react-bootstrap/Row';
import('./card_view.css');

function CardView(props)
{
    return <div id='pseudo-body'>
        <NavBar logout={props.logout}/>
        { props.sticky_bar }
        <Container fluid='xl'>
            <Row>
                <Col sm={12} md={3}>
                    { props.profile_data &&  props.profile_data }
                </Col>
                <Col sm={12} md={9}>
                    {props.card_list}
                </Col>
            </Row>
        </Container>
    </div>
}

export default CardView;