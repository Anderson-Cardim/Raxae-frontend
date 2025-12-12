import logo from "../../../assets/logo.png";
import Input from "../../../components/ui/Input.tsx";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

type LoginFormInputs = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    setLoginError(null);
    try {
      await login({ email: data.email, senha: data.password });
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Falha no login. Verifique suas credenciais.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 text-white text-center"
      style={{ backgroundColor: "#00334e" }}
    >
      <img src={logo} alt="Logo Raxae" className="mb-8 h-24" />

      <div className="w-full max-w-sm mb-8 text-left">
        <h1 className="text-4xl font-black mb-2 font-extrabold">
          Oi, <br /> Bem-vindo!
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{loginError}</span>
          </div>
        )}

        <Input
          placeholder="E-mail"
          type="email"
          className="w-full p-3 mb-4 text-center rounded-xl bg-white text-gray-700 placeholder-gray focus:outline-none focus:ring-2 focus:ring-white"
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
          texto="Entrar"
          type="submit"
          className="w-50 mt-10 max-w-sm bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 rounded-3xl mb-4 transition duration-300 bg-gradient-to-l from-[#3F2B86] to-[#7F79D4] hover:translate-y-[1px] hover:shadow-lg cursor-pointer"
        />
      </form>

      <p className="text-sm mt-6">Não tem uma conta ainda?</p>

      <Link to="/register" className="text-sm mt-1 underline ml-1 hover:text-gray-300">
        Registre-Se
      </Link>
    </div>
  );
}

export default LoginPage;
