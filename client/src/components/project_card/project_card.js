

function ProjectCard(props)
{
    return <div className='project-card-container'>
        <div>
            <h3>{props.data?.title}</h3>
            <p>{props.data?.info}</p>
            <div><span>{props.data?.status}</span></div>
        </div>
    </div>
}

export default ProjectCard;