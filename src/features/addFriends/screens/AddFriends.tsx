import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterNav from "../../../components/layout/FooterNav";
import HeaderForm from "../../../components/layout/HeaderForm";
import Input from "../../../components/ui/Input";
import ActionButton from "../../../components/ui/ActionButton";
import GroupInviteModal from "../components/GroupInviteModal";
import { GroupContext } from "../../context/GroupContext";
import { groupService } from "../../../services/groupService";
import type { GrupoResponse } from "../../../services/groupService";


export default function FriendsPage() {
  const [groupCode, setGroupCode] = useState("");
  const [foundGroup, setFoundGroup] = useState<GrupoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const context = useContext(GroupContext);

  const { isModalOpen, closeModalConvite, openModalConvite } = context;

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/home");
  };

  const handleSearchGroup = async () => {
    if (groupCode.trim() === "") {
      setSearchError("O código do grupo não pode ser vazio.");
      return;
    }

    setIsLoading(true);
    setSearchError("");

    try {
      const groupDetails = await groupService.obterGrupo(
        groupCode.trim()
      );

      setFoundGroup(groupDetails);
      openModalConvite();
      setGroupCode(""); 
    } catch (error: any) {
      console.error("Erro ao buscar grupo:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Grupo não encontrado ou código inválido.";
      setSearchError(errorMessage);
      setFoundGroup(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!foundGroup) return;

    const codigoConvite = foundGroup.id;

    setIsLoading(true);
    closeModalConvite();

    try {
      await groupService.entrarNoGrupo(codigoConvite);

      alert(`Você entrou no grupo: ${foundGroup.nomeGrupo}!`);

      navigate(`/grupo`);
    } catch (error) {
      console.error("Erro ao entrar no grupo:", error);
      alert("Não foi possível completar a adesão ao grupo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    handleSearchGroup(); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Convite" onBack={handleGoBack} />

      <div className="flex-grow p-4 lg:ml-50 lg:mr-50 md:ml-40 lg:mb-10 md:mr-40">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Buscar Grupo
          </h2>
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <Input
              placeholder="Inserir código do grupo"
              type="text"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              className="flex-grow py-3 px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none hover:translate-y-[1px] hover:shadow-lg"
            />

            <ActionButton
              type="submit"
              text={isLoading ? "Buscando..." : "Buscar"}
              disabled={isLoading}
              className="hover:bg-[#106a8c] bg-[#14879E] text-white p-3 rounded-lg transition-colors duration-200 hover:translate-y-[1px] hover:shadow-lg"
            >
              Buscar
            </ActionButton>
          </form>
          {searchError && (
            <p className="text-red-500 text-sm mt-2">{searchError}</p>
          )}
        </div>

        {isModalOpen && foundGroup && (
          <GroupInviteModal
            isOpen={isModalOpen}
            group={foundGroup}
            onClose={closeModalConvite}
            onConfirm={handleJoinGroup}
          />
        )}
      </div>
      <FooterNav />
    </div>
  );
}
