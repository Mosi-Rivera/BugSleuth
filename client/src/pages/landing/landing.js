import {useHistory,useLocation} from 'react-router-dom';
import {useEffect,useState} from 'react';
import('./landing.css');
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
    const [show_login,set_show_login] = useState(true);
    const toggle_show_login = () => set_show_login(!show_login);
    const handle_signup = async e => {
        e.preventDefault();
        try
        {
            const {state} = location;
            const {signup} = await import('../../api/routes/auth');
            props.authenticate(await signup(get_form_data(e)));
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
            props.authenticate(await login(get_form_data(e)));
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
                props.authenticate(await is_logged_in());
                if (state && state.from)
                    history.replace(state.from.pathname);
                else
                    history.replace('/home');
            }
            catch(err)
            {
                console.log(err);
            }
        })();
    },[]);
    return <div className='pseudo-body'>
        <div className='c-auth-form'>
            {
                show_login ? <div>
                    <h1>Sign in to BugSleuth</h1>
                    <div className='form'>
                        <form onSubmit={handle_login}>
                            <div>
                                <label for='email'>email</label>
                                <input type='email' name='email'/>
                            </div>
                            <div>
                                <label for='password'>password</label>
                                <input type='password' name='password'/>
                            </div>
                            <input type='submit' value='Sign In'/>
                        </form>
                    </div>
                    <div className='form-toggle'>
                        <p>New to Bug Sleuth? <span onClick={toggle_show_login}> Create an account.</span></p>
                    </div>
                </div> : <div>
                    <h1>Sign up to BugSleuth</h1>
                    <div className='form'>
                        <form onSubmit={handle_signup}>
                            <div>
                                <label for='email'>email</label>
                                <input type='email' name='email'/>
                            </div>
                            <div>
                                <label for='password'>password</label>
                                <input type='password' name='password'/>
                            </div>
                            <input type='submit' value='Sign Up'/>
                        </form>
                    </div>
                    <div className='form-toggle'>
                        <p>Already have an account? <span onClick={toggle_show_login}> Click here to Sign In.</span></p>
                    </div>
                </div>
            }
        </div>
    </div>;
}

export default LandingPage;