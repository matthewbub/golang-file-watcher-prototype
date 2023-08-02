import { Hero } from '../../components/__WireFrames/Heros/Hero__Barracuda'
import { HeroCTA } from '../../components/__WireFrames/Heros/HeroCTA__Badger'
export default function HomePage() {

  return (
    <>
      <div className="">
        <Hero>
          <HeroCTA />
        </Hero>
        <style jsx global>
          {`
            .hero__cta__centeredRow {
              margin: 0 auto;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
            }

            .hero__cta__centeredRow .hero__cta__button {
              margin-right: 15px;
            }

            .hero__cta__centeredRow .hero__cta__button:last-child {
              margin-right: 0;
            }
          `}
        </style>
      </div>
    </>
  )
}
