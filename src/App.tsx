import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminProvider } from "@/context/AdminContext";
import { EditModal } from "@/components/EditModal";
import { useAdmin } from "@/context/AdminContext";
import { authAPI } from "@/services/api";

const AppContent: React.FC<{ isAdminLoggedIn: boolean; setIsAdminLoggedIn: (value: boolean) => void; onAdminClick: () => void; onLogout: () => void }> = ({ isAdminLoggedIn, setIsAdminLoggedIn, onAdminClick, onLogout }) => {
  const { editingItem, setEditingItem, setIsAdminMode } = useAdmin();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    setIsAdminMode(isAdminLoggedIn);
  }, [isAdminLoggedIn, setIsAdminMode]);

  const handleLogout = () => {
    onLogout();
    setIsAdminLoggedIn(false);
  };

  return (
    <>
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          onAdminClick();
        }}
      />
      <EditModal
        isOpen={editingItem !== null}
        onClose={() => setEditingItem(null)}
        itemType={editingItem?.type || null}
        itemData={editingItem?.data}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout 
              onAdminClick={() => setShowAdminLogin(true)} 
              isAdminLoggedIn={isAdminLoggedIn}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authAPI.verify();
        if (response.data.valid) {
          setIsAdminLoggedIn(true);
        }
      } catch (error) {
        setIsAdminLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <AdminProvider>
        <AppContent
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          onAdminClick={() => setIsAdminLoggedIn(true)}
          onLogout={() => {
            setIsAdminLoggedIn(false);
            sessionStorage.removeItem('adminToken');
          }}
        />
      </AdminProvider>
    </BrowserRouter>
  );
};

export default App;
