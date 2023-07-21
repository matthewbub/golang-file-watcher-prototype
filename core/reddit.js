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

  // console.log('json', json.data)

  const data = json.data.children.reduce((acc, child) => {
    const { data } = child
    return ([
      ...acc,
      {
        subreddit: data.subreddit,
        cId: data.id,
        is_nsfw: data.over_18,
        data: {
          selftext: data.selftext,
          author_fullname: data.author_fullname,
          title: data.title,
          subreddit_name_prefixed: data.subreddit_name_prefixed,
          name: data.name,
          upvote_ratio: data.upvote_ratio,
          subreddit_type: data.subreddit_type,
          ups: data.ups,
          total_awards_received: data.total_awards_received,
          media_embed: data.media_embed,
          thumbnail_width: data.thumbnail_width,
          author_flair_template_id: data.author_flair_template_id,
          is_original_content: data.is_original_content,
          user_reports: data.user_reports,
          secure_media: data.secure_media,
          is_reddit_media_domain: data.is_reddit_media_domain,
          is_meta: data.is_meta,
          category: data.category,
          secure_media_embed: data.secure_media_embed,
          link_flair_text: data.link_flair_text,
          can_mod_post: data.can_mod_post,
          score: data.score,
          approved_by: data.approved_by,
          author_premium: data.author_premium,
          thumbnail: data.thumbnail,
          edited: data.edited,
          author_flair_css_class: data.author_flair_css_class,
          author_flair_richtext: data.author_flair_richtext,
          gildings: data.gildings,
          post_hint: data.post_hint,
          content_categories: data.content_categories,
          is_self: data.is_self,
          mod_note: data.mod_note,
          created: data.created,
          link_flair_type: data.link_flair_type,
          wls: data.wls,
          banned_by: data.banned_by,
          author_flair_type: data.author_flair_type,
          domain: data.domain,
          allow_live_comments: data.allow_live_comments,
          selftext_html: data.selftext_html,
          likes: data.likes,
          suggested_sort: data.suggested_sort,
          banned_at_utc: data.banned_at_utc,
          view_count: data.view_count,
          archived: data.archived,
          no_follow: data.no_follow,
          is_crosspostable: data.is_crosspostable,
          pinned: data.pinned,
          over_18: data.over_18,
          preview: data.preview,
          all_awardings: data.all_awardings,
          awarders: data.awarders,
          media_only: data.media_only,
          link_flair_template_id: data.link_flair_template_id,
          can_gild: data.can_gild,
          spoiler: data.spoiler,
          locked: data.locked,
          author_flair_text: data.author_flair_text,
          treatment_tags: data.treatment_tags,
          visited: data.visited,
          removed_by: data.removed_by,
          num_reports: data.num_reports,
          distinguished: data.distinguished,
          subreddit_id: data.subreddit_id,
          author_is_blocked: data.author_is_blocked,
          mod_reason_by: data.mod_reason_by,
          removal_reason: data.removal_reason,
          link_flair_background_color: data.link_flair_background_color,
          id: data.id,
          is_robot_indexable: data.is_robot_indexable,
          report_reasons: data.report_reasons,
          author: data.author,
          discussion_type: data.discussion_type,
          num_comments: data.num_comments,
          send_replies: data.send_replies,
          whitelist_status: data.whitelist_status,
          contest_mode: data.contest_mode,
          mod_reports: data.mod_reports,
          author_patreon_flair: data.author_patreon_flair,
          author_flair_text_color: data.author_flair_text_color,
          permalink: data.permalink,
          parent_whitelist_status: data.parent_whitelist_status,
          stickied: data.stickied,
          url: data.url,
          subreddit_subscribers: data.subreddit_subscribers,
          created_utc: data.created_utc,
          num_crossposts: data.num_crossposts,
          media: data.media,
          is_video: data.is_video,
        },
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