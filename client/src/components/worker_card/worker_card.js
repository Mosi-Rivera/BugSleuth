import {Link} from 'react-router-dom';

const WorkerCard = props => {
    return <div>
        <div>
            {
                props.admin ? (
                    <Link to={'/worker/' + props.data?.id}>{props.data?.username}</Link>
                ) : (
                    <span>{props.data?.username}</span>
                )
            }
            <span>{props.data?.role}</span>
        </div>
    </div>
}

export default WorkerCard;