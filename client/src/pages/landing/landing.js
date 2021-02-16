import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {USER_LOGOUT} from '../../redux/store';
import {useEffect} from 'react';

const get_form_data = e => {
    let data = new FormData(e.target);
    console.log(e,e.target,e.current);
    return {
        email: data.get('email'),
        password: data.get('password'),
    }
}

const LandingPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const handle_signup = async e => {
        e.preventDefault();
        try
        {
            const signup_data= get_form_data(e);
            const {signup} = await import('../../api/routes/auth');
            const {authenticate} = await import('../../redux/reducers/r_auth');
            console.log(signup_data);
            dispatch(authenticate(await signup(signup_data)));
            history.push('/home');
        }
        catch(err)
        {
            console.log(err);
        }
    }
    const handle_login = async e => {
        e.preventDefault();
        try
        {
            const {login} = await import('../../api/routes/auth');
            const {authenticate} = await import('../../redux/reducers/r_auth');
            dispatch(authenticate(await login(get_form_data(e))));
            history.push('/home');
        }
        catch(err)
        {
            console.log(err);
        }
    }
    useEffect(() => {
        (async () => {
            try
            {
                const {is_logged_in} = await import('../../api/routes/auth');
                const {authenticate} = await import('../../redux/reducers/r_auth');
                dispatch(authenticate(await is_logged_in()));
                history.push('/home');
            }
            catch(err)
            {
                dispatch(USER_LOGOUT());
            }
        })();
    },[]);
    return <div className='pseudo-body'>
        <form onSubmit={handle_login}>
            <div>
                <input type='email' placeholder='email' name='email'/>
            </div>
            <div>
                <input type='password' placeholder='password' name='password'/>
            </div>
            <input type='submit' value='Log In'/>
        </form>
        <form onSubmit={handle_signup}>
            <div>
                <input type='email' placeholder='email' name='email'/>
            </div>
            <div>
                <input type='password' placeholder='password' name='password'/>
            </div>
            <input type='submit' value='Sign Up'/>
        </form>
    </div>;
}

export default LandingPage;