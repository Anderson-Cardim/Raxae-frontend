import logo from "../../../assets/logo.png";
import Input from "../../../components/ui/Input.tsx";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useToast } from "../../../contexts/ToastContext";

type RegisterFormInputs = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
};

function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm<RegisterFormInputs>();
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const toast = useToast();

  const onSubmit = async (data: RegisterFormInputs) => {
    setRegisterError(null);
    try {
      await registerUser({
        nomeCompleto: data.fullName,
        email: data.email,
        whatsapp: data.phone || "",
        senha: data.password
      });
      toast.success("Usuário registrado com sucesso! Faça login para continuar.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setRegisterError("Falha no registro. Tente novamente.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 text-white text-center"
      style={{ backgroundColor: "#14879E" }}
    >
      <img src={logo} alt="Logo Raxae" className="mb-6 h-24" />

      <div className="w-full max-w-sm mb-8">
        <h1 className="text-4xl mb-4 font-extrabold">Registre-se</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        {registerError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{registerError}</span>
          </div>
        )}

        <Input
          placeholder="Nome Completo"
          type="text"
          className="w-full p-3 mb-4 text-center rounded-xl bg-white text-gray-700 placeholder-gray focus:outline-none focus:ring-2 focus:ring-white"
          {...register("fullName", {
            required: "Nome completo é obrigatório",
            minLength: {
              value: 3,
              message: "O nome deve ter pelo menos 3 caracteres",
            },
          })}
        />
        {errors.fullName && (
          <p className="text-red-300 text-sm mt-1">
            {String(errors.fullName.message)}
          </p>
        )}

        <Input
          placeholder="E-mail"
          type="email"
          className="w-full p-3 text-center mb-4 rounded-xl bg-white text-gray-700 placeholder-gray focus:outline-none focus:ring-2 focus:ring-white"
          {...register("email", {
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Formato de e-mail inválido",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-300 text-sm mt-1">
            {String(errors.email.message)}
          </p>
        )}

        <Input
          placeholder="Celular"
          type="telephone"
          className="w-full p-3 text-center mb-4 rounded-xl bg-white text-gray-700 placeholder-gray focus:outline-none focus:ring-2 focus:ring-white"
          {...register("phone", {
            pattern: {
              value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
              message: "Formato de telefone inválido",
            },
          })}
        />
        {errors.phone && (
          <p className="text-red-300 text-sm mt-1">
            {String(errors.phone.message)}
          </p>
        )}

        <Input
          placeholder="Senha"
          type="password"
          className="w-full p-3 text-center mb-4 rounded-xl bg-white text-gray-700 placeholder-gray focus:outline-none focus:ring-2 focus:ring-white"
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-300 text-sm mt-1">
            {String(errors.password.message)}
          </p>
        )}

        <Button
          texto="Registrar"
          type="submit"
          className="w-50 mt-6 max-w-sm bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 rounded-3xl mb-4 transition duration-300 bg-gradient-to-l from-[#3F2B86] to-[#7F79D4] hover:translate-y-[1px] hover:shadow-lg"
        />
      </form>

      <p className="text-sm mt-2">Já tem uma conta?</p>
      <Link to="/login" className="text-sm mt-1 underline ml-1 hover:text-[#7F79D4] hover:text-gray-300">
        Login
      </Link>
    </div>
  );
}

export default RegisterPage;
