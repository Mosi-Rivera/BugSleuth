import CreateProject from "../../components/create_project/create_project";
import ComponentView from "../../views/component_view/component_view";


const CreateProjectPage = props => (<ComponentView {...props} size='sm' component={<CreateProject/>}/>);

export default CreateProjectPage;