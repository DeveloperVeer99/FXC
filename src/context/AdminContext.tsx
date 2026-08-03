import React, { createContext, useContext, useState, useEffect } from 'react';

interface EditableItem {
  type: 'banner' | 'course' | 'curriculum' | 'hero' | 'stats' | 'testimonials' | 'community' | 'ecosystem' | 'mentorship' | 'footer';
  data: any;
}

interface AdminContextType {
  isAdminMode: boolean;
  setIsAdminMode: (value: boolean) => void;
  editingItem: EditableItem | null;
  setEditingItem: (item: EditableItem | null) => void;
  isEditing: boolean;
  dataSaved: number; // Timestamp when data was last saved
  triggerDataRefresh: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSaved, setDataSaved] = useState(0);

  useEffect(() => {
    setIsEditing(editingItem !== null);
  }, [editingItem]);

  // Reset editing when admin mode turns off
  useEffect(() => {
    if (!isAdminMode) {
      setEditingItem(null);
    }
  }, [isAdminMode]);

  const triggerDataRefresh = () => {
    setDataSaved(Date.now());
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminMode,
        setIsAdminMode,
        editingItem,
        setEditingItem,
        isEditing,
        dataSaved,
        triggerDataRefresh,
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
