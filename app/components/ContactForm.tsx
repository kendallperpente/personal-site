'use client';

import { useActionState, useState } from 'react';
import { submitContactForm } from '../actions/contactActions';
import { FormField, ContactSubmissionResponse } from '../types/contact';
import ContactValidator from '../utils/contactValidator';
import Turnstile from './Turnstile';

// Environment variables for Turnstile
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || 'your-site-key-here';

// DRY Principle: Form field configuration
const FORM_FIELDS: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
    maxLength: 100
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
    maxLength: 254
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    required: true,
    maxLength: 20
  },
  {
    name: 'description',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us about your project or inquiry...',
    required: true,
    maxLength: 1000
  }
];

// Single Responsibility: Input field component
interface FormInputProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

function FormInput({ field, value, onChange, error, disabled }: FormInputProps) {
  const baseClasses = `
    w-full px-4 py-3 rounded-lg border transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error 
      ? 'border-red-500 bg-red-50 text-red-900' 
      : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
    }
  `;

  const commonProps = {
    id: field.name,
    name: field.name,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder: field.placeholder,
    required: field.required,
    maxLength: field.maxLength,
    disabled,
    className: baseClasses
  };

  return (
    <div className="space-y-2">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-300">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      {field.type === 'textarea' ? (
        <textarea
          {...commonProps}
          rows={4}
          className={`${baseClasses} resize-vertical min-h-[100px]`}
        />
      ) : (
        <input
          {...commonProps}
          type={field.type}
        />
      )}
      
      {error && (
        <p className="text-sm text-red-400 flex items-center gap-1">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

// Main contact form component
export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactSubmissionResponse | null, FormData>(
    submitContactForm,
    null
  );
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileError, setTurnstileError] = useState<string>('');

  // Client-side validation for immediate feedback
  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear previous errors for this field
    if (clientErrors[fieldName]) {
      setClientErrors(prev => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [fieldName]: _, ...rest } = prev;
        return rest;
      });
    }
    
    // Validate single field
    const validation = ContactValidator.validate({ ...formData, [fieldName]: value });
    if (!validation.isValid && validation.errors[fieldName]) {
      setClientErrors(prev => ({
        ...prev,
        [fieldName]: validation.errors[fieldName]
      }));
    }
  };

  // Reset form after successful submission
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', description: '' });
    setClientErrors({});
    setTurnstileToken('');
    setTurnstileError('');
  };

  // Turnstile handlers
  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
    setTurnstileError('');
  };

  const handleTurnstileError = () => {
    setTurnstileToken('');
    setTurnstileError('Security verification failed. Please try again.');
  };

  const handleTurnstileExpire = () => {
    setTurnstileToken('');
    setTurnstileError('Security verification expired. Please verify again.');
  };

  // Show success message if form was submitted successfully
  if (state?.success) {
    return (
      <div className="max-w-md mx-auto py-8 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full">
            <span className="text-green-600 text-xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h2>
          <p className="text-green-700">{state.message}</p>
        </div>
        <button
          onClick={resetForm}
          className="inline-block px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-cyan-400">Get In Touch</h1>
        <p className="text-gray-300 mb-6">
          Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can work together.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {FORM_FIELDS.map((field) => (
          <FormInput
            key={field.name}
            field={field}
            value={formData[field.name]}
            onChange={(value) => handleFieldChange(field.name, value)}
            error={clientErrors[field.name]}
            disabled={isPending}
          />
        ))}

        {/* Turnstile Security Check */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Security Verification <span className="text-red-400 ml-1">*</span>
          </label>
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onVerify={handleTurnstileVerify}
            onError={handleTurnstileError}
            onExpire={handleTurnstileExpire}
            theme="dark"
            className="flex justify-center"
          />
          {turnstileError && (
            <p className="text-sm text-red-400 flex items-center gap-1">
              <span>⚠</span>
              {turnstileError}
            </p>
          )}
          <input type="hidden" name="turnstile-token" value={turnstileToken} />
        </div>

        {/* Error message */}
        {state && !state.success && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm flex items-center gap-2">
              <span>⚠</span>
              {state.message}
            </p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending || Object.keys(clientErrors).length > 0 || !turnstileToken}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200
            ${isPending || Object.keys(clientErrors).length > 0 || !turnstileToken
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-400 hover:shadow-lg transform hover:-translate-y-0.5'
            }
            text-white
          `}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Sending Message...
            </span>
          ) : !turnstileToken ? (
            'Please complete security verification'
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      {/* Alternative contact methods */}
      <div className="mt-8 pt-6 border-t border-gray-600">
        <p className="text-center text-gray-400 text-sm mb-4">Or reach out directly:</p>
        <div className="flex justify-center gap-6">
          <a 
            href="mailto:kperp@example.com" 
            className="text-cyan-300 hover:text-cyan-200 hover:underline transition"
          >
            Email
          </a>
          <a 
            href="https://github.com/kperp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-300 hover:text-cyan-200 hover:underline transition"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/kperp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-cyan-300 hover:text-cyan-200 hover:underline transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
