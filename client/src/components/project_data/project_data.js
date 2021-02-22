import { status_str } from '../../value_to_string';
import Button from '../button/button';
import('./project_data.css');
const ProjectData = props => {
    const project = props.project;
    return <div className='profile-data'>
        <div>
            <span className='title'>
                {project?.title}
            </span>
            <span>
                {status_str(project?.status)}
            </span>
        </div>
        <div>
            <span className='description'>
                {project?.info}
            </span>
        </div>
        <Button nav to={'/new_ticket/' + props.project?.id} value='Submit Ticket' />
    </div>
}

export default ProjectData;