
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import MemoryCard, { Memory } from '@/components/MemoryCard';
import MemoryDialog from '@/components/MemoryDialog';
import Timeline from '@/components/Timeline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data for memories
const MOCK_MEMORIES: Memory[] = [
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
    id: '2',
    title: 'Mountain Hike',
    date: '2023-07-10',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW58ZW58MHx8MHx8fDA%3D',
    isFavorite: false,
    tags: ['mountains', 'hiking', 'adventure'],
    location: 'Rocky Mountains'
  },
  {
    id: '3',
    title: 'Family Dinner',
    date: '2023-07-05',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1606787364406-a3cdf06c6d0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhbWlseSUyMGRpbm5lcnxlbnwwfHwwfHx8MA%3D%3D',
    isFavorite: false,
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
    tags: ['pet', 'dog', 'play'],
    location: 'Park'
  }
];

const Home = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const { toast } = useToast();
  
  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };
  
  const handleCloseDialog = () => {
    setSelectedMemory(null);
  };
  
  const handleNextMemory = () => {
    if (!selectedMemory) return;
    
    const currentIndex = MOCK_MEMORIES.findIndex(m => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % MOCK_MEMORIES.length;
    setSelectedMemory(MOCK_MEMORIES[nextIndex]);
  };
  
  const handlePreviousMemory = () => {
    if (!selectedMemory) return;
    
    const currentIndex = MOCK_MEMORIES.findIndex(m => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + MOCK_MEMORIES.length) % MOCK_MEMORIES.length;
    setSelectedMemory(MOCK_MEMORIES[prevIndex]);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Your Memories</h1>
          <Tabs defaultValue="grid" onValueChange={(v) => setViewMode(v as 'grid' | 'timeline')}>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOCK_MEMORIES.map((memory) => (
              <MemoryCard 
                key={memory.id} 
                memory={memory} 
                onClick={handleMemoryClick}
              />
            ))}
          </div>
        ) : (
          <Timeline 
            memories={MOCK_MEMORIES} 
            onMemoryClick={handleMemoryClick}
          />
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

export default Home;
