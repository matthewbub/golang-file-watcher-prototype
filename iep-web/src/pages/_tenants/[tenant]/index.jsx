export default function Page({ tenant }) {
  return (
    <div className="bg-white">
      hello world!
    </div>
  )
}

export const getServerSideProps = async (context) => {
  console.log('context', context)
  return {
    props: {
      tenant: context.query.tenant,
    },
  }
}
