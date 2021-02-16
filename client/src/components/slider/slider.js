import {useEffect, useState} from 'react';
let timeout;
const transition_style = {
    left: '100px',
}
const Slider = (props) => {
    const [transition,set_transition] = useState(false);
    useEffect(() => {
        if (props.show)
            timeout = setTimeout(() => {set_transition(true)},0);
        else
        {
            clearTimeout(timeout);
            set_transition(false);
        }
        return () => clearTimeout(timeout);

    },[props.show]);
    return props.show ? <div className='slider' style={transition ? transition_style : {}}>
        <div className='close-slider' onClick={props.handle_close}></div>
        {props.body}
    </div> : null;
}

export default Slider;