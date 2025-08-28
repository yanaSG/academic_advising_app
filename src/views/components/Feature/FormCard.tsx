
// components/FormCard.tsx
import React, { useState, type JSX } from 'react';
import type { FormCardProps, FormOption } from '../../../types/formcard';

const FormCard: React.FC<FormCardProps> = ({ 
  variant = 'single-choice',
  title,
  subtitle,
  options = [],
  placeholder = '',
  value,
  onChange,
  required = false,
  className = ''
}) => {
  const [selectedValues, setSelectedValues] = useState<string | string[] | number>(
    value || (variant === 'multiple-choice' ? [] : '')
  );

  const handleChange = (newValue: string | string[] | number): void => {
    setSelectedValues(newValue);
    if (onChange) onChange(newValue);
  };

  const handleMultipleChoice = (optionValue: string): void => {
    const currentValues = Array.isArray(selectedValues) ? selectedValues : [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v: string) => v !== optionValue)
      : [...currentValues, optionValue];
    handleChange(newValues);
  };

  const getOptionValue = (option: FormOption): string => {
    return typeof option === 'string' ? option : option.value;
  };

  const getOptionLabel = (option: FormOption): string => {
    return typeof option === 'string' ? option : option.label;
  };

  const renderInput = (): JSX.Element | null => {
    switch (variant) {
      case 'single-choice':
        return (
          <div className="space-y-3">
            {options.map((option: FormOption, index: number) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);
              
              return (
                <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name={title}
                    value={optionValue}
                    checked={selectedValues === optionValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {optionLabel}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {options.map((option: FormOption, index: number) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);
              const currentValues = Array.isArray(selectedValues) ? selectedValues : [];
              
              return (
                <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value={optionValue}
                    checked={currentValues.includes(optionValue)}
                    onChange={() => handleMultipleChoice(optionValue)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {optionLabel}
                  </span>
                </label>
              );
            })}
          </div>
        );

      case 'text-input':
        return (
          <input
            type="text"
            placeholder={placeholder}
            value={typeof selectedValues === 'string' ? selectedValues : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        );

      case 'number-input':
        return (
          <input
            type="number"
            placeholder={placeholder}
            value={typeof selectedValues === 'number' ? selectedValues : ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const numValue = parseFloat(e.target.value);
              handleChange(isNaN(numValue) ? 0 : numValue);
            }}
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={placeholder}
            value={typeof selectedValues === 'string' ? selectedValues : ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
          />
        );

      case 'dropdown':
        return (
          <select
            value={typeof selectedValues === 'string' ? selectedValues : ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">Select an option...</option>
            {options.map((option: FormOption, index: number) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);
              
              return (
                <option key={index} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 transition-all duration-200 hover:shadow-xl ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {subtitle && (
          <p className="text-gray-600 text-sm leading-relaxed">{subtitle}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {renderInput()}
      </div>
    </div>
  );
};

export default FormCard;
