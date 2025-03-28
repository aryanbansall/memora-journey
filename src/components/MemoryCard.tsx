
import React from 'react';
import { Star, Video, Image, MoreVertical, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export type Memory = {
  id: string;
  title: string;
  date: string;
  type: 'photo' | 'video';
  thumbnail: string;
  isFavorite: boolean;
  tags: string[];
  location?: string;
};

interface MemoryCardProps {
  memory: Memory;
  onClick?: (memory: Memory) => void;
}

const MemoryCard = ({ memory, onClick }: MemoryCardProps) => {
  const { toast } = useToast();
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      description: `${memory.title} ${memory.isFavorite ? 'removed from' : 'added to'} favorites`,
      duration: 1500,
    });
  };
  
  const handleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      description: "Options menu will be available soon!",
      duration: 1500,
    });
  };

  return (
    <div 
      className="memory-card cursor-pointer"
      onClick={() => onClick?.(memory)}
    >
      <div className="relative aspect-video">
        <img 
          src={memory.thumbnail} 
          alt={memory.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        
        {/* Type indicator */}
        <div className="absolute top-2 left-2 bg-black/40 text-white p-1 rounded-md backdrop-blur-sm">
          {memory.type === 'video' ? (
            <Video size={16} />
          ) : (
            <Image size={16} />
          )}
        </div>
        
        {/* Favorite button */}
        <button 
          className={cn(
            "absolute top-2 right-2 p-1 rounded-full transition-colors",
            memory.isFavorite ? "text-yellow-400" : "text-white hover:text-yellow-300"
          )}
          onClick={handleToggleFavorite}
          aria-label={memory.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={18} fill={memory.isFavorite ? "currentColor" : "none"} />
        </button>
        
        {/* Title and date */}
        <div className="absolute bottom-0 left-0 w-full p-3 text-white">
          <h3 className="font-medium text-sm truncate">{memory.title}</h3>
          <div className="flex items-center gap-1 text-xs opacity-80 mt-1">
            <Calendar size={12} />
            <span>{memory.date}</span>
          </div>
        </div>
        
        {/* More options */}
        <button 
          className="absolute bottom-2 right-2 p-1 text-white rounded-full hover:bg-white/20"
          onClick={handleMoreOptions}
          aria-label="More options"
        >
          <MoreVertical size={16} />
        </button>
      </div>
      
      {/* Tags */}
      {memory.tags.length > 0 && (
        <div className="px-3 py-2 flex flex-wrap gap-1">
          {memory.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-block bg-secondary text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryCard;
