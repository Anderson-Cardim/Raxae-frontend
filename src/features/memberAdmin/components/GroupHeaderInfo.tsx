
import React from 'react';

interface GroupHeaderInfoProps {
    groupName: string;
}

const GroupHeaderInfo: React.FC<GroupHeaderInfoProps> = ({ groupName }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#27272a] rounded-2xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">{groupName}</h1>
        </div>
    );
};

export default GroupHeaderInfo;