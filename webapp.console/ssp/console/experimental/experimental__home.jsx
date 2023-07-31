export const getServerSideProps = async () => {
  return {
    props: {
      primaryTitle: 'Experimental',
      secondaryTitle: 'Recent deployments'
    }
  }
}
