import {memo} from 'react';
import {Link} from 'react-router-dom';
import('./navbar.css');
const NavBar = (props) => {
    return <div className='navbar'>
        <Link to='/home' className='title'>
            BUG SLEUTH
        </Link>
        <div>
            <div>Logout</div>
        </div>
    </div>
}

export default memo(NavBar);