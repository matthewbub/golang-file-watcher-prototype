import { ConsoleLayout } from '../../components';
import InitialClientEx from "./InitialClientEx";
import FAQ from './components/FAQ';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Pricing from './components/Pricing';


const Page = ({ consoleLayout = {
  title: "Page",
  description: "Page description"
} }) => {
  return (
    <InitialClientEx>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </InitialClientEx>
  )
}

export default Page;
