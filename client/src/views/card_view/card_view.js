import Container from 'react-bootstrap/Container';
import SideBar from '../../components/sidebar/sidebar';
import NavBar from  '../../components/navbar/navbar';

function CardView(props)
{
    return <div id='pseudo-body'>
        <SideBar links={props.sidebar_links}/>
        <NavBar/>
        <Container fluid>
            {props.card_list}
        </Container>
        {props.sliders?.map((SliderComponent,i) => <SliderComponent key={'slider-' + i}/>)}
    </div>
}

export default CardView;