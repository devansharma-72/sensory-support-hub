
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: 'primary' | 'accent' | 'sensory-calm' | 'sensory-focus' | 'sensory-energy' | 'sensory-joy';
  className?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  color = 'primary',
  className,
  onClick,
}) => {
  const colorClasses = {
    primary: 'bg-primary/5 border-primary/20 text-primary hover:bg-primary/10',
    accent: 'bg-accent/5 border-accent/20 text-accent hover:bg-accent/10',
    'sensory-calm': 'bg-sensory-calm/30 border-sensory-calm text-accent hover:bg-sensory-calm/40',
    'sensory-focus': 'bg-sensory-focus/30 border-sensory-focus text-primary hover:bg-sensory-focus/40',
    'sensory-energy': 'bg-sensory-energy/30 border-sensory-energy text-destructive hover:bg-sensory-energy/40',
    'sensory-joy': 'bg-sensory-joy/30 border-sensory-joy text-green-600 hover:bg-sensory-joy/40',
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={cn(
        'relative rounded-xl border p-6 shadow-sm backdrop-blur-sm transition-all duration-300',
        'transform-gpu',
        colorClasses[color],
        className,
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/50 dark:bg-black/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-balance">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
