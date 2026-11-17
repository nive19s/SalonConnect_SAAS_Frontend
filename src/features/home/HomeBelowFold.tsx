import { marqueeItems } from '@/data/content';
import Marquee from '@/components/motion/Marquee';
import CategoryTiles from './components/CategoryTiles';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import ForSalons from './components/ForSalons';
import Testimonials from './components/Testimonials';
import FinalCta from './components/FinalCta';

export default function HomeBelowFold() {
  return (
    <>
      <Marquee items={marqueeItems} />
      <CategoryTiles />
      <HowItWorks />
      <Stats />
      <ForSalons />
      <Testimonials />
      <FinalCta />
    </>
  );
}
