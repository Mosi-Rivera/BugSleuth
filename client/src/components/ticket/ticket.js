import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';

const TicketComments = props => (<div>
    {
        props.data?.map((elem,i) => <div key={'comment-' + i}>
            <h3>{elem?.username}</h3>
            <div>
                <p>{elem?.message}</p>
                <span>{elem.created}</span>
            </div>
        </div>)
    }
    <div>
        <form id='ticket-comment' onSubmit={props.submit_comment}>
            <div>
                <textarea form='ticket-comment' name='message'/>
            </div>
            <div>
                <input type='submit' value='send' />
            </div>
        </form>
    </div>
</div>);

const TicketHistory = props => (<div>
    <table>
        <thead>
            <tr>
                <th>user</th>
                <th>field</th>
                <th>from</th>
                <th>to</th>
                <th>date</th>
            </tr>
        </thead>
        <tbody>
            {
                props.data?.map((elem,i) => <tr key={'history-row' + i}>
                    <td>{elem?.username}</td>
                    <td>{elem?.field}   </td>
                    <td>{elem?.from}    </td>
                    <td>{elem?.to}      </td>
                    <td>{elem?.date}    </td>
                </tr>)
            }
        </tbody>
    </table>
</div>); 

const TicketData = props => (<div>
    <h3>{props.data?.task}</h3>
    <p>{props.data?.description}</p>
    <span>assigned to: {props.assigned_to ? props.assigned_to : 'N/A'}</span>
    <div>
        {
            props.assigned || props.admin ? (
            <select onFocus={e => e.target.previous_value = e.target.value} onChange={props.on_status_change}>
                <option value={0} defaultValue>something</option>
                <option value={0}>mething</option>
                <option value={0}>thing</option>
                <option value={0}>ing</option>
            </select>
            ) : <span>{props.data?.status}</span> 
        }
        {
            props.assigned || props.admin ? (
            <select onFocus={e => e.target.previous_value = e.target.value} onChange={props.on_status_change}>
                <option value={0} defaultValue>something</option>
                <option value={0}>mething</option>
                <option value={0}>thing</option>
                <option value={0}>ing</option>
            </select>
            ) : <span>{props.data?.severity}</span> 
        }
    </div>
</div>);

const Ticket = props => {
    const {ticket_id}   = useParams();
    const dispatch      = useDispatch();
    const location      = useLocation();
    const routerHistory = useHistory();
    const [submitting_comment,set_submitting_comment]   = useState(false);
    const [submitting_status,set_submitting_status]     = useState(false);
    const [submitting_severity,set_submitting_Severity] = useState(false);
    const {ticket,comments,history} = useSelector(state => state.active_ticket);
    const project = useSelector(state => state.active_project);
    const handle_submit_status = async e => {
        e.preventDefault();
        try
        {
            let value = e.target.value;
            const {set_status} = await import('../../redux/reducers/r_active_ticket');
            const set_status_project_tickets = (await import('../../redux/reducers/r_active_project')).set_status;
            const {submit_status} = await import('../../api/routes/ticket');
            set_submitting_status(true);
            let result = await submit_status({status: value});
            dispatch(set_status(value));
            dispatch(set_status_project_tickets({value: value, id: ticket.id}));
            set_submitting_status(false);
        }
        catch(err)
        {
            console.log(err);
            e.target.value = e.target.previous_value;
            set_submitting_status(false);
        }
    }
    const handle_submit_comment = async e => {
        e.preventDefault();
        let data = new FormData(e.target);
        try
        {
            const {add_comments} = await import('../../redux/reducers/r_active_ticket');
            const {submit_comment} = await import('../../api/routes/ticket');
            set_submitting_comment(true);
            dispatch(add_comments(await submit_comment({ticket_id: ticket.id, message: data.get('message')})));
            set_submitting_comment(false);
            e.target.reset();
        }
        catch(err)
        {
            console.log(err);
            set_submitting_comment(false);
        }
    }
    useEffect(() => {
        (async () => {
            try
            {
                const {set_all} = await import('../../redux/reducers/r_active_ticket');
                const {get_ticket} = await import('../../api/routes/ticket');
                const ticket = await get_ticket(ticket_id);
                dispatch(set_all(ticket));
                if (!project.worker_id)
                {
                    const {set_worker} = await import('../../redux/reducers/r_active_project');
                    const {get_worker} = await import('../../api/routes/worker');
                    console.log(ticket);
                    dispatch(set_worker(await get_worker(ticket.ticket.project_id)));
                }
            }
            catch(err)
            {
                console.log(err);
                if (location.state && location.state.from)
                    routerHistory.replace(location.state.from.pathname);
                else
                    routerHistory.replace('/home');
            }
        })();
    },[]);
    return ticket ? <div>
        <TicketData assigned={project.worker_id === ticket.assigned_to} admin={project.worker_id <= 1} data={ticket} />
        
        <TicketComments submit_comment={handle_submit_comment} data={comments} />

        <TicketHistory data={history} />

    </div> : <div>loading...</div>
}

export default Ticket;