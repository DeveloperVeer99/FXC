import React from 'react';
import { Edit2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface EditableWrapperProps {
  type: 'banner' | 'course' | 'curriculum' | 'hero' | 'stats' | 'testimonials' | 'community' | 'ecosystem' | 'mentorship' | 'footer';
  data: any;
  onEdit: (data: any) => void;
  children: React.ReactNode;
}

export const EditableWrapper: React.FC<EditableWrapperProps> = ({
  data,
  onEdit,
  children,
}) => {
  const { isAdminMode } = useAdmin();

  if (!isAdminMode) {
    return <>{children}</>;
  }

  return (
    <div className="relative group">
      {children}
      <button
        type="button"
        onClick={() => onEdit(data)}
        className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-md bg-violet-600 hover:bg-violet-500 px-2 py-1.5 text-xs font-semibold text-white transition-all opacity-100 group-hover:opacity-100"
        title="Edit this section"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
};
