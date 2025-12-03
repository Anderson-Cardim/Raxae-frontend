import { useContext, useState } from 'react';
import { GroupContext } from '../../context/GroupContext';
import ActionButton from '../../../components/ui/ActionButton';
import { SummaryMemberItem } from '../../expenses/components/SummaryMemberItem';
import SummaryInfoCard from './SummaryInfoCard';
import { useNavigate } from 'react-router-dom';
import { groupService, type GrupoRequest } from '../../../services/groupService';


export function ExpenseSummaryPage() {

    const context = useContext(GroupContext);
    const navigate = useNavigate();
    const { group } = context;
    const [loading, setLoading] = useState(false);

    const membersList = group?.members || [];

    const groupImageUrl =
        group?.groupImage && group.groupImage.length > 0
            ? URL.createObjectURL(group.groupImage[0])
            : undefined;

    const handleNext = async () => {
        if (!group) return;
        setLoading(true);

        try {
            // 1. Create Group
            const grupoRequest: GrupoRequest = {
                nomeGrupo: group.groupName,
                descricao: group.description || "",
                icone: "default-icon",
            };

            const createdGroup = await groupService.criarGrupo(grupoRequest);
            console.log("Grupo criado:", createdGroup);

            // 2. Generate Invite Link
            try {
                const inviteLink = await groupService.gerarConvite(createdGroup.id);
                console.log("Link de convite:", inviteLink);
                alert(`Grupo criado! Link de convite: ${inviteLink}`);
            } catch (inviteError) {
                console.error("Erro ao gerar convite:", inviteError);
            }

            navigate("/home");

        } catch (error) {
            console.error("Erro ao finalizar criação:", error);
            alert("Erro ao criar grupo. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Processando...</div>
            </div>
        );
    }

    return (
        <div className="flex-grow p-4 lg:ml-40 lg:mr-40 lg:mb-10">

            <div className="flex-grow p-6">

                <h1 className='text-2xl font-bold'>Resumo</h1>

                <div className="border-b border-gray-100">
                    <div className="flex items-start space-x-4">
                        <SummaryInfoCard
                            className={"flex items-center mt-9 mb-15 text-2xl"}
                            totalValue={group?.expense?.totalValue}
                            groupName={group?.groupName}
                            imageUrl={groupImageUrl}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {membersList.map((member) => (
                        <SummaryMemberItem
                            key={member.id}
                            name={member.nome}
                            amount={member.amount}
                        />
                    ))}
                </div>
            </div>

            <div className='pt-10'>
                <ActionButton
                    text="Pronto"
                    onClick={handleNext}
                    className="w-full py-3 text-white bg-[#F34403] hover:bg-[#e44005] rounded-xl font-bold transition-colors duration-300 hover:translate-y-[1px] hover:shadow-lg"
                />
            </div>
        </div>
    );
}
