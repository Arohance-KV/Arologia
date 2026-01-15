// src/components/ContactUs/hooks.js

import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from "../utils/constants";

// Form Handler Hook
export const useFormHandler = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'company', 'country', 'requirement', 'budget', 'message'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
      setSubmitError('Please fill in all required fields.');
      return false;
    }

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
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        country: formData.country,
        requirement: formData.requirement,
        budget: formData.budget,
        message: formData.message,
        to_name: 'AROHANCE TECH Solutions',
        reply_to: formData.email
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      setIsSubmitted(true);

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

  return {
    formData,
    isSubmitted,
    isSubmitting,
    submitError,
    consentChecked,
    handleInputChange,
    handleSubmit,
    setConsentChecked
  };
};

// Animation Hook
export const useAnimations = ({ titleRef, subtitleRef, formRef, officeRef }) => {
  useEffect(() => {
    const formContainer = formRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const office = officeRef.current;

    const elements = [title, subtitle, ...(formContainer?.children || []), office];

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
  }, [titleRef, subtitleRef, formRef, officeRef]);
};