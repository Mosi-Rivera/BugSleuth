import Button from '../button/button';
import('./profile_data.css');

const ProfileData = props => {
    return <div className='profile-data'>
        <div>
            <span className='username'>{props.user.username}</span>
            <span className='email'>{props.user.email}</span>
        </div>
        <Button nav to='/new_project' value='create project' />
    </div>
}

export default ProfileData;