import Container from 'react-bootstrap/Container';
import NavBar from  '../../components/navbar/navbar';

function CardView(props)
{
    return <div id='pseudo-body'>
        <NavBar/>
        { props.sticky_bar }
        <Container>
            <props.card_list/>
        </Container>
        {props.sliders?.map((SliderComponent,i) => <SliderComponent key={'slider-' + i}/>)}
    </div>
}

export default CardView;