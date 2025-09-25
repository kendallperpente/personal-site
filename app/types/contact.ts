// Contact form data structure matching D1 database schema
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  description: string;
}

// API response structure for consistent error handling
export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Validation result structure
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Form field configuration for DRY principle
export interface FormField {
  name: keyof ContactFormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  required: boolean;
  maxLength?: number;
}
