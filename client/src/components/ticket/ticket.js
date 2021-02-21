import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StickyBar from '../StickyBar/StickyBar';
import Tab from '../tab/tab';
import {Link} from 'react-router-dom';
import('./ticket.css');
const Comment = props => (<div className='comment'>
    <div className='comment-header'>
        <span>{props.data?.username}</span>
        <span className='created'>{props.data?.created}</span>
    </div>
    <div>
        {props.data?.message}
    </div>
</div>)

const TicketComments = props => (<div>
    {
        props.data?.map((elem,i) => <Comment key={'comment-' + i} data={elem} />)
    }
    <div className='write-comment'>
        <div>
            <form id='ticket-comment' onSubmit={props.submit_comment}>
                <div>
                    <textarea form='ticket-comment' name='message' placeholder='Leave a comment...'/>
                </div>
                <div>
                    <input type='submit' value='send' />
                </div>
            </form>
        </div>
    </div>
</div>);

const TicketHistory = props => (<div className='c-table'>
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

const TicketData = props => (<div className='ticket-data'>
    <div>
        <span>title</span>
        <span>{props.data?.task}</span>
    </div>
    <div>
        <span>description</span>
        <span>{props.data?.description}</span>
    </div>
    <div>
        <span>assigned to</span>
        <span>{props.assigned_to ? props.assigned_to : 'n/a'}</span>
    </div>
    <div>
        <span>status</span>
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
    </div>
    <div>
        <span>severity</span>
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
    const [tab,set_tab] = useState(0);
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
            if (data.get('message')?.replace(/\s+/g, '') == '')
                return;
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
    return ticket ? <div className='ticket-container'>
        <StickyBar body={
            [
                <Link key={'sticky-ticket-item-0'} to={'/project/' + ticket.project_id} className='back-button'>Back</Link>
                ,<Tab key={'sticky-ticket-item-1'} tabs={[{name: 'comments', count: comments?.length},{name: 'history'}]} tab={tab} set_tab={set_tab} />
            ]
            } />
        <Row>
            <Col sm={12} md={9}>
                {
                    tab === 0 ? (
                        <TicketComments submit_comment={handle_submit_comment} data={comments} />
                    ) : (
                        <TicketHistory data={history} />
                    )
                }
            </Col>
            <Col sm={12} md={3}>
                <TicketData assigned={project.worker_id === ticket.assigned_to} admin={project?.worker_role <= 1} data={ticket} />
            </Col>
        </Row>
    </div> : <div>loading...</div>
}

export default Ticket;