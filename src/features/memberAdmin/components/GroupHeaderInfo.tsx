
import React from 'react';

interface GroupHeaderInfoProps {
    imageUrl: string;
    groupName: string;
}

const GroupHeaderInfo: React.FC<GroupHeaderInfoProps> = ({ imageUrl, groupName }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#27272a] rounded-2xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <img
                src={imageUrl}
                alt={groupName}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-600 shadow-lg object-cover mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">{groupName}</h1>
        </div>
    );
};

export default GroupHeaderInfo;