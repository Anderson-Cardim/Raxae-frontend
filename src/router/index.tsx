import LoginPage from "../features/login/screens/LoginPages.tsx";
import RegisterPage from "../features/register/screens/RegisterPages.tsx";
import HomePage from "../features/home/screens/HomePages.tsx";
import CreateGroupPage from "../features/addGroup/screens/CreateGroupPage.tsx";
import {GroupProvider}  from "../features/context/GroupContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpensePage from "../features/expenses/screens/AddExpensePage.tsx";
import EditGroupPage from "../features/editGroup/screens/EditGroupPage.tsx";
import AddParticipantsPage from "../features/participants/screens/AddParticipantsPage.tsx";
import { GroupsPage } from "../features/groups/screens/GroupsPage.tsx";
import EditPerfil from "../features/editPerfil/screens/EditPerfil.tsx";
import AddFriends from "../features/addFriends/screens/AddFriends.tsx";
import MembersManagementPage from "../features/member/screens/MembersManagementPage.tsx";
import HistoryPage from "../features/history/screens/HistoryPage.tsx";
import MemberAdmin from "../features/memberAdmin/screens/MemberAdmin.tsx";
// import { ProtectedRoute } from "../components/auth/index.tsx";
import { Navigate } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <GroupProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        {/* <ProtectedRoute /> */}
          <Route >
            <Route path="/home" element={<HomePage />} />
            <Route path="/editar-perfil" element={<EditPerfil />} />
            <Route path="/adicionar-amigos" element={<AddFriends />} />
            <Route path="/history" element={<HistoryPage />} />

            <Route>
              <Route path="/grupo" element={<GroupsPage />} />
              <Route path="/criar-novo-grupo" element={<CreateGroupPage />} />
              <Route path="/editar-grupo" element={<EditGroupPage />} />

              <Route path="/grupo/membro" element={<MembersManagementPage />} />
              <Route path="/grupo/membro/admin" element={<MemberAdmin />} />
              <Route
                path="/adicionar-participantes"
                element={<AddParticipantsPage />}
              />
              <Route path="/adicionar-despesas" element={<AddExpensePage />} />
            </Route>
          </Route>

          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </GroupProvider>
    </BrowserRouter>
  );
};
