
import React from 'react';

interface GroupHeaderInfoProps {
    imageUrl: string;
    groupName: string;
}

const GroupHeaderInfo: React.FC<GroupHeaderInfoProps> = ({ imageUrl, groupName }) => {
    return (
        <div className="flex items-center space-x-3 mb-6 ">
            <img 
                src={imageUrl} 
                alt={groupName} 
                className="w-20 h-16 rounded-2xl object-cover"
            />
            <h1 className="text-3xl font-bold text-gray-800">{groupName}</h1>
        </div>
    );
};

export default GroupHeaderInfo;