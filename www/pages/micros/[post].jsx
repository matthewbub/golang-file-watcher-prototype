import { allArticles } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Fragment } from "react";
import Navigation from "../../components/Navigation";
import clsx from 'clsx';
import Footer from "../../components/Footer";

export default function PostPage({ post }) {
  const MDXComponent = useMDXComponent(post?.body?.code);
  if (!MDXComponent) return <p>Unable to load post.</p>;

  return (
    <Fragment>
      <Navigation />
      <div className={clsx("mx-auto max-w-7xl grid gap-4 grid-cols-4 ")}>
        <div id="prose" className={clsx(
          "max-w-full col-span-3",
          "px-8 sm:px-10 md:px-12",
        )}>
          <h1>{post?.title}</h1>
          <MDXComponent />
        </div>
        <div className="col-span-1">
            <p className="text-white">Side col</p>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
};

/**
 * This function gets called at build time
 *  - It will be pre-rendered for each path returned by getStaticPaths
 *  - The fallback prop tells Next.js to serve a fallback version of the page on the first request to such a path 
 *    and then attempt to generate the required HTML on the fly. 
 *    This way, even if a new post gets added after the build, it won't result in a 404 page.
 */
export async function getStaticPaths() {
  const paths = allArticles.map((post) => '/' + post.category.toLowerCase() + '/' + post.slug);
  return { paths, fallback: true } 
};

export async function getStaticProps({params}) {
  const post = allArticles.find((post) => post.slug === params.post);

  if (!post) {
    return { notFound: true, } // Return 404 page
  }
  return { props: { post } };
};

