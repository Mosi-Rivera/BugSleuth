import {Link} from 'react-router-dom';

function TicketCard(props)
{
    return <div className='ticket-card'>
        <Link to={'/ticket/' + props.data?.id}>{props.data?.task}</Link>
        <p>{props.data?.description}</p>
        <div><span>{props.data?.status}</span> - <span>{props.data?.severity}</span></div>
    </div>
}

export default TicketCard;