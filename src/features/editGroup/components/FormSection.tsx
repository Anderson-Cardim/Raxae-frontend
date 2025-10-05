
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="mb-6">
      <h4 className="text-black font-semibold mb-2">{title}</h4>
      {children}
    </div>
  );
}

export default FormSection;