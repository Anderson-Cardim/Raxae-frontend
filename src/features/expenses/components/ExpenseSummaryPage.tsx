import { useContext, useState } from 'react';
import { GroupContext } from '../../context/GroupContext';
import ActionButton from '../../../components/ui/ActionButton';
import { SummaryMemberItem } from '../../expenses/components/SummaryMemberItem';
import SummaryInfoCard from './SummaryInfoCard';
import { useNavigate } from 'react-router-dom';
import { groupService, type GrupoRequest, type MembroRequest } from '../../../services/groupService';
import { expenseService } from '../../../services/expenseService';

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
            const membrosRequest: MembroRequest[] = (group.members || []).map(m => ({
                email: m.contact,
                nome: m.nome,
                funcao: "MEMBRO"
            }));

            const grupoRequest: GrupoRequest = {
                nome: group.groupName,
                descricao: group.description || "",
                icone: "",
                membros: membrosRequest,
                configuracao: {
                    juros: 0,
                    multa: 0
                },
                chavePix: group.adminPix || ""
            };

            const createdGroup = await groupService.criarGrupo(grupoRequest);
            console.log("Grupo criado:", createdGroup);

            // 2. Register Expense (if exists)
            if (group.expense) {
                const divisoesEspecificas: Record<string, number> = {};

                group.expense.members.forEach(expenseMember => {
                    const createdMember = createdGroup.membros.find(m =>
                        m.nomeUsuario === expenseMember.nome
                    );

                    if (createdMember) {
                        divisoesEspecificas[createdMember.idUsuario] = expenseMember.amount;
                    }
                });

                if (Object.keys(divisoesEspecificas).length > 0) {
                    await expenseService.registrarDespesa(createdGroup.id, {
                        nome: group.expense.description,
                        valor: group.expense.totalValue,
                        tipoRecorrencia: "UNICA",
                        tipoDivisao: "POR_VALOR",
                        diaVencimento: new Date().getDate(),
                        divisoesEspecificas: divisoesEspecificas,
                        dataVencimentoAvulsa: new Date().toISOString().split('T')[0]
                    });
                    console.log("Despesa registrada");
                }
            }

            alert("Grupo e despesas criados com sucesso!");
            navigate("/home");

        } catch (error) {
            console.error("Erro ao finalizar criação:", error);
            alert("Erro ao criar grupo ou despesa. Tente novamente.");
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
