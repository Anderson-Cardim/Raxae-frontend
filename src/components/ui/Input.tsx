interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  placeholder: string;
  type: string;
  className?: string;
}

function Input({ placeholder, type, className, ...props }: InputProps) {
  return (
    <div className="input-group">
      <input
        {...props}
        type={type}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}

export default Input;
