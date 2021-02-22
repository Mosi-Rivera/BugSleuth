import ComponentView from "../../views/component_view/component_view";
import Ticket from '../../components/ticket/ticket';

const TicketPage = props => <ComponentView
component = {<Ticket user={props.user} />}
/>

export default TicketPage;