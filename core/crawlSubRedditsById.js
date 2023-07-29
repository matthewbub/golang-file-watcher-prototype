import dotenv from 'dotenv'
dotenv.config()
import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

let lastFetchTime = Date.now();
const fetchIntervalTime = 2 * 60 * 1000 / 16; // 8 requests per minute


async function fetchSubreddits(offset = 0) {
  const { data } = await supabase
    .from('subreddits')
    .select('id, subreddit')
    .range(offset, offset + 999);

  if (!data || data.length === 0) {
    return;
  }

  // Throttle the requests to Reddit by waiting for the interval before proceeding with the next request.
  for (const { id, subreddit } of data) {
    if (id && subreddit) {
      lastFetchTime = Date.now();
      const url = `https://www.reddit.com/r/${subreddit}/about.json`;

      console.log('[INFO] Valid subreddit found. Fetching subreddit data...')
      const response = await fetch(url);
      const json = await response.json();
      const { data: updated, error } = await supabase
        .from('subreddits')
        .update(updateSubFactory(subreddit, json?.data))
        .eq('id', id)
        .select();


      console.log('[DEBUG]', { updated, error });
    }


    // console.log('json.dump', {
    //   display_name: json?.data?.display_name || '',
    //   lang: json?.data?.lang || '',
    //   advertiser_category: json?.data?.advertiser_category || '',
    //   created_utc: json?.data?.created_utc || '',
    //   subscribers: json?.data?.subscribers || '',
    //   last_seen: new Date().toISOString() || '',
    //   public_description: json?.data?.public_description || '',
    //   description: json?.data?.description || '',
    //   community_icon: json?.data?.community_icon || '',
    //   over18: json?.data?.over18,
    //   subreddit: subreddit.subreddit || '',
    // })

    // await supabase.from('data').update({
    //   display_name: json?.data?.display_name || '',
    //   lang: json?.data?.lang || '',
    //   advertiser_category: json?.data?.advertiser_category || '',
    //   created_utc: json?.data?.created_utc || '',
    //   subscribers: json?.data?.subscribers || '',
    //   last_seen: new Date().toISOString() || '',
    //   public_description: json?.data?.public_description || '',
    //   description: json?.data?.description || '',
    //   community_icon: json?.data?.community_icon || '',
    //   over18: json?.data?.over18,
    //   subreddit: subreddit.subreddit || '',
    // }).eq('id', id);

    console.log('[INFO] Fetching subreddit data complete!')

    await new Promise(resolve => setTimeout(resolve, fetchIntervalTime)); // wait for the interval    
  }

  await fetchSubreddits(offset + 1000);
}

fetchSubreddits()



function updateSubFactory(subreddit, data) {
  return ({
    display_name: data?.display_name || '',
    lang: data?.lang || '',
    advertiser_category: data?.advertiser_category || '',
    created_utc: data?.created_utc || '',
    subscribers: data?.subscribers || '',
    last_seen: new Date().toISOString() || '',
    public_description: data?.public_description || '',
    description: data?.description || '',
    community_icon: data?.community_icon || '',
    over18: data?.over18,
    subreddit: subreddit,
  })
}