export interface GroupCardProps {
    id: string;
    name: string;
    memberCount: number;
    value: number;
    dueDate: number;
    imageUrl: string;
    
    onEdit: (groupId: string) => void; 
    onDelete: (groupId: string) => void;
}

export function GroupsCard() {

    return (
        <div>
            <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})`
        }}>
            </div>
        </div>
    );
}