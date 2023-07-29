import { FC } from 'react'
import { Button } from '../Buttons/Button__Alligator'
import { ids } from '../theme';

interface HeroCTAProps {
  primaryButton?: string;
  secondaryButton?: string;
  primaryButtonAction?: () => void;
  secondaryButtonAction?: () => void;
}

export const HeroCTA: FC<HeroCTAProps> = ({
  primaryButton = 'Primary Button',
  secondaryButton = 'Secondary Button',
  primaryButtonAction = () => console.log('Primary button clicked'),
  secondaryButtonAction = () => console.log('Secondary button clicked'),
}) => {
  return (
    <div id={ids.heroCtaBadger} className='hero__cta__centeredRow'>
      <Button className='hero__cta__button' onClick={primaryButtonAction}>
        {primaryButton}
      </Button>
      <Button className='hero__cta__button' styleType='secondary' onClick={secondaryButtonAction}>
        {secondaryButton}
      </Button>
      <style jsx global>
        {`
          #${ids.heroCtaBadger} .hero__cta__centeredRow {
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          #${ids.heroCtaBadger} .hero__cta__centeredRow .hero__cta__button {
            margin-right: 15px;
          }

          #${ids.heroCtaBadger} .hero__cta__centeredRow .hero__cta__button:last-child {
            margin-right: 0;
          }
        `}
      </style>
    </div>
  )
}
