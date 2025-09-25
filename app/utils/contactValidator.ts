import { ContactFormData, ValidationResult } from '../types/contact';

// Single Responsibility: Validation rules for each field
class ContactValidator {
  private static validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email.length > 254) return 'Email is too long';
    return null;
  }

  private static validateName(name: string): string | null {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 100) return 'Name is too long';
    return null;
  }

  private static validatePhone(phone: string): string | null {
    if (!phone.trim()) return 'Phone number is required';
    const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
    if (phone.length > 20) return 'Phone number is too long';
    return null;
  }

  private static validateDescription(description: string): string | null {
    if (!description.trim()) return 'Description is required';
    if (description.length < 10) return 'Description must be at least 10 characters';
    if (description.length > 1000) return 'Description is too long (max 1000 characters)';
    return null;
  }

  // Open/Closed Principle: Easy to extend with new validation rules
  public static validate(data: ContactFormData): ValidationResult {
    const errors: Record<string, string> = {};

    const nameError = this.validateName(data.name);
    if (nameError) errors.name = nameError;

    const emailError = this.validateEmail(data.email);
    if (emailError) errors.email = emailError;

    const phoneError = this.validatePhone(data.phone);
    if (phoneError) errors.phone = phoneError;

    const descriptionError = this.validateDescription(data.description);
    if (descriptionError) errors.description = descriptionError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default ContactValidator;
