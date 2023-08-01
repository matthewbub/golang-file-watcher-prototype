import { Header } from '../../../components/__TemplateComponents/Header_NonProfit'
import { Hero } from '../../../components/__TemplateComponents/Hero_NonProfit'
import { ThreeCards } from '../../../components/__TemplateComponents/ThreeCards_NonProfit'
import { SideBySide } from '../../../components/__TemplateComponents/SideBySide_NonProfit'
import { Gallery } from '../../../components/__TemplateComponents/Gallery_NonProfit'
import { Map } from '../../../components/__TemplateComponents/Map'
import { Footer_001 } from '../../../components/__TemplateComponents/Footer_001'
import { Button_001 } from '../../../components/__TemplateComponents/Button_001'
import { Button_002 } from '../../../components/__TemplateComponents/Button_002'
import { Button_003 } from '../../../components/__TemplateComponents/Button_003'
import { Button_004 } from '../../../components/__TemplateComponents/Button_004'
import { Button_005 } from '../../../components/__TemplateComponents/Button_005'
import { Button_006 } from '../../../components/__TemplateComponents/Button_006'
import { Button_007 } from '../../../components/__TemplateComponents/Button_007'
import { Button_008 } from '../../../components/__TemplateComponents/Button_008'

export default function Page({ tenant }) {
  return (
    <div className="bg-white p-20">
      <Button_008 as="link" href="/_tenants/[tenant]/about" tenant={tenant}>
        About
      </Button_008>

      {/* <Header />
      <Hero />
      <ThreeCards />
      <SideBySide />
      <Gallery />
      <Map />
      <Footer_001 /> */}
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
