interface GroupItemProps {
  name: string;
  value: number;
  icon: string;
}

function GroupItem({ name, value, icon }: GroupItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img
          src={icon}
          alt={`Ícone do grupo ${name}`}
          className="w-10 h-10 rounded-lg object-cover"
        />
        <p className="text-black text-base font-medium">{name}</p>
      </div>

      <p className="text-green-500 text-base font-semibold">R$ {value.toFixed(2).replace('.', ',')}</p>
    </div>
  );
}

export default GroupItem;