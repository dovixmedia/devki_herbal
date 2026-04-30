'use client';

import { motion } from 'framer-motion';
import { Microscope, Calendar, Leaf } from 'lucide-react';

const FSSAILogo = () => (
  <svg viewBox="0 0 100 40" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 25C15 15 35 15 40 25"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <text
      x="5"
      y="35"
      fill="currentColor"
      style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'serif' }}
    >
      fssai
    </text>
  </svg>
);

const CleanIngredientsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-10 w-10 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 12 2 12 2C12 2 2 6.47715 2 12C2 17.5228 6.478 22 12 22Z" />
    <path d="M12 18V12" />
    <path d="M12 15L9 12" />
    <path d="M12 15L15 12" />
    <path d="M12 12L9 9" />
    <path d="M12 12L15 9" />
  </svg>
);

const benefits = [
  {
    icon: CleanIngredientsIcon,
    title: 'Clean',
    subtitle: 'Ingredients',
  },
  {
    icon: () => <Microscope className="h-10 w-10 text-white/90" strokeWidth={1.5} />,
    title: 'Result Based',
    subtitle: 'Ingredients',
  },
  {
    icon: () => <Calendar className="h-10 w-10 text-white/90" strokeWidth={1.5} />,
    title: 'Non-Habit',
    subtitle: 'Forming',
  },
  {
    icon: () => <FSSAILogo />,
    title: 'FSSAI',
    subtitle: 'Approved',
  },
];

export default function ProductBenefits() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#6B2C58] rounded-[2.5rem] p-8 md:p-12 lg:p-16 text-white overflow-hidden relative"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="max-w-md">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Make Healthy Habits Easy!
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                We keep ourselves at the junction of health and fun focussed on delivering results!
              </p>
            </div>

            {/* Right Icons Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <benefit.icon />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium leading-tight text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-lg md:text-xl font-medium leading-tight text-white/90">
                      {benefit.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Subtle design element - faint pattern or glow */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
