import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Button from '../button/button';

const ProjectData = () => {
    const project = useSelector(state => state.active_project.project);
    return <div className='profile-data'>
        <span className='title'>
            {project?.title}
        </span>
        <span>
            {project?.status}
        </span>
        <span className='description'>
            {project?.info}
        </span>
        <Button nav to='/new_ticket' value='Submit Ticket' />
    </div>
}

export default ProjectData;