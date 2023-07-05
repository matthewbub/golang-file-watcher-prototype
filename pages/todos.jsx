import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Overlay from '../components/Overlay';

const TodosPage = () => {
  return (
    <Overlay />
  )
}

export default withPageAuthRequired(TodosPage);
