interface GroupInfoCardProps {
  groupName?: string;
  totalValue?: number; 
  imageUrl?: string;
  className?: string;
}

const SummaryInfoCard: React.FC<GroupInfoCardProps> = ({ groupName, imageUrl, className, totalValue }) => {

    const initial = groupName?.charAt(0).toUpperCase();

    return (
        <div className={className}>
            
            {imageUrl ? (
                <img
                src={imageUrl}
                alt={`Foto de perfil do grupo ${groupName}`}
                className="w-16 rounded-full object-cover mr-4"
                />
            ) : (
                <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mr-4 text-xl font-bold text-white">
                {initial}
                </div>
            )}

            <div> 
                <h1 className="text-2xl font-bold text-black">{groupName}</h1>
                <h2 className="text-2xl font-extralight text-[#F34403]">Total pago: </h2>
                <h2 className="text-2xl font-bold text-[#14879E]">R${totalValue}</h2>
            </div>
        </div>
    );
};

export default SummaryInfoCard;