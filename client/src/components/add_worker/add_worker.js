import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

const AddWorker = props => {
    const dispatch = useDispatch();
    const handle_submit = async e => {
        e.preventDefault();
        try
        {
            const data = new FormData(e.target);
            const {add_worker}      = await import('../../redux/reducers/r_active_project');
            const {invite_worker}   = await import('../../api/routes/worker');
            dispatch(add_worker(await invite_worker({
                project_id: props.project_id,
                role: data.get('role'),
                email: data.get('email'),
            })));
        }
        catch(err)
        {
            console.log(err);
            props.on_close();
        }
    }
    return <Modal show={props.show} onHide={props.onHide} size='sm' centered>
        <Modal.Body>
            <form>
                <div>
                    <input name='email' type='email' placeholder='email' />
                </div>
                <div>
                    <select name='role'>
                        <option value={1} defaultValue>admin</option>
                        <option value={2}>developer</option>
                        <option value={3}>viewer</option>
                    </select>
                </div>
                <div>
                    <input type='submit' value='invite' />
                </div>
            </form>
        </Modal.Body>
    </Modal>
}

export default AddWorker;