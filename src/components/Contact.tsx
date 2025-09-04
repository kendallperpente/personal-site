'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      title: 'Email',
      description: 'Send me a direct message',
      value: 'kendall@example.com',
      link: 'mailto:kendall@example.com'
    },
    {
      title: 'LinkedIn',
      description: 'Connect professionally',
      value: 'kendall-perpente',
      link: 'https://www.linkedin.com/in/kendall-perpente-b76453381/'
    },
    {
      title: 'GitHub',
      description: 'Check out my code',
      value: 'kendallperpente',
      link: 'https://github.com/kendallperpente'
    }
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-sage-50 to-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/70 backdrop-blur-sm border border-sage-100 rounded-2xl p-12">
            <div className="w-16 h-16 bg-sage-600 rounded-full mx-auto mb-6"></div>
            <h2 className="text-3xl font-bold text-sage-800 mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-sage-600 mb-8">
              Your message has been sent successfully. I'll get back to you as soon as possible!
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-3 bg-sage-600 text-cream-50 rounded-full font-semibold hover:bg-sage-700 transition-all duration-300"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-48 bg-sage-25">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-40">
          <h2 className="text-4xl sm:text-5xl font-light text-sage-800 mb-8">
            Let's Connect
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-24 items-start justify-between max-w-5xl mx-auto">
          <div className="flex-1 space-y-12 max-w-lg">
            <div className="space-y-8 text-lg text-sage-600 leading-relaxed font-light">
              <p>
                I'm always interested in new opportunities and interesting projects. 
                Let's discuss how we can work together.
              </p>
            </div>
            
            <div className="space-y-8">
              {contactMethods.map((method) => (
                <div key={method.title} className="space-y-2">
                  <h4 className="text-lg font-light text-sage-700">{method.title}</h4>
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sage-500 hover:text-sage-700 font-light transition-colors duration-300"
                  >
                    {method.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-8">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-0 py-6 border-0 border-b border-sage-200 bg-transparent text-sage-800 placeholder-sage-400 focus:border-sage-600 focus:outline-none font-light"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-0 py-4 border-0 border-b border-sage-200 bg-transparent text-sage-800 placeholder-sage-400 focus:border-sage-600 focus:outline-none font-light"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-0 py-4 border-0 border-b border-sage-200 bg-transparent text-sage-800 placeholder-sage-400 focus:border-sage-600 focus:outline-none font-light"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={6}
                    className="w-full px-0 py-4 border-0 border-b border-sage-200 bg-transparent text-sage-800 placeholder-sage-400 focus:border-sage-600 focus:outline-none resize-none font-light"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 border border-sage-600 text-sage-600 font-light hover:bg-sage-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
