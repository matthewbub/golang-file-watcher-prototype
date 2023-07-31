export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: {
      primaryTitle: 'Documents',
      id: id,
      form: {
        formTitle: 'Modify Document',
        formDescription: 'Modify Document Description',
        formFields: [
          {
            label: 'Title',
            name: 'document_title',
            type: 'text',
            className: 'col-span-12',
            field: 'Input'
          },
          {
            label: 'Submit',
            name: 'submit',
            type: 'submit',
            className: 'col-span-4',
            field: 'SubmitButton'

          }
        ]
      }
    }
  }
}
