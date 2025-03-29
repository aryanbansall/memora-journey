
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import MemoryCard, { Memory } from '@/components/MemoryCard';
import MemoryDialog from '@/components/MemoryDialog';
import { useMemories } from '@/context/MemoryContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Award, CalendarDays, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const MemoriesPage = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { memories, favoriteMemories } = useMemories();
  
  // Get highlighted memories (those marked as highlight in our context)
  const highlightedMemories = memories.filter(memory => memory.isHighlighted);
  
  // Filter memories based on search term
  const filteredMemories = memories.filter(memory => 
    memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (memory.location && memory.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleMemoryClick = (memory: Memory) => {
    setSelectedMemory(memory);
  };
  
  const handleCloseDialog = () => {
    setSelectedMemory(null);
  };
  
  const handleNextMemory = () => {
    if (!selectedMemory) return;
    
    const currentSet = filteredMemories;
    const currentIndex = currentSet.findIndex(m => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % currentSet.length;
    setSelectedMemory(currentSet[nextIndex]);
  };
  
  const handlePreviousMemory = () => {
    if (!selectedMemory) return;
    
    const currentSet = filteredMemories;
    const currentIndex = currentSet.findIndex(m => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + currentSet.length) % currentSet.length;
    setSelectedMemory(currentSet[prevIndex]);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Memory Collections</h1>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search memories..."
              className="pl-10 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Star size={16} />
              <span>Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="highlights" className="flex items-center gap-2">
              <Award size={16} />
              <span>Highlights</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">All Memories</h2>
              <button className="flex items-center gap-2 text-sm bg-secondary/50 px-3 py-1.5 rounded-md">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
            
            {filteredMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredMemories.map((memory) => (
                  <MemoryCard 
                    key={memory.id} 
                    memory={memory} 
                    onClick={handleMemoryClick}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No memories found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Your Favorites</h2>
                {favoriteMemories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {favoriteMemories.map((memory) => (
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
                      Star your memories to see them here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="highlights" className="mt-0">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Memory Highlights</h2>
                {highlightedMemories.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {highlightedMemories.map((memory) => (
                      <MemoryCard 
                        key={memory.id} 
                        memory={memory} 
                        onClick={handleMemoryClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg p-8 text-center">
                    <div className="text-4xl mb-4">🏆</div>
                    <h3 className="text-xl font-medium mb-2">No highlights yet</h3>
                    <p className="text-muted-foreground">
                      Add highlights to your special memories.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Memory Stories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Create beautiful stories from your highlighted memories
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-secondary/20 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/30 transition-colors h-40">
                        <div className="text-2xl mb-2">✨</div>
                        <h3 className="font-medium">Create New Story</h3>
                        <p className="text-sm text-muted-foreground mt-1">Combine your highlights into a story</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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

export default MemoriesPage;
