import {memo} from 'react';
import {Link} from 'react-router-dom';
import('./navbar.css');
const NavBar = (props) => {
    const handle_logout = async () => {
        try
        {
            const {logout} = require('../../api/routes/auth');
            await logout();
            props.logout();
            history.replace('/');
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return <div className='navbar'>
        <div>
            <Link to='/home' className='title'>
                BUG SLEUTH
            </Link>
            <Link to='/home'>
                Home
            </Link>
        </div>
        <div>
            <div onClick={handle_logout}>Logout</div>
        </div>
    </div>
}

export default memo(NavBar);