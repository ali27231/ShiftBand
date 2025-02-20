import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  const TEST_USERS = [
    {
      username: "admin",
      password: "admin27231",
      name: "مدیر سیستم",
      email: "admin@example.com",
      phone: "09121234567",
      department: "IT",
      specialization: "مدیریت سیستم",
      personalCode: "100001",
      role: "admin",
      permissions: ["manage_users", "manage_shifts", "view_reports", "manage_system"]
    },
    {
      username: "Ali_Mashhadi",
      password: "2723101386",
      name: "علی مشهدی",
      email: "mashhadia640@gmail.com",
      phone: "09195379488",
      department: "IT",
      specialization: "مدیریت سیستم",
      personalCode: "27231",
      role: "admin",
      permissions: ["manage_users", "manage_shifts", "view_reports", "manage_system"]
    },
    {
      username: "hajrezvan",
      password: "hajrezvan",
      name: "Haj Rezvan",
      email: "Haj.Rezvan@salman27.com",
      phone: "09376226180",
      department: "IT",
      specialization: "مدیریت سیستم",
      personalCode: "100001",
      role: "admin",
      permissions: ["manage_users", "manage_shifts", "view_reports", "manage_system"]
    },
    {
      username: "user",
      password: "user272",
      name: "کاربر عادی",
      email: "user@salman27.com",
      phone: "",
      department: "",
      specialization: "",
      personalCode: "",
      role: "doctor",
      permissions: ["view_shifts", "edit_profile"]
    },
    {
      username: "test",
      password: "test123",
      name: "دکتر علی رضایی",
      email: "Dr.Ali.Rezaeei@gmail.com",
      phone: "091256680635",
      department: "داخلی",
      specialization: "متخصص داخلی",
      personalCode: "200682",
      role: "doctor",
      permissions: ["view_shifts", "manage_own_shifts", "view_patients"]
    }
  ];

  const register = async (formData) => {
    try {
      // بررسی تکراری نبودن نام کاربری
      const isUsernameTaken = TEST_USERS.some(user =>
          user.username.toLowerCase() === formData.username.toLowerCase()
      );

      if (isUsernameTaken) {
        throw new Error('این نام کاربری قبلاً ثبت شده است');
      }

      // بررسی تکراری نبودن ایمیل
      const isEmailTaken = TEST_USERS.some(user =>
          user.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (isEmailTaken) {
        throw new Error('این ایمیل قبلاً ثبت شده است');
      }

      // ساخت کاربر جدید
      const newUser = {
        username: formData.username,
        password: formData.password,
        name: formData.fullName,
        email: formData.email,
        phone: "",
        department: "",
        specialization: "",
        personalCode: String(Date.now()).slice(-6),
        role: "doctor",
        permissions: ["view_shifts", "edit_profile"],
        isTestUser: true,
        isLoggedIn: true
      };

      // در حالت واقعی:
      // const response = await axios.post('YOUR_API_ENDPOINT/register', formData);
      // const newUser = response.data;

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      TEST_USERS.push(newUser);

      navigate('/dashboard');
      return newUser;

    } catch (error) {
      throw new Error(error.message || 'خطا در ثبت‌نام');
    }
  };

  const login = async (credentials) => {
    try {
      const testUser = TEST_USERS.find(user =>
          user.username === credentials.username && user.password === credentials.password
      );

      if (testUser) {
        const userData = {
          ...testUser,
          isLoggedIn: true,
          isTestUser: true
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        switch (userData.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'doctor':
            navigate('/dashboard');
            break;
          case 'user':
            navigate('/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
        return;
      }

      const response = await axios.post('YOUR_API_ENDPOINT/login', credentials);
      const userData = {
        ...response.data,
        isLoggedIn: true,
        isTestUser: false
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      switch (userData.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        default:
          navigate('/dashboard');
      }

    } catch (error) {
      throw new Error(error.response?.data?.message || 'خطا در ورود به سیستم');
    }
  };

  const logout = () => {
    if (user && !user.isTestUser) {
      try {
        axios.post('YOUR_API_ENDPOINT/logout');
      } catch (error) {
        console.error('خطا در خروج از سیستم:', error);
      }
    }

    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const resetPassword = async (email) => {
    try {
      const userExists = TEST_USERS.some(user => user.email.toLowerCase() === email.toLowerCase());

      if (!userExists) {
        throw new Error('ایمیل وارد شده در سیستم ثبت نشده است');
      }

      // در حالت واقعی:
      // await axios.post('YOUR_API_ENDPOINT/reset-password', { email });

      return true;
    } catch (error) {
      throw new Error(error.message || 'خطا در بازیابی رمز عبور');
    }
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  return (
      <AuthContext.Provider value={{
        user,
        login,
        logout,
        register,
        resetPassword,
        hasPermission,
        hasRole,
        isAdmin: user?.role === 'admin',
        isDoctor: user?.role === 'doctor',
        isUser: user?.role === 'user'
      }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;