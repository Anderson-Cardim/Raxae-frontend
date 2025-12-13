import LoginPage from "../features/login/screens/LoginPages.tsx";
import RegisterPage from "../features/register/screens/RegisterPages.tsx";
import HomePage from "../features/home/screens/HomePages.tsx";
import CreateGroupPage from "../features/addGroup/screens/CreateGroupPage.tsx";
import { GroupProvider } from "../features/context/GroupContext.tsx";
import { AuthProvider } from "../features/context/AuthContext.tsx";
import { ToastProvider } from "../contexts/ToastContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpensePage from "../features/expenses/screens/AddExpensePage.tsx";
import EditGroupPage from "../features/editGroup/screens/EditGroupPage.tsx";
import AddParticipantsPage from "../features/participants/screens/AddParticipantsPage.tsx";
import { GroupsPage } from "../features/groups/screens/GroupsPage.tsx";
import EditPerfil from "../features/editPerfil/screens/EditPerfil.tsx";
import AddFriends from "../features/addFriends/screens/AddFriends.tsx";
import ViewGroupPage from "../features/groups/screens/ViewGroupPage.tsx";
import MembersManagementPage from "../features/member/screens/MembersManagementPage.tsx";
import MemberHistoryPage from "../features/history/screens/MemberHistoryPage.tsx";
import MemberAdmin from "../features/memberAdmin/screens/MemberAdmin.tsx";
import GroupPaymentsPage from "../features/groups/screens/GroupPaymentsPage.tsx";
import { ExpenseSummaryPage } from "../features/expenses/components/ExpenseSummaryPage.tsx";
import { ProtectedRoute } from "../components/auth/index.tsx";
import { Navigate } from "react-router-dom";

import { ThemeProvider } from "../contexts/ThemeContext";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <GroupProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/editar-perfil" element={<EditPerfil />} />
                  <Route path="/adicionar-amigos" element={<AddFriends />} />

                  <Route>
                    <Route path="/grupo" element={<GroupsPage />} />
                    <Route path="/criar-novo-grupo" element={<CreateGroupPage />} />
                    <Route path="/editar-grupo" element={<EditGroupPage />} />
                    <Route path="/editar-grupo/:groupId" element={<EditGroupPage />} />
                    <Route path="/ver-grupo/:groupId" element={<ViewGroupPage />} />

                    <Route path="/grupo/membro" element={<MembersManagementPage />} />
                    <Route path="/grupo/membro/admin/:groupId" element={<MemberAdmin />} />
                    <Route path="/grupo/:groupId/historico/:memberId" element={<MemberHistoryPage />} />
                    <Route path="/grupo/:groupId/pagamentos" element={<GroupPaymentsPage />} />
                    <Route
                      path="/adicionar-participantes"
                      element={<AddParticipantsPage />}
                    />
                    <Route path="/adicionar-despesas" element={<AddExpensePage />} />
                    <Route path="/resumo-despesa" element={<ExpenseSummaryPage />} />
                    <Route path="/grupo/:groupId/participantes" element={<AddParticipantsPage />} />
                    <Route path="/grupo/:groupId/despesas/nova" element={<AddExpensePage />} />
                  </Route>
                </Route>

                {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
            </GroupProvider>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
