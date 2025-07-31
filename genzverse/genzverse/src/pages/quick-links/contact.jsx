import React from 'react';
import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mb-10">
      <div className="max-w-lg mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Information
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get in touch with us through the following channels.
          </p>
        </div>
        <div className="mt-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Mail className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:support@genzverse.com" className="hover:underline">
                    support@genzverse.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Linkedin className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">LinkedIn</h3>
                <p className="text-gray-600">
                  <a href="https://www.linkedin.com/company/genzverse" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    linkedin.com/company/genzverse
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Twitter className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Twitter</h3>
                <p className="text-gray-600">
                  <a href="https://twitter.com/genzverse" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    @genzverse
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="h-8 w-8 text-gray-600" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Instagram</h3>
                <p className="text-gray-600">
                  <a href="https://www.instagram.com/genzverse" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    @genzverse
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
