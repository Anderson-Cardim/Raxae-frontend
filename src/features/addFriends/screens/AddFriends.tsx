// src/pages/FriendsPage.tsx (ou AmigosPage.tsx)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';  
import FooterNav from '../../../components/layout/FooterNav';
import HeaderForm from '../../../components/layout/HeaderForm';
import Input from '../../../components/ui/Input';
import type { Friend } from '../components/FriendListItem';
import FriendListItem from '../components/FriendListItem';


const mockFriends: Friend[] = [
  { id: '1', name: 'Gustavo Santana' },
  { id: '2', name: 'Anderson Cardim' },
  { id: '3', name: 'Thálita Souza' },
  { id: '4', name: 'Felipe Tavares' },
  { id: '5', name: 'Paulo Neves' },
];

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home"); 
  };

  const handleAddFriend = () => {
    if (newFriendEmail.trim() === '') return;

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: newFriendEmail,
    };

    setFriends([...friends, newFriend]);
    setNewFriendEmail(''); 
  };

  const handleDeleteFriend = (id: string) => {
    setFriends(friends.filter(f => f.id !== id));
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      
      <HeaderForm title="Amigos" onBack={handleGoBack} />
      
      <div className="flex-grow p-4">
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Novo amigo</h2>
          <div className="flex items-center space-x gap-3">
            
            <Input
              placeholder="Email"
              type="email"
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
              className="flex-grow py-3 px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500" 
            />
            
            <button
              onClick={handleAddFriend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200"
              aria-label="Adicionar novo amigo"
            >
              <FaPlus size={20} />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-1 text-gray-800">Seus amigos</h2>
          <p className="text-sm text-gray-500 mb-4">
            Os amigos que já dividiram conta com você
          </p>
          
          <div className="space-y-1">
            {friends.map((friend) => (
              <FriendListItem 
                key={friend.id} 
                friend={friend} 
                onDelete={handleDeleteFriend} 
              />
            ))}
          </div>
        </div>
        
      </div>
      
      <FooterNav />
    </div>
  );
}