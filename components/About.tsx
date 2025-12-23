'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { aboutInfo, funFacts, profile, stackExchangeFlair } from '@/data/content';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<string, string> = {
  disc: '💿',
  trophy: '🏆',
  beer: '🍺',
  heart: '🧬',
};

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="relative mx-auto w-[92%] max-w-6xl">
        <SectionHeading title="About Me" subtitle="Introduction" />

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass relative overflow-hidden rounded-[32px] p-8">
              <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-fg/60">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Profile
              </div>
              <p className="mt-6 text-lg text-fg/80">{profile.tagline}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {aboutInfo.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-card/60 px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-fg/50">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-fg">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="glass rounded-3xl p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-xl">
                      {iconMap[fact.icon]}
                    </div>
                    <p className="text-sm text-fg/70">{fact.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass sticky top-28 h-fit rounded-[32px] p-6"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-fg/60">Stack Exchange</div>
            <p className="mt-3 text-sm text-fg/70">
              Community contributions and developer profile.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-3">
              <a href={stackExchangeFlair.url} target="_blank" rel="noreferrer">
                <Image
                  src={stackExchangeFlair.image}
                  alt={stackExchangeFlair.alt}
                  width={208}
                  height={58}
                />
              </a>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-accent/20 via-transparent to-accent2/30 p-4 text-xs uppercase tracking-[0.3em] text-fg/70">
              Currently Available
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
