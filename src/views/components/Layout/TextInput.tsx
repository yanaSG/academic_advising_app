import React from "react";

interface TextInputProps {
  icon: React.ReactNode;
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  required?: boolean;
  minLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  required,
  minLength,
}) => (
  <div className={`flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm mb-4 w-full ${className}`}>
    <div className="text-gray-400 mr-2 text-xl">{icon}</div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full outline-none bg-transparent text-gray-700 text-base placeholder-gray-400"
      required={required}
      minLength={minLength}
    />
  </div>
);

export default TextInput;
