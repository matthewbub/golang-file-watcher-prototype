import dotenv from 'dotenv'
dotenv.config()
import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

let loggerInterval = null;
let fetchInterval = null;
let lastFetchTime = Date.now();
const fetchIntervalTime = 2 * 60 * 1000 / 16; // 8 requests per minute

function startLogger() {
  loggerInterval = setInterval(() => {
    const now = Date.now();
    const timeElapsed = now - lastFetchTime;
    const remainingTime = fetchIntervalTime - timeElapsed;
    console.log(`Time until next fetch: ${Math.ceil(remainingTime / 1000)} seconds`);
  }, 5000);
}

const crawlReddit = async (url, interval = fetchIntervalTime) => {
  lastFetchTime = Date.now();

  console.log('Crawling Reddit...')
  const response = await fetch(url)
  const json = await response.json()

  for (const child of json.data.children) {
    const { data } = child
    await supabase.from('subreddits').upsert([
      {
        subreddit: data.subreddit,
        is_nsfw: data.over_18,
        last_seen: new Date().toISOString(),
      }
    ]).eq('subreddit', data.subreddit)
  }

  console.log('Crawling Reddit Complete!')
  fetchInterval = setTimeout(() => {
    crawlReddit(url, interval)
  }, interval)
};


startLogger()
crawlReddit(`https://www.reddit.com/new.json`, fetchIntervalTime)