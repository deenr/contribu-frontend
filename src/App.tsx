import { BenefitsSection } from './components/benefit-section';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { HeroSection } from './components/hero-section';
import { ProcessSection } from './components/process-section';

function App() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProcessSection />
      <BenefitsSection />
      <Footer />
    </main>
  );
}

export default App;
