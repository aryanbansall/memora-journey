
import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Calendar } from '@/components/ui/calendar';
import MemoryCard, { Memory } from '@/components/MemoryCard';
import MemoryDialog from '@/components/MemoryDialog';
import { useMemories } from '@/context/MemoryContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import AddMemoryDialog from '@/components/AddMemoryDialog';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const { memories, getMemoriesByDate } = useMemories();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [jumpToDateInput, setJumpToDateInput] = useState('');
  
  // Group memories by date for the selected day
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const memoriesForSelectedDate = getMemoriesByDate(selectedDateStr);
  
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
    return memories.some(memory => memory.date === dateStr);
  };
  
  // Get memories for a specific date
  const getMemoriesForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return getMemoriesByDate(dateStr);
  };
  
  // Open first memory on date selection if there are memories
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const dateStr = format(date, 'yyyy-MM-dd');
      const dateMemories = getMemoriesByDate(dateStr);
      if (dateMemories.length > 0) {
        setSelectedMemory(dateMemories[0]);
      } else {
        setSelectedMemory(null);
      }
    }
  };

  // Jump to a specific date
  const jumpToDate = () => {
    if (jumpToDateInput) {
      try {
        // Try to parse the date in YYYY-MM-DD format
        const date = parse(jumpToDateInput, 'yyyy-MM-dd', new Date());
        setSelectedDate(date);
        
        // Check if there are memories on this date and open the first one
        const dateStr = format(date, 'yyyy-MM-dd');
        const dateMemories = getMemoriesByDate(dateStr);
        if (dateMemories.length > 0) {
          setSelectedMemory(dateMemories[0]);
        } else {
          setSelectedMemory(null);
        }
      } catch (error) {
        console.error('Invalid date format. Please use YYYY-MM-DD', error);
      }
    }
  };

  // Navigate to previous or next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      setSelectedDate(newDate);
    }
  };

  // Navigate to today
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Custom component for calendar days to add memory hover cards
  const renderDay = (day: Date) => {
    const dayMemories = getMemoriesForDay(day);
    if (dayMemories.length === 0) return null;
    
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="w-full h-full flex items-center justify-center font-medium">
            {format(day, 'd')}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-72 p-2">
          <div className="text-sm font-medium mb-2">{format(day, 'MMMM d, yyyy')}</div>
          <div className="text-xs text-muted-foreground mb-2">
            {dayMemories.length} {dayMemories.length === 1 ? 'memory' : 'memories'}
          </div>
          {dayMemories.length > 0 && (
            <div className="w-full h-24 relative rounded-md overflow-hidden cursor-pointer"
                 onClick={() => {
                   setSelectedDate(day);
                   setSelectedMemory(dayMemories[0]);
                 }}>
              <img 
                src={dayMemories[0].thumbnail} 
                alt={dayMemories[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <p className="text-white text-xs font-medium">{dayMemories[0].title}</p>
              </div>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Memory Calendar</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="md:col-span-1 bg-card p-4 rounded-lg shadow-sm">
            {/* Calendar Navigation */}
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={goToToday}
              >
                Today
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
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
                components={{
                  DayContent: ({ date }) => renderDay(date)
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
            {/* Jump to Date Feature */}
            <Card className="p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Jump to Date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                
                <div className="flex flex-1 gap-2">
                  <Input
                    type="text"
                    placeholder="YYYY-MM-DD"
                    value={jumpToDateInput}
                    onChange={(e) => setJumpToDateInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={jumpToDate}>Go</Button>
                </div>
              </div>
            </Card>
            
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

        {/* Add new memory button */}
        <Button
          className="fixed bottom-20 right-6 sm:bottom-6 sm:right-6 rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <span className="text-2xl">+</span>
        </Button>
        
        <AddMemoryDialog 
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
        />
      </div>
    </Layout>
  );
};

export default CalendarPage;
