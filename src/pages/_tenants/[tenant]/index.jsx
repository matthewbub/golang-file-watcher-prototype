import { Header } from '../../../src/components/__TemplateComponents/Header_NonProfit'
import { Hero } from '../../../src/components/__TemplateComponents/Hero_NonProfit'
import { ThreeCards } from '../../../src/components/__TemplateComponents/ThreeCards_NonProfit'
import { SideBySide } from '../../../src/components/__TemplateComponents/SideBySide_NonProfit'
import { Gallery } from '../../../src/components/__TemplateComponents/Gallery_NonProfit'
import { Map } from '../../../src/components/__TemplateComponents/Map'
import { Footer_001 } from '../../../src/components/__TemplateComponents/Footer_001'
import { Button_001 } from '../../../src/components/__TemplateComponents/Button_001'
import { Button_002 } from '../../../src/components/__TemplateComponents/Button_002'
import { Button_003 } from '../../../src/components/__TemplateComponents/Button_003'
import { Button_004 } from '../../../src/components/__TemplateComponents/Button_004'
import { Button_005 } from '../../../src/components/__TemplateComponents/Button_005'
import { Button_006 } from '../../../src/components/__TemplateComponents/Button_006'
import { Button_007 } from '../../../src/components/__TemplateComponents/Button_007'
import { Button_008 } from '../../../src/components/__TemplateComponents/Button_008'

export default function Page({ tenant }) {
  return (
    <div className="bg-white">
      {/* <Button_008 as="link" href="/_tenants/[tenant]/about" tenant={tenant}>
        About
      </Button_008> */}

      <Header />
      <Hero />
      <ThreeCards />
      <SideBySide />
      <Gallery />
      <Map />
      <Footer_001 />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  console.log('context', context)
  return {
    props: {
      tenant: context.query.tenant,
    },
  }
}
