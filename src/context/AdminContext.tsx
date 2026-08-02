import React, { createContext, useContext, useState } from 'react';

interface EditableItem {
  type: 'banner' | 'course' | 'curriculum' | 'section';
  id?: string;
  data: any;
}

interface AdminContextType {
  isAdminMode: boolean;
  setIsAdminMode: (value: boolean) => void;
  editingItem: EditableItem | null;
  setEditingItem: (item: EditableItem | null) => void;
  isEditing: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Update isEditing when editingItem changes
  React.useEffect(() => {
    setIsEditing(editingItem !== null);
  }, [editingItem]);

  return (
    <AdminContext.Provider
      value={{
        isAdminMode,
        setIsAdminMode,
        editingItem,
        setEditingItem,
        isEditing,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
