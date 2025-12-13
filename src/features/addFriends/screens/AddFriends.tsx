
// src/pages/FriendsPage.tsx (ou AmigosPage.tsx)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import FooterNav from '../../../components/layout/FooterNav';
import HeaderForm from '../../../components/layout/HeaderForm';
import Input from '../../../components/ui/Input';
import type { Friend } from '../components/FriendListItem';
import FriendListItem from '../components/FriendListItem';
import { groupService } from '../../../services/groupService';
import { useToast } from '../../../contexts/ToastContext';

export default function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('usuarioId');
  const toast = useToast();

  useEffect(() => {
    loadFriendsFromGroups();
  }, []);

  const loadFriendsFromGroups = async () => {
    try {
      const groups = await groupService.listarMeusGrupos();
      const uniqueFriends = new Map<string, Friend>();

      groups.forEach(group => {
        group.membros.forEach(member => {
          if (member.idUsuario !== currentUserId) {
            uniqueFriends.set(member.idUsuario, {
              id: member.idUsuario,
              name: member.nomeUsuario
            });
          }
        });
      });

      setFriends(Array.from(uniqueFriends.values()));
    } catch (error) {
      console.error("Failed to load friends from groups", error);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleAddFriend = () => {
    if (newFriendEmail.trim() === '') return;

    // API doesn't support adding friends directly yet, so we just add locally for now
    // or we could implement an invite system here if the API supported it.
    const newFriend: Friend = {
      id: Date.now().toString(),
      name: newFriendEmail,
    };

    setFriends([...friends, newFriend]);
    setNewFriendEmail('');
    toast.info("Amigo adicionado localmente. Para convidar para um grupo, vá na tela do grupo.");
  };

  const handleDeleteFriend = (id: string) => {
    setFriends(friends.filter(f => f.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] pb-20 transition-colors duration-300">

      <HeaderForm title="Amigos" onBack={handleGoBack} />

      <div className="flex-grow p-4 lg:ml-50 lg:mr-50 md:ml-40 lg:mb-10 md:mr-40">

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Novo amigo</h2>
          <div className="flex items-center space-x gap-3">

            <Input
              placeholder="Email ou Nome"
              type="text"
              value={newFriendEmail}
              onChange={(e) => setNewFriendEmail(e.target.value)}
              className="flex-grow py-3 px-4 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-[#27272a] placeholder-gray-400 focus:outline-none hover:translate-y-[1px] hover:shadow-lg"
            />

            <button
              onClick={handleAddFriend}
              className="hover:bg-[#106a8c] bg-[#14879E] text-white p-3 rounded-lg transition-colors duration-200 hover:translate-y-[1px] hover:shadow-lg"
              aria-label="Adicionar novo amigo"
            >
              <FaPlus size={20} />
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-1 text-gray-800 dark:text-gray-200">Seus amigos</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Pessoas que dividem grupos com você
          </p>

          <div className="space-y-1">
            {friends.length === 0 && <p className="text-gray-400">Nenhum amigo encontrado.</p>}
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
