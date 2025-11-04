interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
}

export default function Logo({ className = '', size = 'md', variant = 'full' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto'
  };

  if (variant === 'icon') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 64 64" fill="none" className="h-full w-auto">
          {/* Cercle principal inspiré du logo */}
          <circle cx="20" cy="32" r="16" fill="#87a96b" stroke="#6b7c5d" strokeWidth="2"/>
          
          {/* Détails internes */}
          <circle cx="20" cy="32" r="10" fill="#4a5d3a"/>
          <circle cx="20" cy="32" r="5" fill="#2d2d2d"/>
          
          {/* Accent lumineux organique */}
          <ellipse cx="16" cy="28" rx="3" ry="4" fill="#a4b894" opacity="0.8"/>
          <ellipse cx="14" cy="26" rx="1.5" ry="2" fill="#c8d6a5" opacity="0.6"/>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Icône du logo */}
      <div className={sizeClasses[size]}>
        <svg viewBox="0 0 64 64" fill="none" className="h-full w-auto">
          {/* Cercle principal inspiré du logo */}
          <circle cx="20" cy="32" r="16" fill="#87a96b" stroke="#6b7c5d" strokeWidth="2"/>
          
          {/* Détails internes */}
          <circle cx="20" cy="32" r="10" fill="#4a5d3a"/>
          <circle cx="20" cy="32" r="5" fill="#2d2d2d"/>
          
          {/* Accent lumineux organique */}
          <ellipse cx="16" cy="28" rx="3" ry="4" fill="#a4b894" opacity="0.8"/>
          <ellipse cx="14" cy="26" rx="1.5" ry="2" fill="#c8d6a5" opacity="0.6"/>
          
          {/* Éléments calligraphiques élégants inspirés du texte */}
          <path d="M40 16 Q48 20 56 16 Q52 32 48 40 Q40 48 32 40" 
                stroke="#6b7c5d" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"/>
          
          <path d="M36 44 Q44 40 52 44 Q48 48 40 48" 
                stroke="#87a96b" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Texte du logo */}
      <div className="flex flex-col">
        <span className="font-serif text-sage-deep font-medium tracking-wide" 
              style={{ 
                fontSize: size === 'sm' ? '1rem' : size === 'md' ? '1.25rem' : size === 'lg' ? '1.5rem' : '2rem',
                lineHeight: 1.2 
              }}>
          cath
        </span>
        <span className="font-serif text-sage-medium text-sm tracking-widest opacity-80"
              style={{ 
                fontSize: size === 'sm' ? '0.7rem' : size === 'md' ? '0.8rem' : size === 'lg' ? '0.9rem' : '1rem',
                marginTop: '-0.2em'
              }}>
          painting
        </span>
      </div>
    </div>
  );
}