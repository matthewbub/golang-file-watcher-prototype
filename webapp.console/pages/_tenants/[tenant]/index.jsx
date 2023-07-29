import { Header } from '../../../components/__TemplateComponents/Header_NonProfit'
import { Hero } from '../../../components/__TemplateComponents/Hero_NonProfit'
import { ThreeCards } from '../../../components/__TemplateComponents/ThreeCards_NonProfit'
import { SideBySide } from '../../../components/__TemplateComponents/SideBySide_NonProfit'
import { Gallery } from '../../../components/__TemplateComponents/Gallery_NonProfit'
import { Map } from '../../../components/__TemplateComponents/Map'
import { Footer_001 } from '../../../components/__TemplateComponents/Footer_001'


export default function TenantLandingPage({ tenant }) {
  return (
    <div className="bg-white">
      <h1 className='text-4xl text-black'>tenant: {tenant}</h1>
      {/* <Header />
      <Hero />
      <ThreeCards />
      <SideBySide />
      <Gallery />
      <Map /> */}
      {/* <Footer_001 /> */}
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
