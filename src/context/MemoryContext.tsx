
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Memory } from '@/components/MemoryCard';

// Mock data for memories
const INITIAL_MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'Beach Sunset',
    date: '2023-07-15',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2h8ZW58MHx8MHx8fDA%3D',
    isFavorite: true,
    isHighlighted: true,
    tags: ['beach', 'sunset', 'vacation'],
    location: 'Malibu, CA'
  },
  {
    id: '2',
    title: 'Mountain Hike',
    date: '2023-07-10',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW58ZW58MHx8MHx8fDA%3D',
    isFavorite: false,
    isHighlighted: false,
    tags: ['mountains', 'hiking', 'adventure'],
    location: 'Rocky Mountains'
  },
  {
    id: '3',
    title: 'Family Dinner',
    date: '2023-07-05',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhbWlseSUyMGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D',
    isFavorite: true,
    isHighlighted: true,
    tags: ['family', 'dinner', 'home'],
    location: 'Home'
  },
  {
    id: '4',
    title: 'City Lights',
    date: '2023-07-05',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHx8MA%3D%3D',
    isFavorite: true,
    isHighlighted: false,
    tags: ['city', 'night', 'lights'],
    location: 'New York, NY'
  },
  {
    id: '5',
    title: 'Birthday Party',
    date: '2023-06-20',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D',
    isFavorite: false,
    isHighlighted: false,
    tags: ['birthday', 'party', 'celebration'],
    location: 'Home'
  },
  {
    id: '6',
    title: 'Garden Flowers',
    date: '2023-06-15',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1595351049677-b241d8a5a337?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D',
    isFavorite: true,
    isHighlighted: true,
    tags: ['garden', 'flowers', 'spring'],
    location: 'Backyard'
  },
  {
    id: '7',
    title: 'Downtown Walk',
    date: '2023-06-10',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMHN0cmVldHxlbnwwfHwwfHx8MA%3D%3D',
    isFavorite: false,
    isHighlighted: false,
    tags: ['downtown', 'walk', 'city'],
    location: 'Seattle, WA'
  },
  {
    id: '8',
    title: 'Pet Play Time',
    date: '2023-06-05',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9nfGVufDB8fDB8fHww',
    isFavorite: true,
    isHighlighted: false,
    tags: ['pet', 'dog', 'play'],
    location: 'Park'
  }
];

interface MemoryContextType {
  memories: Memory[];
  favoriteMemories: Memory[];
  highlightedMemories: Memory[];
  toggleFavorite: (id: string) => void;
  toggleHighlight: (id: string) => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  
  const favoriteMemories = memories.filter(memory => memory.isFavorite);
  const highlightedMemories = memories.filter(memory => memory.isHighlighted);
  
  const toggleFavorite = (id: string) => {
    setMemories(prevMemories => 
      prevMemories.map(memory => 
        memory.id === id 
          ? { ...memory, isFavorite: !memory.isFavorite } 
          : memory
      )
    );
  };
  
  const toggleHighlight = (id: string) => {
    setMemories(prevMemories => 
      prevMemories.map(memory => 
        memory.id === id 
          ? { ...memory, isHighlighted: !memory.isHighlighted } 
          : memory
      )
    );
  };

  return (
    <MemoryContext.Provider value={{ 
      memories, 
      favoriteMemories, 
      highlightedMemories,
      toggleFavorite, 
      toggleHighlight 
    }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemories = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemories must be used within a MemoryProvider');
  }
  return context;
};
