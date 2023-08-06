import { useState } from 'react';
import { Button, ConsoleLayout, ConfigurableForm } from '../../../components';
import PathHandler from '../../../helpers/PathHandler';

const pathHandler = new PathHandler('console');

const Primary = ({ open, setOpen, form }) => {
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

const Page = ({ primaryTitle, form }) => {
  const [open, setOpen] = useState(false);
  return (
    <ConsoleLayout
      primaryTitle={primaryTitle}
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
