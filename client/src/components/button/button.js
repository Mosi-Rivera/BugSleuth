import {Link} from 'react-router-dom';
import('./button.css');
const Button = props => (
    props.nav ? <Link className='button' to={props.to}>{props.value}</Link> :
    <div onClick={props.onClick ? props.onClick : () => {}} className='button'>
        {props.value}
    </div>
);

export default Button;