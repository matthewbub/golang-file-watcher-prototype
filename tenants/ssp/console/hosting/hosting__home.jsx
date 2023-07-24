export const getServerSideProps = async () => {
  return {
    props: {
      primaryTitle: 'Hosting',
      secondaryTitle: 'Recent deployments'
    }
  }
}
