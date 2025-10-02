import React from 'react';

interface GroupInfoCardProps {
  groupName: string;
  description: string; 
  imageUrl?: string;
  className?: string;
}

const GroupInfoCard: React.FC<GroupInfoCardProps> = ({ groupName, description, imageUrl, className }) => {

    const initial = groupName.charAt(0).toUpperCase();

    return (
        <div className={className}>
        {imageUrl ? (
            <img
            src={imageUrl}
            alt={`Foto de perfil do grupo ${groupName}`}
            className="w-16 h-16 rounded-full object-cover mr-4"
            />
        ) : (
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mr-4 text-xl font-bold text-white">
            {initial}
            </div>
        )}
        <div> 
            <h2 className="text-2xl font-bold text-black">{groupName}</h2>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        </div>
    );
};

export default GroupInfoCard;