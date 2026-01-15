// src/components/ContactUs/OfficeInfo.jsx

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../../utils/constants';

const OfficeInfo = ({ officeRef }) => (
  <div ref={officeRef} className="relative py-12 sm:py-16 lg:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-16 items-start">
        
        {/* Office Image */}
        <div className="relative group">
          <div className="overflow-hidden rounded-sm shadow-2xl">
            <div className="aspect-[3/4] bg-white relative">
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="text-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-4 text-slate-400">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-slate-600 font-light text-xs sm:text-sm lg:text-lg tracking-wide">OUR OFFICE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Information */}
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
                {COMPANY_INFO.name}
              </h3>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light leading-relaxed tracking-wide">
                  {COMPANY_INFO.address.line1}<br />
                  {COMPANY_INFO.address.line2}<br />
                  {COMPANY_INFO.address.line3}<br />
                  {COMPANY_INFO.address.line4}
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start space-x-2 sm:space-x-3 lg:space-x-4">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-xs sm:text-xs lg:text-sm font-medium tracking-wider uppercase mb-1">
                  Business Hours
                </p>
                <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light tracking-wide">
                  {COMPANY_INFO.hours.weekday}<br />
                  {COMPANY_INFO.hours.weekend}
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
              
              {/* Phone */}
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs sm:text-xs lg:text-sm font-medium tracking-wider uppercase">
                    Phone
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light tracking-wide">
                    {COMPANY_INFO.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs sm:text-xs lg:text-sm font-medium tracking-wider uppercase">
                    Email
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm lg:text-lg font-light tracking-wide">
                    {COMPANY_INFO.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OfficeInfo;