import '../styles/prose.css';
import '../styles/tailwind.css';
import "@code-hike/mdx/dist/index.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <main>
      <div id="interface" className='max-w-7xl mx-auto dark:bg-[#18181B]/70 dark:border-[#202022] border-x'>
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        main { background-color: #080705; }

        #interface, 
        .popover-panel { 
          background-image: url('/nnnoise.svg');
          background: #18181B;
        }
      `}</style>
    </main>
  )
}