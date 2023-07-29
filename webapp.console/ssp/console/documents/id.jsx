export const getServerSideProps = async (context) => {
  const { id } = context.params;
  return {
    props: {
      primaryTitle: 'Documents',
      id: id
    }
  }
}
