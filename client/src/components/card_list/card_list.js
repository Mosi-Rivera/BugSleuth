import('./card_list.css');

function ProjectList(props)
{
    return <div className='card-list'>
        {
            props.data?.map((data,i) => <props.component key={'card-item-' + i} data={data}/>)
        }
    </div>
}

export default ProjectList;