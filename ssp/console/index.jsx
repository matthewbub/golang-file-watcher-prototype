import { sspWithAuth } from "@/helpers"

export const getServerSideProps = sspWithAuth(async (context) => {
  return {
    props: {
      primaryTitle: 'Home',
      secondaryTitle: 'Recent deployments'
    }
  }
}
)