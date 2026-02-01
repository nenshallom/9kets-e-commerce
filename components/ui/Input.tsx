interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

// A reusable Input component with label
export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input 
        className={`w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${className}`}
        {...props} 
      />
    </div>
  );
}