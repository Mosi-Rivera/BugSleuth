import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import Button from '../button/button';
import('./profile_data.css');

const ProfileData = props => {
    let user = useSelector(state => state.auth.user);
    return <div className='profile-data'>
        <div>
            <span className='username'>{user.username}</span>
            <span className='email'>{user.email}</span>
        </div>
        <Button nav to='/new_project' value='create project' />
    </div>
}

export default ProfileData;