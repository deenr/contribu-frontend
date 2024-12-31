import { Frown, Smile } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { BenefitItem } from './benefit-item';

const benefits = [
  {
    positive: { title: 'Encrypted Commit Logs', description: 'Protect sensitive commit messages by encrypting them for secure, read-only access.' },
    negative: { title: 'Privacy Risks', description: 'Manual methods may expose sensitive data, compromising security and confidentiality.' }
  },
  {
    positive: { title: 'Unified Contribution History', description: 'Easily display your work from various platforms on your GitHub profile.' },
    negative: { title: 'Lost Contributions', description: 'Contributions from Bitbucket or GitLab remain invisible on GitHub, leaving gaps in your portfolio.' }
  },
  {
    positive: { title: 'Privacy Guaranteed', description: 'Commit metadata only—your code stays private and secure.' },
    negative: { title: 'Inefficient Documentation', description: 'Manually tracking contributions across platforms is tedious and error-prone.' }
  },
  {
    positive: { title: 'Streamlined and Secure', description: 'Contribu.me simplifies the process, providing peace of mind and a professional portfolio.' },
    negative: { title: 'Manual Hassles', description: 'Traditional methods are time-consuming and lack the security and efficiency developers need.' }
  }
];

export function BenefitsSection() {
  const sectionAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: {
      type: 'spring',
      time: 0.3,
      bounce: 0.2,
      delay: 0
    }
  };
  const sectionAnimation2 = {
    initial: { scale: 0.8 },
    whileInView: { scale: 1 },
    transition: {
      type: 'spring',
      stiffness: 582,
      damping: 40,
      mass: 1
    }
  };

  const sectionRef = useRef(null);

  const { scrollY } = useScroll();
  const [transformBounderies, setTransformBounderies] = useState<[number, number]>([0, 1000]);
  useMotionValueEvent(scrollY, 'change', () => {
    if (sectionRef.current) {
      const { offsetTop, offsetHeight } = sectionRef.current;
      setTransformBounderies([offsetTop / 2, offsetHeight]);
    }
  });

  const scale = useTransform(scrollY, transformBounderies, [0.9, 1]);

  const [isAboveMd, setIsAboveMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAboveMd(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div ref={sectionRef} {...sectionAnimation2}>
      <motion.section {...sectionAnimation} style={isAboveMd ? { scale } : {}} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl flex flex-col gap-8 md:gap-16">
          <div className="md:sticky pb-12 md:pb-80 top-[160px] flex flex-col items-center gap-2">
            <h2 className="font-medium text-xs sm:text-sm text-muted-foreground">Benefits</h2>
            <p className="flex-1 text-2xl sm:text-4xl font-semibold text-center">
              Why Developers Trust Contribu: <br />
              <span className="text-muted-foreground">Built for Transparency, Privacy, and Accessibility.</span>
            </p>
          </div>
          {benefits.map((benefit, index) => (
            <div key={index} className="md:sticky md:mx-auto md:max-w-[90%] lg:max-w-[850px]" style={{ top: `${380 + index * 20}px` }}>
              {index === 0 ? (
                <div className="absolute top-[-48px] w-full  hidden md:flex flex-row gap-12 px-8 pb-6">
                  <div className="flex-1 flex flex-row gap-2 items-center">
                    <Smile className="text-primary w-4 h-4 sm:w-6 sm:h-6" />
                    <p className="text-sm sm:text-md font-semibold text-primary">With Contribu.me</p>
                  </div>
                  <div></div>
                  <div className="flex-1 flex flex-row gap-2 items-center">
                    <Frown className="text-destructive w-4 h-4 sm:w-6 sm:h-6" />
                    <p className="text-sm sm:text-md font-semibold text-destructive">Without</p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <BenefitItem {...benefit} />
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
