import React from 'react';
import { Edit2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface EditableWrapperProps {
  type: 'banner' | 'course' | 'curriculum' | 'section';
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
        onClick={() => onEdit(data)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 inline-flex items-center gap-1 rounded-md bg-violet-600/80 hover:bg-violet-600 px-2 py-1.5 text-xs font-semibold text-white"
        title="Edit this section"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
};
