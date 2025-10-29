import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import bengaluru from '/bengaluru.png';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    requirement: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const starRef = useRef(null);
  const officeRef = useRef(null);

  // Initialize EmailJS
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('i5ylVdzUgbJzKMfwj');
  }, []);

  useEffect(() => {
    const formContainer = formRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const star = starRef.current;
    const office = officeRef.current;

    const elements = [title, subtitle, star, ...(formContainer?.children || []), office];

    elements.forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
      }
    });

    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.style.transition = 'all 0.8s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0px)';
        }, index * 100);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous error when user starts typing
    if (submitError) {
      setSubmitError('');
    }
  };

  const requirementOptions = [
    'Website Development',
    'Mobile Application',
    'Desktop Application',
    'E-commerce Solution',
    'Custom Software Development',
    'UI/UX Design',
    'Digital Marketing',
    'Consultation',
    'Other'
  ];

  const budgetRanges = [
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    '₹10,00,000 - ₹25,00,000',
    '₹25,00,000+'
  ];

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'company', 'country', 'requirement', 'budget', 'message'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
      setSubmitError('Please fill in all required fields.');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address.');
      return false;
    }

    if (!consentChecked) {
      setSubmitError('Please consent to data processing.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        country: formData.country,
        requirement: formData.requirement,
        budget: formData.budget,
        message: formData.message,
        to_name: 'AROHANCE TECH Solutions', // Your company name
        reply_to: formData.email
      };

      // Send email using EmailJS
      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS dashboard
      const response = await emailjs.send(
        'service_0ug743a', // Replace with your EmailJS service ID
        'template_bcxgx83', // Replace with your EmailJS template ID
        templateParams
      );

      console.log('Email sent successfully:', response);
      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          country: '',
          requirement: '',
          budget: '',
          message: ''
        });
        setConsentChecked(false);
      }, 3000);

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Contact Form Section */}
      <div className="flex items-center justify-center py-20 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl bg-gradient-to-br from-slate-50 to-slate-50 rounded-sm shadow-2xl overflow-hidden relative">
          {/* Header Section */}
          <div className="text-center py-8 sm:py-12 px-4 sm:px-8 relative">
            <h1 
              ref={titleRef} 
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-800 mb-4 tracking-wide"
            >
              CONTACT US
            </h1>
            <p 
              ref={subtitleRef} 
              className="text-slate-600 text-base sm:text-lg font-light max-w-md mx-auto px-4"
            >
              Fill the form and you will be recontacted by the structure.
            </p>
          </div>

          {/* Form Section */}
          <div className="px-4 sm:px-8 pb-8 sm:pb-12 relative z-10">
            <form ref={formRef} className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">
                  {submitError}
                </div>
              )}

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="NAME AND SURNAME"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-MAIL"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
                    required
                  />
                </div>
              </div>

              {/* Company and Country Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="COMPANY"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="country"
                    placeholder="COUNTRY"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
                    required
                  />
                </div>
              </div>

              {/* Requirement Dropdown */}
              <div className="relative">
                <select
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 focus:outline-none focus:border-slate-700 transition-all duration-300 appearance-none cursor-pointer text-xs sm:text-sm font-medium tracking-widest uppercase relative z-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0 center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                  required
                >
                  <option value="" disabled className="bg-slate-50 text-slate-500">
                    CHOOSE YOUR REQUIREMENT
                  </option>
                  {requirementOptions.map((option) => (
                    <option key={option} value={option} className="bg-slate-50 text-slate-800 py-2">
                      {option.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Range Dropdown */}
              <div className="relative">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 focus:outline-none focus:border-slate-700 transition-all duration-300 appearance-none cursor-pointer text-xs sm:text-sm font-medium tracking-widest uppercase relative z-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0 center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                  required
                >
                  <option value="" disabled className="bg-slate-50 text-slate-500">
                    SELECT BUDGET RANGE
                  </option>
                  {budgetRanges.map((budget) => (
                    <option key={budget} value={budget} className="bg-slate-50 text-slate-800 py-2">
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <textarea
                  name="message"
                  placeholder="DESCRIBE THE PROJECT"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 resize-none text-xs sm:text-sm font-medium tracking-widest uppercase"
                  required
                />
              </div>

              {/* Privacy Consent */}
              <div className="flex items-start space-x-3 pt-2 sm:pt-4">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="w-4 h-4 text-slate-700 bg-transparent border-2 border-slate-400 rounded-sm focus:ring-slate-700 focus:ring-2"
                  />
                </div>
                <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed tracking-wide">
                  I confirm that I have read the notice and consent to the processing of my data.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6">
                <button
                  type="submit"
                  disabled={!consentChecked || isSubmitting || isSubmitted}
                  className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-sm font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ${
                    !consentChecked || isSubmitting || isSubmitted
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 text-white hover:bg-slate-900 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting 
                    ? 'SENDING...' 
                    : isSubmitted 
                    ? 'REQUEST SENT!' 
                    : 'SEND THE REQUEST'
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Office Information Section */}
      <div ref={officeRef} className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-16 items-start">
            {/* Left Side - Office Image */}
            <div className="relative group">
              <div className="overflow-hidden rounded-sm shadow-2xl">
                <div className="aspect-[3/4] bg-white relative">
                  <img
                    src={bengaluru}
                    alt="Our Office"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)';
                      e.target.parentNode.innerHTML = `
                        <div class="flex items-center justify-center h-full">
                          <div class="text-center">
                            <div class="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-4 text-slate-400">
                              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <p class="text-slate-600 font-light text-xs sm:text-sm lg:text-lg tracking-wide">OUR OFFICE</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Contact Information */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-8">
              <div>
                <h2 className="text-lg sm:text-2xl lg:text-4xl xl:text-6xl font-light text-white mb-2 sm:mb-4 lg:mb-6 tracking-wide leading-tight">
                  VISIT OUR <br />
                  <span className="text-sm sm:text-xl lg:text-3xl xl:text-5xl">OFFICE</span>
                </h2>
              </div>

              <div className="space-y-2 sm:space-y-3 lg:space-y-6">
                {/* Company Name */}
                <div className="border-b border-slate-700 pb-2 sm:pb-3 lg:pb-4">
                  <h3 className="text-xs sm:text-lg lg:text-2xl font-light text-white tracking-wide mb-1 sm:mb-2">
                    AROHANCE TECH Solutions Pvt Ltd
                  </h3>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light leading-relaxed tracking-wide">
                      Block A, 4th Floor,<br />
                      Tech Park Complex,<br />
                      Whitefield Road,<br />
                      Bangalore - 560066, Karnataka, India
                    </p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-xs sm:text-xs lg:text-sm font-medium tracking-wider uppercase mb-1">
                      Business Hours
                    </p>
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light tracking-wide">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs sm:text-xs lg:text-sm font-medium tracking-wider uppercase">
                        Phone
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light tracking-wide">
                        +91 80 4577 4508
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs sm:text-xs lg:text-sm font-medium tracking-wider uppercase">
                        Email
                      </p>
                      <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light tracking-wide">
                        info@techcorpsolutions.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;