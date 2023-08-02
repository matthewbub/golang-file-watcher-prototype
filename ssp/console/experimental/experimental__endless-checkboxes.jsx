export const getServerSideProps = async () => {
  return {
    props: {
      primaryTitle: 'Endless Checkboxes',
      secondaryTitle: 'Recent deployments'
    }
  }
}
