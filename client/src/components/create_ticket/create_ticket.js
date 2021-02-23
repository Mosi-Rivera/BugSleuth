import {Redirect, useHistory, useLocation, Link, useParams} from 'react-router-dom';
import {status,severity} from '../../value_to_string';
import {useState} from 'react';
import ErrorText from '../error_text/error_text';
const CreateTicket = props => {
    const {project_id} = useParams();
    const location  = useLocation();
    const history   = useHistory();
    const [error_text,set_error_text] = useState(null);
    const [waiting_for_response,set_waiting_for_response] = useState(false);
    const handle_submit = async e => {
        try
        {
            e.preventDefault();
            const {state} = location;
            const {create_ticket} = await import('../../api/routes/ticket');
            const data = new FormData(e.target);
            set_waiting_for_response(true);
            const new_ticket = await create_ticket({
                task:  data.get('task'),
                description:   data.get('description'),
                status: data.get('status'),
                severity: data.get('severity'),
                project_id: project_id
            });
            set_waiting_for_response(false);
            if (state && state.from)
                history.replace(state.from.pathname);
            else
                history.replace('/project/' + project_id);
        }
        catch(err)
        {
            set_waiting_for_response(false);
            err.text().then(res => set_error_text(res));
            console.log(err);
        }
    }
    return <div className='c-create-ticket'>
        <div>
            <Link to={'/project/' + project_id}>Back</Link> 
            <h1>/Submit a New Ticket</h1>
        </div>
        <div>
            <form onSubmit={handle_submit} id='create-project'>
                <ErrorText error={error_text}/>
                <div>
                    <label htmlFor='task'>Ticket Title</label>
                    <input type='text' name='task'/>
                </div>
                <hr/>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input type='description' name='description'/>
                </div>
                <hr/>
                <div>
                    <label htmlFor='status'>Status</label>
                    <select name='status'>
                        {
                            status.map((elem,i) => <option value={i} key={'status-option-' + i}>{elem}</option>)
                        }
                    </select>
                </div>
                <hr/>
                <div>
                    <label htmlFor='severity'>Severity</label>
                    <select name='severity'>
                        {
                            severity.map((elem,i) => <option value={i} key={'severity-option-' + i}>{elem}</option>)
                        }
                    </select>
                </div>
                <hr/>
                { waiting_for_response ? <div>creating...</div> : <input type='submit' value='create'/> }
            </form>
        </div>
    </div>;
}

export default CreateTicket;