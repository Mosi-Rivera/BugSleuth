import {Link} from 'react-router-dom';
import {role_str} from '../../value_to_string';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import('./worker_card.css');
const WorkerCard = props => {
    return <div className='worker-card'>
        <Row>
            <Col xs={8}>
                <Row>
                    <Col sm={6}>
                        {
                            props.admin ? (
                                <Link to={'/worker/' + props.data?.id}>{props.data?.username}</Link>
                            ) : (
                                <span>{props.data?.username}</span>
                            )
                        }
                    </Col>
                    <Col sm={6}>
                        <span className='role'>{role_str(props.data?.role)}</span>
                    </Col>
                </Row>
            </Col>
            
            <Col xs={4}>
                {
                    props.data?.role > 1 && <span className='remove' onClick={() => props.click_event(props.data?.id,props.data?.role)}>remove</span>
                }
            </Col>
        </Row>
    </div>;
}

export default WorkerCard;