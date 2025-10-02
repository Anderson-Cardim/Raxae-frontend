import StatCard from "./StatCard";

interface StatsSectionProps {
  stats: {
    totalGroups: number;
    totalSaved: number;
    pendingMembers: number;
    totalPaid: number;
  };
}

function StatsSection({ stats }: StatsSectionProps) {
  const { totalGroups, totalSaved, pendingMembers, totalPaid } = stats;

  return (
    <section className="p-4 -mt-16 pt-4">
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="NÚMERO DE GRUPOS" value={totalGroups} type="groups" />

        <StatCard
          label="ECONOMIA TOTAL"
          value={`R$ ${totalSaved.toFixed(2).replace(".", ",")}`}
          type="saved"
        />

        <StatCard
          label="MEMBROS PENDENTES"
          value={pendingMembers}
          type="pending"
        />

        <StatCard
          label="TOTAL PAGO NO MÊS"
          value={`R$ ${totalPaid.toFixed(2).replace(".", ",")}`}
          type="paid"
        />
      </div>
    </section>
  );
}

export default StatsSection;
