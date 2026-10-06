import React from 'react';
import { ServiceType } from '../types';
import { InquiryForm } from './InquiryForm';
import { X } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceRequired?: ServiceType;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  serviceRequired = 'ETP Plant Setup'
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-fadeIn"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-['Manrope'] leading-tight">
              Business Inquiry
            </h3>
            <p className="text-xs text-slate-400">
              Direct dispatch to Manya Enterprise mailbox
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
          <InquiryForm 
            initialService={serviceRequired}
            formIdPrefix="modal-inquiry"
            compact={true}
          />
        </div>
      </div>
    </div>
  );
};
