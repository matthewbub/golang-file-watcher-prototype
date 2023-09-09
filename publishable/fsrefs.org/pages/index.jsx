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
      <BlogLanding />
      {articles.map((article) => (
        <div key={article.slug}>
          <Link href={`/${article.category}/${article.slug}`}>
            <h2 className="text-white">{article.title}</h2>
          </Link>
        </div>
      ))}
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
