import React, { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../../services/authService";
import HeaderForm from "../../../components/layout/HeaderForm";
import FormSection from "../../addGroup/components/FormSection";
import Input from "../../../components/ui/Input";
import ActionButton from "../../../components/ui/ActionButton";
import FooterNav from "../../../components/layout/FooterNav";
import PhotoUploader from "../components/PhotoUploader";

interface UserData {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export default function EditPerfil() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userInfo = await authService.getMe();
        setUserData({
          name: userInfo.nomeUsuario || '',
          email: userInfo.emailUsuario || '',
          phone: userInfo.whatsAppUsuario || '',
          password: '', // API doesn't return password
        });
      } catch (error) {
        console.error("Failed to fetch user data", error);
        // Optionally handle error (e.g., redirect to login if 401, though auth context might handle that)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados do Perfil para salvar:", userData);
    navigate("/home");
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <HeaderForm title="Editar Perfil" onBack={handleGoBack} />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-500">Carregando...</p>
        </div>
        <FooterNav />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Editar Perfil" onBack={handleGoBack} />
      <div className="flex-grow p-6 lg:ml-35 lg:mr-35 mb-10">

        <div className="flex justify-center mb-8">
          <PhotoUploader />
        </div>

        <FormSection title="Nome">
          <Input
            placeholder="Digite seu nome"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />
        </FormSection>

        <FormSection title="E-mail">
          <Input
            placeholder="seu@email.com"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            readOnly // Often email is not editable, but keeping it editable if API allows updates.
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />
        </FormSection>

        <FormSection title="Número de Celular">
          <Input
            placeholder="(xx) xxxx-xxxx"
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />
        </FormSection>

        <FormSection title="Senha">
          <Input
            placeholder="**********"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />
        </FormSection>

        <div className="mt-8 flex justify-between space-x-4">
          <ActionButton
            text="Cancelar"
            type="button"
            onClick={handleCancel}
            className="py-3 px-6 text-red-500 border-2 border-red-500 bg-white hover:bg-red-50 rounded-lg text-xl font-bold transition-colors duration-300 flex-1 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />
          <ActionButton
            text="Salvar"
            type="submit"
            className="py-3 px-6 text-white bg-green-500 hover:bg-green-600 rounded-lg text-xl font-bold transition-colors duration-300 flex-1 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />
        </div>

        <div className="mt-4 space-y-4">
          <ActionButton
            text="Quero ser PRO"
            type="button"
            className="w-full py-3 px-10 text-white bg-[#F34403] hover:bg-[#e44005] rounded-lg text-xl font-bold transition-colors duration-300 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />

          <ActionButton
            text="Sair da Conta"
            type="button"
            onClick={handleLogout}
            className="w-full py-3 px-10 text-red-500 border-2 border-red-500 bg-white hover:bg-red-50 rounded-lg text-xl font-bold transition-colors duration-300 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
          />
        </div>

      </div>
      <FooterNav />
    </form>
  );
}