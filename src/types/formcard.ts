// types/FormCard.types.ts
export type FormVariant = 
  | 'single-choice' 
  | 'multiple-choice' 
  | 'text-input' 
  | 'number-input' 
  | 'textarea' 
  | 'dropdown';

export interface OptionItem {
  label: string;
  value: string;
}

export type FormOption = string | OptionItem;

export interface FormCardProps {
  variant?: FormVariant;
  title: string;
  subtitle?: string;
  options?: FormOption[];
  placeholder?: string;
  value?: string | string[] | number;
  onChange?: (value: string | string[] | number) => void;
  required?: boolean;
  className?: string;
}

export interface SurveyResponses {
  studentId?: string;
  program?: string;
  gender?: string;
  gpa?: number;
  performance?: string;
  workload?: string;
  learningStyle?: string[];
  problemSolving?: string;
  personality?: string;
  hobbies?: string[];
  otherHobbies?: string;
  financial?: string;
  parentsStatus?: string;
  birthOrder?: string;
  responsibilities?: string;
}
