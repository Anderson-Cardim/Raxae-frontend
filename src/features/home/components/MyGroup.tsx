import GroupItem from "./GroupItem";
import { useNavigate } from "react-router-dom";

interface MyGroupsProps {
  groups: {
    name: string;
    value: number;
    icon: string;
  }[];
}

function MyGroups({ groups }: MyGroupsProps) {

  const navigate = useNavigate();

   const handleNext = () => {
    navigate("/grupo");
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 pt-4 relative z-10 mx-4 lg:ml-50 lg:mr-50 lg:p-6 lg:mt-10 lg:mb-10 lg:gap-5 md:ml-30 md:mr-30 md:mb-10 md:mt-10 md:gap-5 flex flex-col ">
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

      <button onClick={handleNext} className=" mt-4 py-3 border border-black rounded-3xl text-black font-semibold hover:translate-y-[1px] hover:shadow-lg lg:mr-10 lg:ml-10">
        Gerenciar grupos
      </button>
    </div>
  );
}

export default MyGroups;
