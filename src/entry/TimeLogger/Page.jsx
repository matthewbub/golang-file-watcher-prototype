import { ConsoleLayout, Input, Button, TextArea } from '../../components';
import InitialClientEx from "./InitialClientEx";
import { useForm } from 'react-hook-form';

const Page = ({ consoleLayout = {
  title: "Page",
  description: "Page description"
} }) => {
  const { register } = useForm();
  return (
    <InitialClientEx>
      <ConsoleLayout {...consoleLayout}
        primary={() => {
          return (
            <div className='container-padding'>
              <h1 className='txt1 text-2xl'>New Time</h1>
              <ul>
                <li>
                  <div>

                    <Input label='Start' register={register} name="hello" />
                    <TextArea label='Description' register={register} name="a" />
                  </div>
                </li>
              </ul>
            </div>
          )
        }}
      />
    </InitialClientEx>
  )
}

export default Page;
export { getServerSideProps } from './InitialServerEx';