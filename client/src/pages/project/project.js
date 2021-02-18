import { useMemo,memo,useState, useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams, Link} from 'react-router-dom';
import StickyBar from "../../components/StickyBar/StickyBar"
import CardView from "../../views/card_view/card_view"
import CardList from '../../components/card_list/card_list';
import TicketCard from '../../components/ticket_card/ticket_card';

const MyAssignedTickets = props => {
    const id = useSelector(state => state.auth.user.worker_id);
    const tickets = useSelector(state => state.active_project.tickets);
    const data = useMemo(props.data?.filter(elem => elem.assigned_by === id),[tickets]);
    return <CardList component={TicketCard} data={data} />
}

const MySubmittedTickets = props => {
    const id = useSelector(state => state.auth.user.worker_id);
    const tickets = useSelector(state => state.active_project.tickets);
    const data = useMemo(props.data?.filter(elem => elem.submmitted_by === id),[tickets]);
    return <CardList component={TicketCard} data={data} />
}

const AllTickets = props => {
    const tickets = useSelector(state => state.active_project.tickets);
    return <CardList component={TicketCard} data={tickets} />
}

const StickyBarBody = memo(props => <div>
    <div onClick={() => props.set_tab(0)}>All Tickets</div>
    <div onClick={() => props.set_tab(1)}>My Submitted Tickets</div>
    <div onClick={() => props.set_tab(2)}>My Assigned Tickets</div>
    <Link to={{pathname: '/new_ticket', state: { from: props.location }}}>Submit Ticket</Link>
</div>);

const ProjectPage = props => {
    const {project_id} = useParams();
    const history = useHistory();
    const [tab,set_tab] = useState(0);
    const dispatch = useDispatch();
    const active_tab = useMemo(() => {
        if (tab == 0)
            return AllTickets;
        else if (tab == 1)
            return MySubmittedTickets;
        return MyAssignedTickets;
    });
    useEffect(() => {
        (async () => {
            try
            {
                const {get_project_by_id} = await import('../../api/routes/project');
                const {set_tickets,set_project,set_worker} = await import('../../redux/reducers/r_active_project');
                const response = await get_project_by_id(project_id);
                if (!response.project)
                    throw new Error('Invalid id.');
                console.log(response);
                dispatch(set_worker({id: response.worker_id, role: response.worker_role }));
                dispatch(set_tickets(response.tickets));
                dispatch(set_project(response.project));
            }
            catch(err)
            {
                console.log(err);
                history.replace('/home');
            }
        })();
    },[]);
    return <CardView
    sticky_bar={<StickyBar body={<StickyBarBody set_tab={set_tab}/>}/>}
    card_list={active_tab}
    />
}

export default ProjectPage;