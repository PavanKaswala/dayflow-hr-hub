import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: 'primary' | 'accent' | 'success' | 'warning' | 'info';
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  color,
}) => {
  const colorStyles = {
    primary: {
      bg: 'bg-primary/10',
      icon: 'bg-primary text-primary-foreground',
      hover: 'hover:bg-primary/15 hover:border-primary/30',
    },
    accent: {
      bg: 'bg-accent/10',
      icon: 'bg-accent text-accent-foreground',
      hover: 'hover:bg-accent/15 hover:border-accent/30',
    },
    success: {
      bg: 'bg-success/10',
      icon: 'bg-success text-success-foreground',
      hover: 'hover:bg-success/15 hover:border-success/30',
    },
    warning: {
      bg: 'bg-warning/10',
      icon: 'bg-warning text-warning-foreground',
      hover: 'hover:bg-warning/15 hover:border-warning/30',
    },
    info: {
      bg: 'bg-info/10',
      icon: 'bg-info text-info-foreground',
      hover: 'hover:bg-info/15 hover:border-info/30',
    },
  };

  const styles = colorStyles[color];

  return (
    <Link
      to={path}
      className={cn(
        'group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300',
        styles.hover,
        'hover:shadow-card-hover hover:-translate-y-1'
      )}
    >
      <div
        className={cn(
          'mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
          styles.icon
        )}
      >
        <Icon size={28} />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      
      <div className="mt-4 flex items-center text-sm font-medium text-primary transition-colors group-hover:text-primary-dark">
        View Details
        <ArrowRight
          size={16}
          className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
};

export default ModuleCard;
