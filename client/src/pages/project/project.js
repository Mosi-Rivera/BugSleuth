import { useMemo,memo } from "react"
import {useSelector} from 'react-redux';
import StickyBar from "../../components/StickyBar/StickyBar"
import CardView from "../../views/card_view/card_view"
import CardList from '../../components/card_list/card_list';
import TicketCard from '../../components/ticket_card/ticket_card';

const MyAssignedTickets = props => {
    const id = useSelector(state => state.auth.user.worker_id);
    const data = useMemo(props.data?.filter(elem => elem.assigned_by === id),[props.data]);
    return <CardList component={TicketCard} data={props.data} />
}

const MySubmittedTickets = props => {
    const id = useSelector(state => state.auth.user.worker_id);
    const data = useMemo(props.data?.filter(elem => elem.submmitted_by === id),[props.data]);
    return <CardList component={TicketCard} data={props.data} />
}

const AllTickets = props => <CardList component={TicketCard} data={props.data} />

const StickyBarBody = memo(props => <div>
    <div onClick={() => props.set_tab(0)}>All Tickets</div>
    <div onClick={() => props.set_tab(1)}>My Submitted Tickets</div>
    <div onClick={() => props.set_tab(2)}>My Assigned Tickets</div>
</div>);

const ProjectPage = props => {
    const [tab,set_tab] = useState(0);
    const active_tab = useMemo(() => {
        if (tab == 0)
            return AllTickets;
        else if (tab == 1)
            return MySubmittedTickets;
        return MyAssignedTickets;
    });
    return <CardView
    sticky_bar={<StickyBar body={<StickyBarBody set_tab={set_tab}/>}/>}
    card_list={active_tab}
    />
}

export default ProjectPage;