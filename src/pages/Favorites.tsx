
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import MemoryCard, { Memory } from '@/components/MemoryCard';
import MemoryDialog from '@/components/MemoryDialog';
import { useToast } from '@/hooks/use-toast';

// For now, we'll hardcode the favorite memories as requested
const FAVORITE_MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'Beach Sunset',
    date: '2023-07-15',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2h8ZW58MHx8MHx8fDA%3D',
    isFavorite: true,
    tags: ['beach', 'sunset', 'vacation'],
    location: 'Malibu, CA'
  },
  {
    id: '3',
    title: 'Family Dinner',
    date: '2023-07-05',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhbWlseSUyMGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D',
    isFavorite: true, // We're marking this as favorite for the favorites page
    tags: ['family', 'dinner', 'home'],
    location: 'Home'
  }
];

const FavoritesPage = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const { toast } = useToast();
  
  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };
  
  const handleCloseDialog = () => {
    setSelectedMemory(null);
  };
  
  const handleNextMemory = () => {
    if (!selectedMemory) return;
    
    const currentIndex = FAVORITE_MEMORIES.findIndex(m => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % FAVORITE_MEMORIES.length;
    setSelectedMemory(FAVORITE_MEMORIES[nextIndex]);
  };
  
  const handlePreviousMemory = () => {
    if (!selectedMemory) return;
    
    const currentIndex = FAVORITE_MEMORIES.findIndex(m => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + FAVORITE_MEMORIES.length) % FAVORITE_MEMORIES.length;
    setSelectedMemory(FAVORITE_MEMORIES[prevIndex]);
  };

  const handleRemoveFromFavorites = (id: string) => {
    toast({
      description: "This feature will be available soon!",
      duration: 3000
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Favorite Memories</h1>
        </div>
        
        {FAVORITE_MEMORIES.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {FAVORITE_MEMORIES.map((memory) => (
              <MemoryCard 
                key={memory.id} 
                memory={memory} 
                onClick={handleMemoryClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-medium mb-2">No favorite memories yet</h3>
            <p className="text-muted-foreground">
              Add some memories to your favorites to see them here.
            </p>
          </div>
        )}
        
        <MemoryDialog 
          memory={selectedMemory} 
          onClose={handleCloseDialog}
          onNext={handleNextMemory}
          onPrevious={handlePreviousMemory}
        />
      </div>
    </Layout>
  );
};

export default FavoritesPage;
