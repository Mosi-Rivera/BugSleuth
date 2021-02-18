import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation, useParams, useHistory } from 'react-router-dom';

const Ticket = props => {
    const {ticket_id} = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const routerHistory = useHistory();
    const {ticket,comments,history} = useSelector(state => state.active_ticket);
    useEffect(() => {
        (async () => {
            try
            {
                const {set_all} = await import('../../redux/reducers/r_active_ticket');
                const {get_ticket} = await import('../../api/routes/ticket');
                dispatch(set_all(await get_ticket(ticket_id)));
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
        <div>
            <h3>{ticket?.task}</h3>
            <p>{ticket?.description}</p>
            <div>
                <span>{ticket?.status}</span>
                <span>{ticket?.severity}</span>
            </div>
        </div>
    </div> : <div>loading...</div>
}

export default Ticket;