import { useMemo,memo,useState, useEffect } from "react"
import {useHistory, useParams, Link} from 'react-router-dom';
import StickyBar, {highlighted_sticky_style} from "../../components/StickyBar/StickyBar"
import CardView from "../../views/card_view/card_view"
import CardList from '../../components/card_list/card_list';
import TicketCard from '../../components/ticket_card/ticket_card';
import WorkerCard from '../../components/worker_card/worker_card';
import AddWorker from "../../components/add_worker/add_worker";
import ProjectData from '../../components/project_data/project_data';

const MyAssignedTickets = props => {
    const data = useMemo(() => props.data?.filter(elem => elem.assigned_to === props.worker_id),[props.data]);
    return <CardList component={TicketCard} data={data} />
}

const MySubmittedTickets = props => {
    const data = useMemo(() => props.data?.filter(elem => elem.submitted_by === props.worker_id ),[props.data]);
    return <CardList component={TicketCard} data={data} />
}

const AllTickets = props => (
    <CardList component={TicketCard} data={props.data} />
);

const Workers = props => (
    <CardList component={WorkerCard} data={props.data} click_event={props.click_event}/>
);

const StickyBarBody = memo(props => <div>
    <div style={props.tab == 0 ? highlighted_sticky_style : {}} onClick={() => props.set_tab(0)}>All</div>
    <div style={props.tab == 1 ? highlighted_sticky_style : {}} onClick={() => props.set_tab(1)}>Submitted</div>
    <div style={props.tab == 2 ? highlighted_sticky_style : {}} onClick={() => props.set_tab(2)}>Assigned</div>
    <div style={props.tab == 3 ? highlighted_sticky_style : {}} onClick={() => props.set_tab(3)}>Workers</div>
    <div onClick={props.open_invite_worker}>Add Worker</div>
</div>);

const ProjectPage = props => {
    const {project_id} = useParams();
    const history = useHistory();
    const [tab,set_tab]         = useState(0);
    const [tickets,set_tickets] = useState([]);
    const [workers,set_workers] = useState([]);
    const [project,set_project] = useState(null);
    const [worker,set_worker]   = useState(null);
    const [show_add_worker,set_show_add_modal] = useState(false);
    const handle_hide = () => set_show_add_modal(false);
    const handle_remove_worker = async (id,role) => {
        let old_value;
        if (worker?.role > 1)
                return;
        if (worker?.role == 1 && role <= 1)
            return;
        try
        {
            const {remove_worker} = await require('../../api/routes/worker');
            set_workers(workers.filter(elem => {
                if (elem.id === id) 
                {
                    old_value = elem;
                    return false
                }; 
                return true;
            }));
            await remove_worker(id);
        }
        catch(err)
        {
            let _tmp = [...workers];
            _tmp.push(old_value);
            set_workers(_tmp);
            console.log(err);
        }
    }
    const active_tab = () => {
        if (tab == 0)
            return <AllTickets data={tickets} />;
        else if (tab == 1)
            return <MySubmittedTickets  worker_id={worker.id} data={tickets} />;
        else if (tab == 2)
            return <MyAssignedTickets worker_id={worker.id} data={tickets} />;
        return <Workers click_event={handle_remove_worker} data={workers} />;
    };
    const handle_add_worker = (worker) => {
        let _tmp = [...workers];
        _tmp.push(worker);
        set_workers(_tmp);
    }
    useEffect(() => {
        (async () => {
            try
            {
                const {get_project_by_id} = await import('../../api/routes/project');
                const response = await get_project_by_id(project_id);
                if (!response.project)
                    throw new Error('Invalid id.');

                set_worker({id: response.worker_id, role: response.worker_role });
                set_workers(response.workers);
                set_tickets(response.tickets);
                set_project(response.project);
            }
            catch(err)
            {
                console.log(err);
                history.replace('/home');
            }
        })();
    },[]);
    return <div>
        <AddWorker add_worker={handle_add_worker} show={show_add_worker} onHide={handle_hide} project_id={project_id}/>
        <CardView
        {...props}
        profile_data={<ProjectData project={project}/>}
        sticky_bar={
            <StickyBar body={
                <StickyBarBody tab={tab} open_invite_worker={
                    () => set_show_add_modal(true)
                } set_tab={set_tab}/>
            }
        />}
        card_list={active_tab()}
        />
    </div>
}

export default ProjectPage;