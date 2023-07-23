import { supabase } from "../../../supabase.config";

export const getServerSideProps = async () => {
  const { data, error } = await supabase
    .from('subreddits')
    .select('*')
    .order('last_seen', {
      ascending: false,
    })
    .limit(10)

  if (error) {
    console.log(error)
    return {
      props: {
        title: 'Subs',
        data: []
      }
    }
  }

  return {
    props: {
      title: 'Subs',
      data
    }
  }
}
