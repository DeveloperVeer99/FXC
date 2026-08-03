import React, { createContext, useContext, useState, useEffect } from 'react';

type SectionKey = 'banner' | 'hero' | 'stats' | 'ecosystem' | 'curriculum' | 'courses' | 'testimonials' | 'community' | 'mentorship' | 'footer' | 'all';

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
  dataSaved: number;
  sectionSaved: Record<string, number>;
  triggerDataRefresh: (section?: SectionKey) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminModeState] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('isAdminMode') === 'true';
    } catch {
      return false;
    }
  });
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
  const [dataSaved, setDataSaved] = useState(0);
  const [sectionSaved, setSectionSaved] = useState<Record<string, number>>({});

  const setIsAdminMode = (value: boolean) => {
    try {
      if (value) {
        sessionStorage.setItem('isAdminMode', 'true');
      } else {
        sessionStorage.removeItem('isAdminMode');
      }
    } catch {}
    setIsAdminModeState(value);
  };

  useEffect(() => {
    if (!isAdminMode) setEditingItem(null);
  }, [isAdminMode]);

  const triggerDataRefresh = (section?: SectionKey) => {
    const now = Date.now();
    if (!section || section === 'all') {
      setDataSaved(now);
    } else {
      setSectionSaved(prev => ({ ...prev, [section]: now }));
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminMode,
        setIsAdminMode,
        editingItem,
        setEditingItem,
        isEditing: editingItem !== null,
        dataSaved,
        sectionSaved,
        triggerDataRefresh,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
