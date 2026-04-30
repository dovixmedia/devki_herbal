'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Dr. Sanjana Jain',
    title: 'General Physician',
    quote: 'A tasty combination of Vitamin C, D and E with Aloe Vera extract packed in a gummy for healthy-looking hair, nails and skin. Helping in collagen production and preventing free radical and environmental damage to the skin, hair and nails.',
    image: '/doctors/sanjana.png',
  },
  {
    name: 'Dr. Mumeet Saini',
    title: 'General Physician',
    quote: 'This product has the right combination of all the essential nutrients you need for that healthy boost to be visible on your hair, skin & nails! It is superior to similar products I have come across till now.',
    image: '/doctors/mumeet.png',
  },
  {
    name: 'Dr. Roshni Singh',
    title: 'Dermatologist',
    quote: 'Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.',
    image: '/doctors/roshni.png',
  },
  {
    name: 'Shveta Mahajan',
    title: 'Nutritionist',
    quote: 'These amazing gummies work from inside and deliver the right nutrients to maintain a youthful glow. The vegan treats are taking care of my hair too and I have started seeing positive changes in 28 days!',
    image: '/doctors/shveta.png',
  },
];

export default function DoctorTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - cardsToShow + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length - cardsToShow + 1)) % (testimonials.length - cardsToShow + 1));
  };

  const canGoNext = currentIndex < testimonials.length - cardsToShow;
  const canGoPrev = currentIndex > 0;

  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6B2C58]/10 text-[#6B2C58] text-sm font-bold tracking-wide uppercase mb-6 border border-[#6B2C58]/20 shadow-sm"
          >
            <Star className="h-4 w-4 fill-[#6B2C58]" />
            Testimonials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-[#6B2C58] to-gray-900 bg-clip-text text-transparent">
              Reviews
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
          >
            Hear what others have to say about us
          </motion.p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 w-24 bg-[#6B2C58] mx-auto mt-8 rounded-full shadow-sm"
          />
        </div>

        <div className="relative overflow-hidden px-2">
          <motion.div
            animate={{ x: `-${currentIndex * (100 / cardsToShow)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-6"
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`}
              >
                <div className="bg-white rounded-[32px] p-8 h-full flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100/50">
                  <div className="flex-grow">
                    <p className="text-[#333333] text-lg leading-relaxed mb-8">
                      {t.quote}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#6B2C58]/10">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg leading-tight">{t.name}</h4>
                      <p className="text-gray-500 text-sm">{t.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={prev}
            disabled={!canGoPrev}
            className={`p-3 rounded-full border-2 transition-all ${
              canGoPrev 
                ? 'border-gray-200 text-gray-900 hover:border-[#6B2C58] hover:text-[#6B2C58]' 
                : 'border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            disabled={!canGoNext}
            className={`p-3 rounded-full border-2 transition-all ${
              canGoNext 
                ? 'border-gray-200 text-gray-900 hover:border-[#6B2C58] hover:text-[#6B2C58]' 
                : 'border-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
