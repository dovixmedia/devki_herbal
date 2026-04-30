'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Immunity',
    description: 'Boost your natural defenses',
    href: '/shop?category=immunity',
    color: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Sleep',
    description: 'Restful, restorative sleep',
    href: '/shop?category=sleep',
    color: 'from-indigo-400 to-purple-600',
  },
  {
    name: 'Energy',
    description: 'Sustained vitality',
    href: '/shop?category=energy',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    name: 'Mood & Stress',
    description: 'Calm mind, balanced mood',
    href: '/shop?category=mood',
    color: 'from-rose-400 to-pink-600',
  },
  {
    name: 'Digestive',
    description: 'Gut health support',
    href: '/shop?category=digestive',
    color: 'from-cyan-400 to-blue-600',
  },
];

export default function ProductCategories() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600">
            Find the right support for your wellness goals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={cat.href}
                className="block group h-full p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all overflow-hidden border border-slate-100"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} mb-4`}
                />
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium text-sm">
                  Shop <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
