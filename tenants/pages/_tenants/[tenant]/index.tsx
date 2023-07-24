import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { Header } from '../../../components/__TemplateComponents/Header_NonProfit'
import { Hero } from '../../../components/__TemplateComponents/Hero_NonProfit'
import { ThreeCards } from '../../../components/__TemplateComponents/ThreeCards_NonProfit'
import { SideBySide } from '../../../components/__TemplateComponents/SideBySide_NonProfit'
import { Gallery } from '../../../components/__TemplateComponents/Gallery_NonProfit'
import { Map } from '../../../components/__TemplateComponents/Map'
import { Footer } from '../../../components/__TemplateComponents/Footer'

export default function TenantLandingPage() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <ThreeCards />
      <SideBySide />
      <Gallery />
      <Map />
      <Footer />
    </div>
  )
}
