// Test script to verify contact form and Discord webhook functionality
// This will help debug why submissions aren't reaching the database

import { submitContactForm } from '../app/actions/contactActions.js';

async function testContactForm() {
  console.log('🧪 Testing Contact Form Submission...\n');

  // Create test form data
  const formData = new FormData();
  formData.append('name', 'Test User');
  formData.append('email', 'test@example.com');
  formData.append('phone', '1234567890');
  formData.append('description', 'This is a test submission from the debug script.');
  formData.append('turnstile-token', 'test-token-12345');

  try {
    console.log('📝 Submitting test contact form...');
    const result = await submitContactForm(null, formData);
    
    console.log('✅ Contact form submission result:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('🎉 Contact form submission successful!');
    } else {
      console.log('❌ Contact form submission failed:', result.message);
    }
  } catch (error) {
    console.error('💥 Error during contact form submission:', error);
  }
}

// Run the test
testContactForm();