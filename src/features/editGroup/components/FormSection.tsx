
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="mb-6">
      <h4 className="text-white font-semibold tracking-wide mb-2 text-lg">{title}</h4>
      {children}
    </div>
  );
}

export default FormSection;