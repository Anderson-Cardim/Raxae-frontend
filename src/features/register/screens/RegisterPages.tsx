import logo from "../../../assets/react.svg";
import Input from "../../../components/ui/Input.tsx";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button.tsx";

type RegisterFormInputs = {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
};

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
    alert(`Usuário registrado!\nNome: ${data.fullName}\nE-mail: ${data.email}`);
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
              value: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, // Exemplo de regex para telefone BR
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
          className="w-50 mt-6 max-w-sm bg-violet-700 hover:bg-violet-800 text-white font-bold py-3 rounded-3xl mb-4 transition duration-300 bg-gradient-to-l from-[#3F2B86] to-[#7F79D4]"
        />
      </form>

      <p className="text-sm mt-2">Já tem uma conta?</p>

      <p className="text-sm mt-1">
        <a href="#" className="underline ml-1 hover:bg-sky-600">
          Login
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
