import { ConsoleLayout } from '../../components';
import InitialClientEx from "./InitialClientEx";

const Page = ({ consoleLayout = {
  title: "Page",
  description: "Page description"
} }) => {
  return (
    <InitialClientEx>
      <ConsoleLayout {...consoleLayout} />
    </InitialClientEx>
  )
}

export default Page;
export { getServerSideProps } from './lifecycle/InitialServerEx';
