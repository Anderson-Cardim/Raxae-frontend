
interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
{
  texto: string;
  type: "submit" | "button";
  className?: string;
}

function Button({ texto, type, className, ...props }: ButtonProps) {
  return (
    <button {...props} type={type} className={className}>
      {texto}
    </button>
  );
}

export default Button;