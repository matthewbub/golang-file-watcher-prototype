import { useState } from 'react';
import { ConsoleLayout } from '../../../components/ConsoleLayout';
import { navigation } from '../../../components/AppNavigation';
import PathHandler from '../../../helpers/PathHandler';
import Button from '../../../components/Button';
const pathHandler = new PathHandler('console');
import { useForm } from 'react-hook-form';
import { ConfigurableForm } from '../../../components/ConfigurableForm';

const Primary = ({ open, setOpen, form }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <ConfigurableForm
      open={open}
      setOpen={setOpen}
      form={form}
      slideOverTitle='Add Message'
      confirmModalTitle='Confirm'
      confirmModalDescription='Are you sure you want to submit this form?'
      confirmModalPrimaryAction='Submit Form'
      submitForm={(formFields) => { console.log(formFields); }}
      confirmBeforeSubmission={(formFields) => { console.log(formFields); }}
    />
  )
};

const Page = ({ primaryTitle, secondaryTitle, form }) => {
  const [open, setOpen] = useState(false);
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
      secondaryTitle={secondaryTitle}
      navigation={navigation}
      primary={() => <Primary open={open} setOpen={setOpen} form={form} />}
      primaryAction={() => <Button onClick={() => { setOpen(true) }}>Add Message</Button>}
      breadcrumbs={[
        {
          name: 'Messages',
          href: pathHandler.getPath('messages'),
          current: true
        },
      ]}
    />
  )
}

export { getServerSideProps } from '../../../ssp/console/messages/index';
export default Page;
