// ScrollTrigger is imported (and registered) only by features that need it,
// so pages without scroll animation never download the plugin.
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
