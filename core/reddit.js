import dotenv from 'dotenv'
dotenv.config()
import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

let loggerInterval = null;
let fetchInterval = null;
let lastFetchTime = Date.now();
const fetchIntervalTime = 60 * 1000 / 6; // 10 requests per minute

function startLogger() {
  loggerInterval = setInterval(() => {
    const now = Date.now();
    const timeElapsed = now - lastFetchTime;
    const remainingTime = fetchIntervalTime - timeElapsed;
    console.log(`Time until next fetch: ${Math.ceil(remainingTime / 1000)} seconds`);
  }, 5000);
}

const crawlReddit = async (url, interval = 2 * 60 * 1000) => {
  lastFetchTime = Date.now();

  console.log('Crawling Reddit...')
  const response = await fetch(url)
  const json = await response.json()

  const data = json.data.children.reduce((acc, child) => {
    const { data } = child
    return ([
      ...acc,
      {
        subreddit: data.subreddit,
        cId: data.id,
        is_nsfw: data.over_18,
        permalink: data.permalink,
        num_comments: data.num_comments
      }
    ])
  }, [])

  const { error } = await supabase.from('reddit').insert([...data]);



  console.log('Crawling Reddit Complete!')
  fetchInterval = setTimeout(() => {
    crawlReddit(url, interval)
  }, interval)
};


startLogger()
crawlReddit(`https://www.reddit.com/new.json`, fetchIntervalTime)