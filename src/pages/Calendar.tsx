
import React, { useState } from 'react';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import { Calendar } from '@/components/ui/calendar';
import MemoryCard, { Memory } from '@/components/MemoryCard';
import MemoryDialog from '@/components/MemoryDialog';
import { useToast } from '@/hooks/use-toast';

// Filter from the mock memories (these would come from an API in a real app)
const CALENDAR_MEMORIES: Memory[] = [
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
    isFavorite: false,
    tags: ['family', 'dinner', 'home'],
    location: 'Home'
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
    id: '7',
    title: 'Downtown Walk',
    date: '2023-06-10',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMHN0cmVldHxlbnwwfHwwfHx8MA%3D%3D',
    isFavorite: false,
    tags: ['downtown', 'walk', 'city'],
    location: 'Seattle, WA'
  }
];

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const { toast } = useToast();
  
  // Group memories by date for the selected day
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const memoriesForSelectedDate = CALENDAR_MEMORIES.filter(memory => memory.date === selectedDateStr);
  
  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };
  
  const handleCloseDialog = () => {
    setSelectedMemory(null);
  };
  
  const handleNextMemory = () => {
    if (!selectedMemory) return;
    
    const currentIndex = memoriesForSelectedDate.findIndex(m => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % memoriesForSelectedDate.length;
    setSelectedMemory(memoriesForSelectedDate[nextIndex]);
  };
  
  const handlePreviousMemory = () => {
    if (!selectedMemory) return;
    
    const currentIndex = memoriesForSelectedDate.findIndex(m => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + memoriesForSelectedDate.length) % memoriesForSelectedDate.length;
    setSelectedMemory(memoriesForSelectedDate[prevIndex]);
  };

  // Function to check if a date has memories
  const hasMemoriesOnDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return CALENDAR_MEMORIES.some(memory => memory.date === dateStr);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Memory Calendar</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="md:col-span-1 bg-card p-4 rounded-lg shadow-sm">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md bg-background p-3 pointer-events-auto"
                modifiers={{
                  hasMemory: (date) => hasMemoriesOnDate(date),
                }}
                modifiersStyles={{
                  hasMemory: { 
                    fontWeight: 'bold',
                    backgroundColor: 'var(--memora-purple-light)',
                    color: 'var(--memora-purple)',
                    borderRadius: '4px'
                  }
                }}
              />
            </div>
            
            {selectedDate && (
              <div className="mt-4 text-center">
                <h2 className="text-lg font-medium">
                  {format(selectedDate, 'MMMM d, yyyy')}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {memoriesForSelectedDate.length 
                    ? `${memoriesForSelectedDate.length} ${memoriesForSelectedDate.length === 1 ? 'memory' : 'memories'} found` 
                    : 'No memories on this date'}
                </p>
              </div>
            )}
          </div>
          
          {/* Memories for Selected Date */}
          <div className="md:col-span-2">
            {memoriesForSelectedDate.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {memoriesForSelectedDate.map((memory) => (
                  <MemoryCard 
                    key={memory.id} 
                    memory={memory}
                    onClick={handleMemoryClick}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-medium mb-2">No memories on this date</h3>
                <p className="text-muted-foreground">
                  Try selecting a different date or create new memories.
                </p>
              </div>
            )}
          </div>
        </div>
        
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

export default CalendarPage;
