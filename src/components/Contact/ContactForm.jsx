// src/components/ContactUs/ContactForm.jsx

import React from 'react';
import { REQUIREMENT_OPTIONS, BUDGET_RANGES } from '../../utils/constants';

const ContactForm = ({ 
  formData, 
  onInputChange, 
  onSubmit, 
  isSubmitting, 
  isSubmitted, 
  submitError, 
  consentChecked, 
  onConsentChange,
  formRef,
  titleRef,
  subtitleRef
}) => (
  <div className="flex items-center justify-center py-20 sm:py-20 lg:py-40 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-7xl bg-gradient-to-br from-slate-50 to-slate-50 rounded-sm shadow-2xl overflow-hidden relative">
      
      {/* Header */}
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

      {/* Form Content */}
      <div className="px-4 sm:px-8 pb-8 sm:pb-12 relative z-10">
        <div ref={formRef} className="space-y-6 sm:space-y-8">
          
          {/* Error Message */}
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">
              {submitError}
            </div>
          )}

          {/* Name and Email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="name"
              placeholder="NAME AND SURNAME"
              value={formData.name}
              onChange={onInputChange}
              className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-MAIL"
              value={formData.email}
              onChange={onInputChange}
              className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
              required
            />
          </div>

          {/* Company and Country */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="company"
              placeholder="COMPANY"
              value={formData.company}
              onChange={onInputChange}
              className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="COUNTRY"
              value={formData.country}
              onChange={onInputChange}
              className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 text-xs sm:text-sm font-medium tracking-widest uppercase"
              required
            />
          </div>

          {/* Requirement Dropdown */}
          <div className="relative">
            <select
              name="requirement"
              value={formData.requirement}
              onChange={onInputChange}
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
              {REQUIREMENT_OPTIONS.map((option) => (
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
              onChange={onInputChange}
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
              {BUDGET_RANGES.map((budget) => (
                <option key={budget} value={budget} className="bg-slate-50 text-slate-800 py-2">
                  {budget}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder="DESCRIBE THE PROJECT"
            value={formData.message}
            onChange={onInputChange}
            rows="4"
            className="w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 border-slate-400 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-slate-700 transition-all duration-300 resize-none text-xs sm:text-sm font-medium tracking-widest uppercase"
            required
          />

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3 pt-2 sm:pt-4">
            <div className="relative mt-1">
              <input
                type="checkbox"
                id="consent"
                checked={consentChecked}
                onChange={onConsentChange}
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
              onClick={onSubmit}
              className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-sm font-medium text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ${
                !consentChecked || isSubmitting || isSubmitted
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 text-white hover:bg-slate-900 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {isSubmitting ? 'SENDING...' : isSubmitted ? 'REQUEST SENT!' : 'SEND THE REQUEST'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactForm;