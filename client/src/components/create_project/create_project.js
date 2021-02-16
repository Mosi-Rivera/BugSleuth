import { useState } from 'react';
import Slider from '../slider/slider';

const CreateProject = () => {
    const [waiting_for_response,set_waiting_for_response] = useState(false);
    const handle_submit = async e => {
        try
        {
            e.preventDefault();
            const {create_project} = await import('../../api/routes/project');
            const data = new FormData(e.target);
            set_waiting_for_response(true);
            const new_project = await create_project({
                title:  data.get('title'),
                info:   data.get('info'),
                status: data.get('status')
            });
            set_waiting_for_response(false);
        }
        catch(err)
        {
            set_waiting_for_response(false);
            console.log(err);
        }
    }
    return <Slider show={true} handle_close={() => {}} body={ <div className='slider'>
        <form onSubmit={handle_submit} id='create-project'>
            <div>
                <input type='text' name='title'/>
            </div>
            <div>
                <select name='status'>
                    <option selected value={0}>Open</option>
                    <option value={1}>Development</option>
                    <option value={2}>Testing</option>
                    <option value={3}>Closed</option>
                </select>
            </div>
            <div>
                <textarea name='info' form='create-project' placeholder='Project description...'></textarea>
            </div>
            
            { waiting_for_response ? <div>creating...</div> : <input type='submit' value='create'/> }
        </form>
    </div> }/>;
}

export default CreateProject;