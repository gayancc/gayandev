'use client';

import { motion } from 'framer-motion';
import { FiFlag, FiCpu, FiLayers, FiList } from 'react-icons/fi';
import { skillGroups } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { SkillBar } from './SkillBar';

const iconMap = {
  easel: FiLayers,
  flag: FiFlag,
  code: FiCpu,
  list: FiList,
};

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <div className="relative mx-auto w-[92%] max-w-6xl">
        <SectionHeading title="My Skills" subtitle="Capabilities" />

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, groupIndex) => {
            const Icon = iconMap[group.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.04 }}
                viewport={{ once: true }}
                className="glass rounded-2xl px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-sm">
                    {Icon ? <Icon /> : null}
                  </div>
                  <h3 className="font-display text-base">{group.title}</h3>
                </div>

                {group.variant === 'bars' && (
                  <div className="mt-4 space-y-3">
                    {(group.items as { name: string; level: number }[]).map((item) => (
                      <SkillBar key={item.name} name={item.name} level={item.level} />
                    ))}
                  </div>
                )}

                {group.variant === 'circles' && (
                  <div className="mt-4 grid gap-3">
                    {(group.items as { name: string; level: number }[]).map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="text-sm text-fg/70">{item.name}</span>
                        <div
                          className="relative h-10 w-10 rounded-full"
                          style={{
                            background: `conic-gradient(hsl(var(--accent)) ${item.level}%, rgba(255,255,255,0.1) 0)`
                          }}
                        >
                          <div className="absolute inset-2 rounded-full bg-card" />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">
                            {item.level}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {group.variant === 'list' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(group.items as { name: string }[]).map((item) => (
                      <span
                        key={item.name}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-fg/70"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
