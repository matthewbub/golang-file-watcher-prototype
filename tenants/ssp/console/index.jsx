export const getServerSideProps = async () => {
  return {
    props: {
      primaryTitle: 'Home',
      secondaryTitle: 'Recent deployments'
    }
  }
}
