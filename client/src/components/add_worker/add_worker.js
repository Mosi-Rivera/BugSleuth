import Modal from 'react-bootstrap/Modal';
import('./add_worker.css');
const AddWorker = props => {
    const handle_submit = async e => {
        e.preventDefault();
        try
        {
            const data = new FormData(e.target);
            const {invite_worker}   = await import('../../api/routes/worker');
            props.add_worker(await invite_worker({
                project_id: props.project_id,
                role: data.get('role'),
                email: data.get('email'),
            }));
            e.target.reset();
            props.onHide();
        }
        catch(err)
        {
            console.log(err);
            props.onHide();
        }
    }
    return <Modal show={props.show} onHide={props.onHide} size='sm' centered>
        <Modal.Body className='modal-add-worker'>
            <h3>Add Worker</h3>
            <hr/>
            <form onSubmit={handle_submit}>
                <div>
                    <input name='email' type='email' placeholder='email' />
                </div>
                <hr></hr>
                <div>
                    <select name='role'>
                        <option value={1} defaultValue>admin</option>
                        <option value={2}>developer</option>
                        <option value={3}>viewer</option>
                    </select>
                </div>
                <hr></hr>
                <div>
                    <input type='submit' value='invite' />
                </div>
            </form>
        </Modal.Body>
    </Modal>
}

export default AddWorker;