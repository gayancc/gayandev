'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="relative mx-auto w-[92%] max-w-6xl">
        <SectionHeading title="Experience & Education" subtitle="Timeline" />

        <div className="relative mt-10">
          <span className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-white/10 to-transparent md:left-1/2" />

          <div className="space-y-10">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${item.company}-${item.date}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative grid items-center gap-6 md:grid-cols-2"
                >
                  <span
                    className="absolute left-2 top-6 h-4 w-4 rounded-full border border-accent/40 bg-accent/80 shadow-[0_0_25px_rgba(59,130,246,0.8)] md:left-1/2"
                    aria-hidden="true"
                  />

                  <div
                    className={`flex ${
                      isLeft
                        ? 'md:justify-end md:pr-10'
                        : 'md:order-2 md:justify-start md:pl-10'
                    }`}
                  >
                    <div className="glass w-full max-w-xl rounded-[28px] p-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-fg/60">{item.date}</p>
                      <h3 className="mt-2 font-display text-xl">{item.role}</h3>
                      <p className="text-sm text-fg/70">{item.company}</p>
                      <p className="mt-4 text-sm text-fg/70">{item.description}</p>
                    </div>
                  </div>

                  <div
                    className={`hidden md:block ${
                      isLeft ? 'md:order-2 md:pl-10' : 'md:pr-10'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-fg/40">
                      Milestone {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="mt-2 text-sm text-fg/60">
                      Charting impact, leadership, and continuous growth.
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
