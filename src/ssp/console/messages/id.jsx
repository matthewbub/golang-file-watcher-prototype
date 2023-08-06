import { sspWithAuth } from "@/helpers";

export const getServerSideProps = sspWithAuth(async (context) => {
  const { id } = context.params;
  return {
    props: {
      primaryTitle: 'Documents',
      id: id
    }
  }
})
