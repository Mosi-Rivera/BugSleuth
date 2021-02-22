import {Link} from 'react-router-dom';
import {role_str,status_str} from '../../value_to_string';
import('./project_card.css');
function ProjectCard(props)
{
    return <div className='project-card-container'>
        <div>
            <Link to={'/project/' + props.data?.id}>{props.data?.title}</Link>
            <p>{props.data?.info}</p>
            <div><span>{status_str(props.data?.status)}</span></div>
        </div>
        <div>
            <span>{role_str(props.data.role)}</span>
        </div>
    </div>
}

export default ProjectCard;