export interface ActionButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    text: string;
}

function ActionButton({ text, ...props}: ActionButtonProps) {
  return (
    <button {...props}>
      {text}
    </button>
  );
}

export default ActionButton;