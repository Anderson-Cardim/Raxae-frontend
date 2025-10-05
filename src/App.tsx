import LoginPage from "./features/login/screens/LoginPages.tsx";
import RegisterPage from "./features/register/screens/RegisterPages.tsx";
import HomePage from "./features/home/screens/HomePages.tsx";
import CreateGroupPage from "./features/addGroup/screens/CreateGroupPage.tsx";
import { GroupProvider } from "./features/context/GroupContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpensePage from "./features/expenses/screens/AddExpensePage.tsx";
import EditGroupPage from "./features/editGroup/screens/EditGroupPage.tsx";
import AddParticipantsPage from "./features/participants/screens/AddParticipantsPage.tsx";
import { GroupsPage } from "./features/groups/screens/GroupsPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <GroupProvider>
        <Routes>
          <Route path="/grupo" element={<GroupsPage/>} />
          <Route path="/adicionar-despesas" element={<AddExpensePage />} />
          <Route path="/criar-novo-grupo" element={<CreateGroupPage />} />
          <Route
            path="/adicionar-participantes"
            element={<AddParticipantsPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/editar-grupo" element={<EditGroupPage />} />
        </Routes>
      </GroupProvider>
    </BrowserRouter>
  );
}

export default App;
