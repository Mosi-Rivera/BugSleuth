import {Link} from 'react-router-dom';
import {severity_str,status_str} from '../../value_to_string';
function TicketCard(props)
{
    return <div className='ticket-card'>
        <Link to={'/ticket/' + props.data?.id}>{props.data?.task}</Link>
        <p>{props.data?.description}</p>
        <div><span>{status_str(props.data?.status)}</span> - <span>{severity_str(props.data?.severity)}</span></div>
    </div>
}

export default TicketCard;