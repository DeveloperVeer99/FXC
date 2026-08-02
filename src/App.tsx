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

const AppContent: React.FC<{ isAdminLoggedIn: boolean; setIsAdminLoggedIn: (value: boolean) => void }> = ({ isAdminLoggedIn, setIsAdminLoggedIn }) => {
  const { editingItem, setEditingItem, setIsAdminMode } = useAdmin();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    setIsAdminMode(isAdminLoggedIn);
  }, [isAdminLoggedIn, setIsAdminMode]);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminLogin(false);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('adminToken');
    setEditingItem(null);
  };

  return (
    <>
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={handleLoginSuccess}
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
        />
      </AdminProvider>
    </BrowserRouter>
  );
};

export default App;
