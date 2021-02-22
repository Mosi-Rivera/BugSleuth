import {Link} from 'react-router-dom';
import {role_str} from '../../value_to_string';
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
            <span>{role_str(props.data?.role)}</span>
        </div>
    </div>
}

export default WorkerCard;