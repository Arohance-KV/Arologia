// src/components/ContactUs/index.jsx

import React, { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ContactForm from "../components/Contact/ContactForm";
import OfficeInfo from "../components/Contact/OfficeInfo";
import { useFormHandler, useAnimations } from "../hooks/useContactForm";
import { EMAILJS_CONFIG } from "../utils/constants";

const ContactUsPage = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const officeRef = useRef(null);

  // Get form state and handlers
  const {
    formData,
    isSubmitted,
    isSubmitting,
    submitError,
    consentChecked,
    handleInputChange,
    handleSubmit,
    setConsentChecked
  } = useFormHandler();

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  // Handle animations
  useAnimations({ titleRef, subtitleRef, formRef, officeRef });

  return (
    <div className="min-h-screen bg-black">
      <form onSubmit={handleSubmit}>
        <ContactForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          submitError={submitError}
          consentChecked={consentChecked}
          onConsentChange={(e) => setConsentChecked(e.target.checked)}
          formRef={formRef}
          titleRef={titleRef}
          subtitleRef={subtitleRef}
        />
      </form>
      <OfficeInfo officeRef={officeRef} />
    </div>
  );
};

export default ContactUsPage;