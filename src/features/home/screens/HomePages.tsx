import Header from "../components/Header";
import StatsSection from "../components/StatsSection";
import MyGroups from "../components/MyGroup";

import groupIcon from "../../../assets/group_icon.png";
import ActionButton from "../../../components/ui/ActionButton";
import FooterNav from "../../../components/layout/FooterNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { groupService, type GrupoResponse } from "../../../services/groupService";
import { authService, type UsuarioInfoResponse } from "../../../services/authService";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [groups, setGroups] = useState<GrupoResponse[]>([]);
  const [stats, setStats] = useState<UsuarioInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myGroups, myStats] = await Promise.all([
          groupService.listarMeusGrupos(),
          authService.getMe()
        ]);
        setGroups(myGroups);
        setStats(myStats);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userData = {
    name: stats?.nomeUsuario || user?.name || "Usuário nao encontrado",
    profilePic: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // Placeholder
    pendingMembers: 0,
    totalGroups: stats?.numeroDeGrupo || groups.length,
    totalSaved: stats?.economiaTotal || 0,
    totalPaid: stats?.totalPagoNoMes || 0,
  };

  const groupsData = groups.map(g => ({
    name: g.nomeGrupo,
    value: 0,
    icon: (g.icone && g.icone !== 'default-icon') ? g.icone : groupIcon
  }));

  const handleNext = () => {
    navigate("/criar-novo-grupo");
  };

  return (
    <div className="home-page-container pb-20 flex flex-col">
      <Header userName={userData.name} profilePic={userData.profilePic} />

      <StatsSection stats={userData} />

      {loading ? (
        <div className="p-4 text-center">Carregando...</div>
      ) : (
        <MyGroups groups={groupsData} />
      )}

      <div className="p-4 pt-4 lg:ml-60 lg:mr-60 lg:mb-8 md:ml-30 md:mr-30 md:mb-6">
        <ActionButton
          text="ADICIONAR GRUPO"
          onClick={handleNext}
          className="w-full py-4 text-white bg-[#F34403] hover:bg-[#e44005] rounded-2xl font-bold transition-colors duration-300 hover:translate-y-[1px] hover:shadow-lg "
        />
      </div>
      <FooterNav />
    </div>
  );
}

export default HomePage;
