import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderForm from "../../../components/layout/HeaderForm";
import FormSection from "../../addGroup/components/FormSection";
import Input from "../../../components/ui/Input";
import ActionButton from "../../../components/ui/ActionButton";
import FooterNav from "../../../components/layout/FooterNav";


interface UserData {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export default function EditPerfil() {

    const [userData, setUserData] = useState<UserData>({
        name: 'Anderson Cardim',
        email: 'seu@email.com',
        phone: '(99) 99999-9999',
        password: '',
    }); 

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 

      console.log("Dados do Perfil para salvar:", userData);

      navigate("/perfil"); 
    };

    const handleGoBack = () => {
        navigate("/perfil");
    };
    
    const handleCancel = () => {
      navigate("/perfil");
    };

    const handlePro = () => {
      console.log("Navegar para a página PRO");
    };
    
    return (
        <form onSubmit={handleSave} className="flex flex-col min-h-screen bg-white pb-20">
          <HeaderForm title="Editar Perfil" onBack={handleGoBack} />
          <div className="flex-grow p-6 ">
            
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center border-2 border-gray-300 overflow-hidden">
                    
                </div>
                
            </div>

            <FormSection title="Nome">
              <Input
                placeholder="Digite seu nome"
                type="text"
                name="name" 
                value={userData.name}
                onChange={handleChange} 
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
            </FormSection>

            <FormSection title="E-mail">
              <Input
                placeholder="seu@email.com"
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
                disabled 
              />
            </FormSection>

            <FormSection title="Número de Celular">
              <Input
                placeholder="(xx) xxxx-xxxx"
                mask="(99) 99999-9999"
                type="text" 
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
            </FormSection>

            <FormSection title="Senha">
              <Input
                placeholder="**********"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
            </FormSection>
        
            <div className="mt-8 flex justify-between space-x-4">
              <ActionButton 
                text="Cancelar" 
                type="button" 
                onClick={handleCancel}
                className="py-3 px-6 text-red-500 border-2 border-red-500 bg-white hover:bg-red-50 rounded-lg text-xl font-bold transition-colors duration-300 flex-1"
              />
              <ActionButton 
                text="Salvar" 
                type="submit" 
                className="py-3 px-6 text-white bg-green-500 hover:bg-green-600 rounded-lg text-xl font-bold transition-colors duration-300 flex-1"
              />
            </div>

            <div className="mt-4">
              <ActionButton 
                text="Quero ser PRO" 
                type="button" 
                onClick={handlePro}
                className="w-full py-3 px-10 text-white bg-orange-600 hover:bg-orange-700 rounded-lg text-xl font-bold transition-colors duration-300"
              />
            </div>
            
          </div>
          <FooterNav />
        </form>
    );
}