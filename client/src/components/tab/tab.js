import {useState} from 'react';
import('./tab.css');
const Tab = props => {
    return <div className='c-tab'>
        {
            props.tabs?.map(
                (elem,i) => (
                    <div className={'tab ' + (props.tab == i ? 'active' : '')} key={'tab-' + elem.name + i} onClick={() => props.set_tab(i)}>
                        <span>{elem.name}</span>
                        { elem.count !== undefined && <span className='count'>{elem.count}</span> }
                    </div>
                )
            )
        }

    </div>
}

export default Tab;