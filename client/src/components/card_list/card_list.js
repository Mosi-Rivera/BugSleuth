function ProjectList(props)
{
    return <div className='project-list'>
        {
            props.data?.map((data,i) => <props.component key={'card-item-' + i} data={data}/>)
        }
    </div>
}

export default ProjectList;