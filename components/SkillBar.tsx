'use client';

import { motion } from 'framer-motion';

export function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-fg/70">{name}</span>
        <span className="text-fg/60">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted/40">
        <motion.div
          className="h-2 rounded-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}
