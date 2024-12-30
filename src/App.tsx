import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { BenefitsSection } from './components/benefit-section';
import { HeroSection } from './components/hero-section';
import { ProcessSection } from './components/process-section';

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <ProcessSection />
      <BenefitsSection />
      <Footer />
    </>
  );
}

export default App;
