import {useHistory,useLocation} from 'react-router-dom';
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

const LandingPage = props => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const handle_signup = async e => {
        e.preventDefault();
        try
        {
            const {state} = location;
            const signup_data= get_form_data(e);
            const {signup} = await import('../../api/routes/auth');
            const {authenticate} = await import('../../redux/reducers/r_auth');
            dispatch(authenticate(await signup(signup_data)));
            if (state && state.form)
                history.replace(state.from.pathname);
            else
                history.replace('/home');
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
            const {state} = location;
            const {login} = await import('../../api/routes/auth');
            const {authenticate} = await import('../../redux/reducers/r_auth');
            dispatch(authenticate(await login(get_form_data(e))));
            if (state && state.form)
                history.replace(state.from.pathname);
            else
                history.replace('/home');
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
                const {state} = location;
                const {is_logged_in} = await import('../../api/routes/auth');
                const {authenticate} = await import('../../redux/reducers/r_auth');
                dispatch(authenticate(await is_logged_in()));
                if (state && state.from)
                    history.replace(state.from.pathname);
                else
                    history.replace('/home');
            }
            catch(err)
            {
                console.log(err);
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