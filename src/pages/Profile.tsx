
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { differenceInYears, parse } from 'date-fns';

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    dob: '1990-05-15',
    bio: 'Photography enthusiast and memory collector. I love capturing moments and reliving them through Memora.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  });

  const calculateAge = (dateString: string) => {
    try {
      const date = parse(dateString, 'yyyy-MM-dd', new Date());
      return differenceInYears(new Date(), date);
    } catch (e) {
      return 'Unknown';
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      toast({
        description: "Profile updated successfully!",
        duration: 3000
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Profile</h1>
        
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <button 
              onClick={handleEdit}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-4 col-span-1">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <button 
                  onClick={() => toast({ description: "This feature will be available soon!", duration: 1500 })}
                  className="text-sm text-primary underline"
                >
                  Change Photo
                </button>
              )}
            </div>
            
            <div className="space-y-4 col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input 
                      id="name" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium">{profile.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg">{profile.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  {isEditing ? (
                    <Input 
                      id="dob" 
                      type="date" 
                      value={profile.dob}
                      onChange={(e) => setProfile({...profile, dob: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg">{profile.dob}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Age</Label>
                  <p className="text-lg">{calculateAge(profile.dob)}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <textarea 
                    id="bio"
                    className="w-full px-3 py-2 border rounded-md text-base md:text-sm"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  />
                ) : (
                  <p className="text-lg">{profile.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Account Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-secondary/30 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">142</p>
                <p className="text-sm text-muted-foreground">Total Memories</p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Favorites</p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">63</p>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
