// src/pages/MembersManagementPage.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterNav from "../../../components/layout/FooterNav";
import MemberItem from "../components/MemberItem";
import HeaderForm from "../../../components/layout/HeaderForm";
import ProofAttachmentForm from "../components/ProofAttachmentForm";
import GroupHeaderInfo from "../components/GroupHeaderInfo";

interface Group {
  name: string;
  imageUrl: string;
}

interface Member {
  id: string;
  name: string;
  isCurrentUser: boolean;
  isManager: boolean;
  canDelete: boolean;
  imageUrl: string;
}

const mockGroup: Group = {
  name: "Aluguel",
  imageUrl: "/ImagemDisney.svg",
};

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Alice",
    isCurrentUser: false,
    isManager: true,
    canDelete: false,
    imageUrl: "/ImagemDisney.svg"
  },
  {
    id: "2",
    name: "Pedro",
    isCurrentUser: true,
    isManager: false,
    canDelete: true,
    imageUrl: "/ImagemDisney.svg"
  },
];
export default function MembersManagementPage() {
  const navigate = useNavigate();
  const [group] = useState(mockGroup);
  const [members, setMembers] = useState(mockMembers);

  const handleGoBack = () => {
    navigate("/grupo-dashboard");
  };

  const handleRemoveMember = (memberId: string) => {
    if (window.confirm("Tem certeza que deseja remover este membro?")) {
      setMembers(members.filter((m) => m.id !== memberId));
      console.log(`Membro ${memberId} removido.`);
    }
  };

  const handleChat = (memberId: string) => {
    console.log(`Abrir chat com membro ${memberId}`);
  };

  const handleProofUpload = async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(`[API CALL] Enviando arquivo ${file.name}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Membros" onBack={handleGoBack} />

      <div className="flex-grow p-4">
        <GroupHeaderInfo groupName={group.name} imageUrl={group.imageUrl}/> 

        <div className="space-y-3 mb-8">
          {members.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              onChat={handleChat}
              onRemove={handleRemoveMember}
            />
          ))}
        </div>

        <ProofAttachmentForm onUpload={handleProofUpload} />
      </div>

      <FooterNav />
    </div>
  );
}
