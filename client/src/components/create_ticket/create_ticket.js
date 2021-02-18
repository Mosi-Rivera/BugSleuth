import {Redirect, useHistory, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';

const CreateTicket = props => {
    const dispatch  = useDispatch();
    const location  = useLocation();
    const history   = useHistory();
    const project   = useSelector(state => {console.log(state); return state.active_project.project});
    const [waiting_for_response,set_waiting_for_response] = useState(false);
    const handle_submit = async e => {
        try
        {
            e.preventDefault();
            const {state} = location;
            const {create_ticket} = await import('../../api/routes/ticket');
            const {add_ticket} = await import('../../redux/reducers/r_active_project');
            const data = new FormData(e.target);
            set_waiting_for_response(true);
            const new_ticket = await create_ticket({
                task:  data.get('task'),
                description:   data.get('description'),
                status: data.get('status'),
                severity: data.get('severity'),
                project_id: project.id
            });
            dispatch(add_ticket(new_ticket));
            set_waiting_for_response(false);
            if (state && state.from)
                history.replace(state.from.pathname);
            else
                history.replace('/project/' + project.id);
        }
        catch(err)
        {
            set_waiting_for_response(false);
            console.log(err);
        }
    }
    return  project ? <div className='slider'>
        <div>
            <h3>Submit a New Ticket</h3>
        </div>
        <div>
            <form onSubmit={handle_submit} id='create-project'>
                <div>
                    <label htmlFor='task'>Ticket Title</label>
                    <input type='text' name='task'/>
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input type='description' name='description'/>
                </div>
                <div>
                    <label htmlFor='status'>Status</label>
                    <select name='status'>
                        <option defaultValue value={0}>Open</option>
                        <option value={1}>Development</option>
                        <option value={2}>Testing</option>
                        <option value={3}>Closed</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='severity'>Severity</label>
                    <select name='severity'>
                        <option defaultValue value={0}>Urgent</option>
                        <option value={1}>Not Urgent</option>
                        <option value={2}>Lax</option>
                        <option value={3}>LAU</option>
                    </select>
                </div>
                
                { waiting_for_response ? <div>creating...</div> : <input type='submit' value='create'/> }
            </form>
        </div>
    </div> : <Redirect to='/home'/>;
}

export default CreateTicket;