import GroupItem from "./GroupItem";

interface MyGroupsProps {
  groups: {
    name: string;
    value: number;
    icon: string;
  }[];
}

function MyGroups({ groups }: MyGroupsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 pt-4 relative z-10 mx-4 ">
      <h3 className="text-black text-lg font-bold mb-4">MEUS GRUPOS</h3>

      <div className="space-y-4">
        {groups.map((group, index) => (
          <GroupItem
            key={index}
            name={group.name}
            value={group.value}
            icon={group.icon}
          />
        ))}
      </div>

      <button className="w-full mt-6 py-3 border border-black rounded-3xl text-black font-semibold">
        Gerenciar grupos
      </button>
    </div>
  );
}

export default MyGroups;
