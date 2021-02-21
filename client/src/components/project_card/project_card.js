import {Link} from 'react-router-dom';

function ProjectCard(props)
{
    return <div className='project-card-container'>
        <div>
            <Link to={'/project/' + props.data?.id}>{props.data?.title}</Link>
            <p>{props.data?.info}</p>
            <div><span>{props.data?.status}</span></div>
        </div>
    </div>
}

export default ProjectCard;