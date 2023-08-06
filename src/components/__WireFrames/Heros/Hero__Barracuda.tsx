import React from 'react'
import { ids, theme } from '../theme'

interface HeroProps {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  children: React.ReactNode
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow = 'Eyebrow text here',
  title = 'Title text here, make it flashy!',
  subtitle = 'Subtitle text here, keep it two lines or less!',
  image = 'https://via.placeholder.com/1200x600',
  children = null
}) => {
  return (
    <>
      <section id={ids.heroBarracuda} className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">{eyebrow}</span>
          <h2 className="hero__title">{title}</h2>
          <p className="hero__subtitle">{subtitle}</p>
          <div className="hero__cta">
            {children}
          </div>
        </div>
        <div className='hero__imageContainer'>
          <img src={image} alt={title} />
        </div>
      </section>
      <style jsx>
        {`
          #${ids.heroBarracuda} {            
            margin: 0 auto;
            padding-top: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          #${ids.heroBarracuda} .hero__content {
            margin: auto 30px;
            text-align: center;            
            max-width: 1280px;
          }

          #${ids.heroBarracuda} .hero__eyebrow {
            color: ${theme.primaryColor};
            font-size:  ${theme.heroEyebrow__fontSize__mobile};
            font-weight: ${theme.heroEyebrow__fontWeight};
            margin-bottom: 5px;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          #${ids.heroBarracuda} .hero__title {
            color: ${theme.primaryTextColor};
            font-size: ${theme.heroTitle__fontSize__mobile};
            line-height: ${theme.heroTitle__lineHeight__mobile};
            font-weight: ${theme.heroTitle__fontWeight};
            margin-bottom: 30px;
          }

          #${ids.heroBarracuda} .hero__subtitle {
            color:  ${theme.secondaryTextColor};
            font-size: ${theme.heroSubtitle__fontSize__mobile};
            line-height: ${theme.heroSubtitle__lineHeight__mobile};
            font-weight: ${theme.heroSubtitle__fontWeight};
          }

          #${ids.heroBarracuda} .hero__cta {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 30px auto;
          }

          #${ids.heroBarracuda} .hero__imageContainer {
            height: 600px;
            width: 100%;
            overflow: hidden;
            margin-top: 60px;
            padding: 0 30px;
          }

          #${ids.heroBarracuda} .hero__imageContainer img {            
            margin: 0 auto;
          }

          @media (min-width: 768px) {
            #${ids.heroBarracuda} {
              padding-top: 100px;
            }

            #${ids.heroBarracuda} .hero__eyebrow {
              font-size: ${theme.heroEyebrow__fontSize__tablet};
              line-height: ${theme.heroEyebrow__lineHeight__tablet};
            }

            #${ids.heroBarracuda} .hero__title {
              font-size: ${theme.heroTitle__fontSize__tablet};
              line-height: ${theme.heroTitle__lineHeight__tablet};
            }

            #${ids.heroBarracuda} .hero__subtitle {
              font-size: ${theme.heroSubtitle__fontSize__tablet};
              line-height: ${theme.heroSubtitle__lineHeight__tablet};
            }
          }

          @media (min-width: 1024px) {
            #${ids.heroBarracuda} {
              padding-top: 120px;
            }

            #${ids.heroBarracuda} .hero__eyebrow {
              font-size: ${theme.heroEyebrow__fontSize__desktop};
              line-height: ${theme.heroEyebrow__lineHeight__desktop};              
            }

            #${ids.heroBarracuda} .hero__title {
              font-size: ${theme.heroTitle__fontSize__desktop};
              line-height: ${theme.heroTitle__lineHeight__desktop};
            }

            #${ids.heroBarracuda} .hero__subtitle {
              font-size: ${theme.heroSubtitle__fontSize__desktop};
              line-height: ${theme.heroSubtitle__lineHeight__desktop};
            }
          }
        `}
      </style>
    </>
  )
}
