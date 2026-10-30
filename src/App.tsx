import { useLenis } from './components/useLenis';
import { useReveal } from './components/useReveal';
import Header from './components/Header';
import Hero from './components/Hero';
import Pick from './components/Pick';
import Pie from './components/Pie';
import Base from './components/Base';
import Rules from './components/Rules';
import Faq from './components/Faq';
import Ask from './components/Ask';
import Footer from './components/Footer';

export default function App() {
  useLenis();
  useReveal('home');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pick />
        <Pie />
        <Base />
        <Rules />
        <Faq />
        <Ask />
      </main>
      <Footer />
    </>
  );
}
