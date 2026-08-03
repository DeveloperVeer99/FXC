import React from 'react';
import { Edit2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface EditableWrapperProps {
  type: 'banner' | 'course' | 'curriculum' | 'hero' | 'stats' | 'testimonials' | 'community' | 'ecosystem' | 'mentorship' | 'footer';
  data: any;
  onEdit: (data: any) => void;
  children: React.ReactNode;
  label?: string;
}

export const EditableWrapper: React.FC<EditableWrapperProps> = ({ data, onEdit, children, label }) => {
  const { isAdminMode } = useAdmin();

  if (!isAdminMode) return <>{children}</>;

  return (
    <div className="relative group/section">
      {children}
      <button
        type="button"
        onClick={() => onEdit(data)}
        className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 rounded-md bg-violet-600 hover:bg-violet-500 px-2.5 py-1.5 text-xs font-semibold text-white transition-all opacity-100 md:opacity-0 md:group-hover/section:opacity-100 shadow-lg"
        title={`Edit ${label || 'section'}`}
      >
        <Edit2 size={12} />
        {label || 'Edit'}
      </button>
    </div>
  );
};
