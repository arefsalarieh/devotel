// Base field types
export interface BaseField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  visibility?: {
    dependsOn: string;
    condition: string;
    value: string;
  };
}

// Text field
export interface TextField extends BaseField {
  type: 'text';
}

// Number field
export interface NumberField extends BaseField {
  type: 'number';
}

// Date field
export interface DateField extends BaseField {
  type: 'date';
}

// Select field
export interface SelectField extends BaseField {
  type: 'select';
  options?: string[];
  dynamicOptions?: {
    dependsOn: string;
    endpoint: string;
    method: string;
  };
}

// Radio field
export interface RadioField extends BaseField {
  type: 'radio';
  options: string[];
}

// Checkbox field
export interface CheckboxField extends BaseField {
  type: 'checkbox';
  options: string[];
}

// Group field (nested fields)
export interface GroupField extends BaseField {
  type: 'group';
  fields: FormFieldType[];
}

// Union type for all field types
export type FormFieldType = 
  | TextField 
  | NumberField 
  | DateField 
  | SelectField 
  | RadioField 
  | CheckboxField 
  | GroupField;

// Main form structure
export interface InsuranceFormData {
  formId: string;
  title: string;
  fields: FormFieldType[];
}

// API Response type
export type InsuranceFormsResponse = InsuranceFormData[];

// Form submission data
export interface FormSubmissionData {
  formId: string;
  data: Record<string, any>;
  submittedAt?: string;
}

// Form validation error
export interface FormError {
  fieldId: string;
  message: string;
}