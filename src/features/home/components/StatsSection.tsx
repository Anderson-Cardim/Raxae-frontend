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
    <section className="px-6 -mt-12 mb-8 container mx-auto ">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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
