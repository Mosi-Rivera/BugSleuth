import {useSelector}    from 'react-redux';
import CardView         from '../../views/card_view/card_view';
import CardList         from '../../components/card_list/card_list';
import ProjectCard      from '../../components/project_card/project_card';
import CreateProject    from '../../components/create_project/create_project';
import StickyBar        from '../../components/StickyBar/StickyBar';
import { useEffect, useMemo, useState } from 'react';
import {useDispatch} from 'react-redux';

const TicketView = () => {
    return <div></div>
}

const ProjectView = () => {
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try
            {
                const {get_projects} = await import('../../api/routes/project');
                const {set_projects} = await import('../../redux/reducers/projects');
                dispatch(set_projects(await get_projects()));
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    },[]);
    return <CardList component={ProjectCard} data={projects}/>
}

const StickyBarBody = props => {
    return <div>
        <div onClick={() => props.set_tab(0)}>Projects</div>
        <div onClick={() => props.set_tab(1)}>Tickets</div>
    </div>;
}

const HomePage = () => {
    const [tab,set_tab] = useState(0);
    const active_tab = useMemo(() => {
        if (tab == 0)
            return ProjectView;
        return TicketView;
    },[tab]);
    return <CardView
    sticky_bar={<StickyBar body={<StickyBarBody set_tab={set_tab}/>}/>}
    card_list={active_tab}
    />
}

export default HomePage;