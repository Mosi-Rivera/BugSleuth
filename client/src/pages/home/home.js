import {useSelector}    from 'react-redux';
import CardView         from '../../views/card_view/card_view';
import CardList         from '../../components/card_list/card_list';
import ProjectCard      from '../../components/project_card/project_card';
import CreateProject    from '../../components/create_project/create_project';

const HomePage = () => {
    const projects = useSelector(state => state.projects);
    return <CardView
    card_list={<CardList component={ProjectCard} data={projects}/>}
    sidebar_links={[
        
    ]}
    sliders={[CreateProject]}
    />
}

export default HomePage;