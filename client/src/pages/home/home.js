import CardView         from '../../views/card_view/card_view';
import CardList         from '../../components/card_list/card_list';
import ProjectCard      from '../../components/project_card/project_card';
import StickyBar, 
{
    highlighted_sticky_style
}                       from '../../components/StickyBar/StickyBar';
import { useEffect, useMemo, useState } from 'react';
import ProfileData      from '../../components/profile_data/profile_data';
import TicketCard       from '../../components/ticket_card/ticket_card';

const TicketView = props => {
    return <CardList empty_text='You dont have any assigned tickets...' component={TicketCard} data={props.data}/>
}

const ProjectView = props => {
    return <CardList empty_text='You dont have any projects...' component={ProjectCard} data={props.data}/>
}

const StickyBarBody = props => {
    return <div>
        <div style={props.tab == 0 ? highlighted_sticky_style : {}} onClick={() => props.set_tab(0)}>Projects</div>
        <div style={props.tab == 1 ? highlighted_sticky_style : {}} onClick={() => props.set_tab(1)}>Tickets</div>
    </div>;
}

const HomePage = props => {
    const [tab,set_tab] = useState(0);
    const [projects,set_projects] = useState([]);
    const [tickets,set_tickets] = useState([]);
    const active_tab = () => {
        if (tab == 0)
            return <ProjectView data={projects}/>;
        return <TicketView data={tickets}/>;
    }
    useEffect(() => {
        (async () => {
            try
            {
                const {get_projects} = await import('../../api/routes/project');
                const {get_assigned_tickets} = await import('../../api/routes/ticket');
                set_projects(await get_projects());
                set_tickets(await get_assigned_tickets());
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    },[]);
    return <CardView 
    {...props}
    profile_data={<ProfileData user={props.user} />}
    sticky_bar={<StickyBar body={<StickyBarBody tab={tab} set_tab={set_tab}/>}/>}
    card_list={active_tab()}
    />
}

export default HomePage;