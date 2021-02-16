import {memo} from 'react';

function SideBar()
{
    return <div id='sidebar'>
        <div></div>
        <ul>
            <li>Projects</li>
            <li>My Tickets</li>
        </ul>
    </div>
}

export default memo(SideBar);