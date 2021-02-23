import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StickyBar from '../StickyBar/StickyBar';
import Tab from '../tab/tab';
import {Link} from 'react-router-dom';
import SelectInput from '../select_input/select_input';
import {status_str,severity_str} from '../../value_to_string';
import ErrorText from '../error_text/error_text';
import parse_timestamp from '../../parse_timestamp';
import('./ticket.css');

const Comment = props => (<div className='comment'>
    <div className='comment-header'>
        <span>{props.data?.username}</span>
        <span className='created'>{parse_timestamp(props.data?.created)}</span>
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
                <ErrorText error={props.error}/>
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
                    <td>{elem?.email}</td>
                    <td>{elem?.field}   </td>
                    <td>{elem.field == 'severity' ? severity_str(elem?.from_value) : ( elem.field == 'status' ? status_str(elem?.from_value) : elem?.from_value ) }</td>
                    <td>{elem.field == 'severity' ? severity_str(elem?.to_value) : ( elem.field == 'status' ? status_str(elem?.to_value) : elem?.to_value ) }</td>
                    <td>{parse_timestamp(elem?.created)}    </td>
                </tr>)
            }
        </tbody>
    </table>
</div>); 

const TicketData = props => {
    const options = useMemo(() => {
        if (!props.workers)
            return [];    
        return props.admin || props.data.assigned_to ? (
            [{value: null, name: 'n/a'}].concat(props.workers.map((elem) => ({
                value: elem.id,
                name: elem.email,
            })))
        ) : (
            [{value: null, name: 'n/a'},{value: props.worker_id, value: props.user.email}]
        )
    }
    ,[props.workers]);
    return <div className='ticket-data'>
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
            { props.workers && <SelectInput options={options}
            disabled={!props.admin && props.assigned}
            onChange={e => props.assign_ticket(e)}
            onFocus={e => e.target.previous_value = {value: e.target.value, name: e.target.options[e.target.selectedIndex].innerHTML}}
            default_value={props?.data?.assigned_to}
            /> }
        </div>
        <div>
            <span>status</span>
            {
                props.assigned || props.admin ? (
                    <SelectInput options={[
                        {value: 0,name: status_str(0)},
                        {value: 1,name: status_str(1)},
                        {value: 2,name: status_str(2)},
                        {value: 3,name: status_str(3)},
                        {value: 4,name: status_str(4)},
                        {value: 5,name: status_str(5)},
                        {value: 6,name: status_str(6)},
                    ]} 
                    onFocus={e => e.target.previous_value = e.target.value}
                    onChange={props.set_status}
                    default_value={props.data?.status}
                    />
                ) : <span>{status_str(props.data?.status)}</span> 
            }
        </div>
        <div>
            <span>severity</span>
            {
                props.assigned || props.admin ? (
                    <SelectInput options={[
                        {value: 0,name: severity_str(0)},
                        {value: 1,name: severity_str(1)},
                        {value: 2,name: severity_str(2)},
                    ]} 
                    onFocus={e => e.target.previous_value = e.target.value}
                    onChange={props.set_severity}
                    default_value={props.data?.severity}
                    />
                ) : <span>{severity_str(props.data?.severity)}</span> 
            }
        </div>
    </div>
};

const Ticket = props => {
    const {ticket_id}   = useParams();
    const location      = useLocation();
    const routerHistory = useHistory();
    const [tab,set_tab]                 = useState(0);
    const [ticket,set_ticket]           = useState(null);
    const [comments,set_comments]       = useState([]);
    const [history,set_history]         = useState([]);
    const [worker_id,set_worker_id]     = useState(null);
    const [worker_role,set_worker_role] = useState(null);
    const [workers,set_workers]         = useState(null);
    const [comment_error_text,set_comment_error_text] = useState(null);
    const handle_assign_ticket = async (e) => {
        const id = e.target.value;
        try
        {
            const {assign_ticket} = await import('../../api/routes/ticket');
            await assign_ticket({worker_id: id,ticket_id: ticket.id});
            let _tmp = {...ticket};
            _tmp.assigned_user = id;
            set_ticket(_tmp);
            _tmp = [...history];
            _tmp.push({
                email: props.user?.email,
                field: 'assigned_to',
                from_value: e.target.previous_value.name,
                to_value: e.target.options[e.target.selectedIndex].innerHTML,
                created: (new Date()).toDateString()
            });
            set_history(_tmp);
        }
        catch(err)
        {
            e.target.value = e.previous_value.value;
            console.log(err);
        }
    }
    const handle_submit_severity = async e => {
        e.preventDefault();
        try
        {
            let value = e.target.value;
            const {submit_severity} = await import('../../api/routes/ticket');
            await submit_severity(value,ticket_id);
            let _tmp = [...history];
            _tmp.push({
                email: props.user?.email,
                field: 'severity',
                from_value: e.target.previous_value,
                to_value: value,
                created: (new Date()).toDateString(),
            });
            set_history(_tmp);
        }
        catch(err)
        {
            console.log(err);
            e.target.value = e.target.previous_value;
        }
    }
    const handle_submit_status = async e => {
        e.preventDefault();
        try
        {
            let value = e.target.value;
            const {submit_status} = await import('../../api/routes/ticket');
            await submit_status(value,ticket_id);
            let _tmp = [...history];
            _tmp.push({
                email: props.user?.email,
                field: 'status',
                from_value: e.target.previous_value,
                to_value: value,
                created: (new Date()).toDateString(),
            });
            set_history(_tmp);
        }
        catch(err)
        {
            console.log(err);
            e.target.value = e.target.previous_value;
        }
    }
    const handle_submit_comment = async e => {
        e.preventDefault();
        let data = new FormData(e.target);
        try
        {
            if (data.get('message')?.replace(/\s+/g, '') == '')
                return set_comment_error_text('Empty comment.');
            const {submit_comment} = await import('../../api/routes/ticket');
            const response = await submit_comment({ticket_id: ticket.id, message: data.get('message')});
            response.created = (new Date()).toUTCString();
            let _tmp = [...comments];
            _tmp.push({...response});
            set_comments(_tmp);
            e.target.reset();
            set_comment_error_text(null);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(() => {
        (async () => {
            try
            {
                const {get_ticket} = await import('../../api/routes/ticket');
                const {get_workers_by_project} = await import('../../api/routes/worker');
                const {ticket,comments,history,worker_id,worker_role} = await get_ticket(ticket_id);
                set_ticket(ticket);
                set_comments(comments);
                set_history(history);
                set_worker_id(worker_id);
                set_worker_role(worker_role);
                set_workers(await get_workers_by_project(ticket.project_id));
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
        <StickyBar reverse body={
            [
                <Link key={'sticky-ticket-item-0'} to={'/project/' + ticket.project_id} className='back-button'>Back</Link>
                ,<Tab key={'sticky-ticket-item-1'} tabs={[{name: 'comments', count: comments?.length},{name: 'history'}]} tab={tab} set_tab={set_tab} />
            ]
            } />
        <Row>
            <Col sm={12} md={9}>
                {
                    tab === 0 ? (
                        <TicketComments error={comment_error_text} submit_comment={handle_submit_comment} data={comments} />
                    ) : (
                        <TicketHistory data={history} />
                    )
                }
            </Col>
            <Col sm={12} md={3}>
                <TicketData worker_id={worker_id} assign_ticket={handle_assign_ticket} workers={workers} set_status={handle_submit_status} set_severity={handle_submit_severity} assigned={worker_id === ticket.assigned_to} admin={worker_role <= 1} data={ticket} />
            </Col>
        </Row>
    </div> : <div></div>
}

export default Ticket;