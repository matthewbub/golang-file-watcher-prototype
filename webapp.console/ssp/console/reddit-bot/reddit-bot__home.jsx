export const getServerSideProps = async () => {
  return {
    props: {
      primaryTitle: 'Reddit Bot',
      secondaryTitle: 'Recent deployments',
    }
  }
}