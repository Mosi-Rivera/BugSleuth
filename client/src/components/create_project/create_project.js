import { useState }     from 'react';
import NavBar           from '../../components/navbar/navbar';
import {useDispatch}    from 'react-redux';

const CreateProject = () => {
    const dispatch = useDispatch()
    const [waiting_for_response,set_waiting_for_response] = useState(false);
    const handle_submit = async e => {
        try
        {
            e.preventDefault();
            const {create_project} = await import('../../api/routes/project');
            const {add_project} = await import('../../redux/reducers/projects');
            const data = new FormData(e.target);
            set_waiting_for_response(true);
            const new_project = await create_project({
                title:  data.get('title'),
                info:   data.get('info'),
                status: data.get('status')
            });
            dispatch(add_project(new_project));
            set_waiting_for_response(false);
        }
        catch(err)
        {
            set_waiting_for_response(false);
            console.log(err);
        }
    }
    return  <div className='slider'>
        <NavBar/>
        <div>
            <h3>Create a new project</h3>
        </div>
        <div>
            <form onSubmit={handle_submit} id='create-project'>
                <div>
                    <label htmlFor='title'>Project Name</label>
                    <input type='text' name='title' placeholder='Project Title...'/>
                    <span>Great project names are short and descriptive.</span>
                </div>
                <div>
                    <label htmlFor='info'>Description</label>
                    <input type='description' name='info'/>
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
                
                { waiting_for_response ? <div>creating...</div> : <input type='submit' value='create'/> }
            </form>
        </div>
    </div> ;
}

export default CreateProject;