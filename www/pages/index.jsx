import { 
  allArticles
} from "contentlayer/generated"
import Navigation from "../components/Navigation";
import clsx from 'clsx';
import Footer from "../components/Footer";
import Link from "next/link";
import BlogLanding from "../components/BlogLanding";
import { allDocuments } from "../.contentlayer/generated/index.mjs";

export default function Page({articles, legal}) {
  return (
    <div>
      <Navigation />
      <div className='px-4 sm:px-6 md:px-8 space-y-6'>
        {articles.map((article) => (
          <div key={article.slug}>
            <Link href={`/${article.category}/${article.slug}`}>
              <h2 className="text-white">{article.title}</h2>
            </Link>
            <span className="text-[#A1A1AA]">
              <strong>Dependencies:</strong> {article.dependencies.map((tag, index) => (
                <span key={tag}>
                  <Link href={`/tags/${tag}`} className={clsx('text-[#A1A1AA]', index > 0 && 'ml-2')}>
                    {tag}
                  </Link>

                  {index < article.dependencies.length - 1 && (
                    <span className="text-[#A1A1AA]">, </span>
                  )}

              </span>
              ))}


            </span>
          </div>
        ))}
      </div>
      <Footer links={{legal}}/>
    </div>
  )
}

export async function getStaticProps() {
  return { 
    props: { 
      articles: allArticles.filter(({category}) => category === 'micros'),
      legal: allDocuments.filter(({category}) => category === 'legal'),
    } 
  }
}
