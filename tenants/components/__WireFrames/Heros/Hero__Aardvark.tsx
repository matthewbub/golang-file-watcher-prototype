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
      <section id={ids.heroAardvark} className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">{eyebrow}</span>
          <h2 className="hero__title">{title}</h2>
          <p className="hero__subtitle">{subtitle}</p>
          <div className="hero__cta">
            {children}
          </div>
        </div>
      </section>
      <style jsx>
        {`
          #${ids.heroAardvark} {
            height: 600px;
            background-image: url(${image});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          #${ids.heroAardvark} .hero__content {
            margin: auto 30px;
            text-align: center;            
            max-width: 1280px;
          }

          #${ids.heroAardvark} .hero__eyebrow {
            color: ${theme.primaryColor};
            font-size:  ${theme.heroEyebrow__fontSize__mobile};
            font-weight: ${theme.heroEyebrow__fontWeight};
            margin-bottom: 5px;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          #${ids.heroAardvark} .hero__title {
            color: ${theme.primaryTextColor};
            font-size: ${theme.heroTitle__fontSize__mobile};
            line-height: ${theme.heroTitle__lineHeight__mobile};
            font-weight: ${theme.heroTitle__fontWeight};
            margin-bottom: 30px;
          }

          #${ids.heroAardvark} .hero__subtitle {
            color:  ${theme.secondaryTextColor};
            font-size: ${theme.heroSubtitle__fontSize__mobile};
            line-height: ${theme.heroSubtitle__lineHeight__mobile};
            font-weight: ${theme.heroSubtitle__fontWeight};
          }

          #${ids.heroAardvark} .hero__cta {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }

          #${ids.heroAardvark} .hero__cta > * {
            margin-right: 1rem;
          }

          #${ids.heroAardvark} .hero__cta > *:last-child {
            margin-right: 0;
          }

          @media (min-width: 768px) {
            #${ids.heroAardvark} .hero__eyebrow {
              font-size: ${theme.heroEyebrow__fontSize__tablet};
              line-height: ${theme.heroEyebrow__lineHeight__tablet};
            }

            #${ids.heroAardvark} .hero__title {
              font-size: ${theme.heroTitle__fontSize__tablet};
              line-height: ${theme.heroTitle__lineHeight__tablet};
            }

            #${ids.heroAardvark} .hero__subtitle {
              font-size: ${theme.heroSubtitle__fontSize__tablet};
              line-height: ${theme.heroSubtitle__lineHeight__tablet};
            }
          }

          @media (min-width: 1024px) {
            #${ids.heroAardvark} .hero__eyebrow {
              font-size: ${theme.heroEyebrow__fontSize__desktop};
              line-height: ${theme.heroEyebrow__lineHeight__desktop};              
            }

            #${ids.heroAardvark} .hero__title {
              font-size: ${theme.heroTitle__fontSize__desktop};
              line-height: ${theme.heroTitle__lineHeight__desktop};
            }

            #${ids.heroAardvark} .hero__subtitle {
              font-size: ${theme.heroSubtitle__fontSize__desktop};
              line-height: ${theme.heroSubtitle__lineHeight__desktop};
            }
          }
        `}
      </style>
    </>
  )
}
