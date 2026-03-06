import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth, firebaseReady } from "../services/firebase";

const AuthContext = createContext();

const mockSessionKey = "mockAuthSession";

const getMockUser = () => {
  const raw = localStorage.getItem(mockSessionKey);
  return raw ? JSON.parse(raw) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!firebaseReady || !firebaseAuth) {
      setUser(getMockUser());
      setAuthReady(true);
      return;
    }

    const unsub = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const signup = async (email, password) => {
    setError("");
    if (!firebaseReady || !firebaseAuth) {
      const mockUser = { uid: "mock-user", email };
      localStorage.setItem(mockSessionKey, JSON.stringify(mockUser));
      setUser(mockUser);
      return;
    }
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const login = async (email, password) => {
    setError("");
    if (!firebaseReady || !firebaseAuth) {
      const mockUser = { uid: "mock-user", email };
      localStorage.setItem(mockSessionKey, JSON.stringify(mockUser));
      setUser(mockUser);
      return;
    }
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logout = async () => {
    setError("");
    if (!firebaseReady || !firebaseAuth) {
      localStorage.removeItem(mockSessionKey);
      setUser(null);
      return;
    }
    await signOut(firebaseAuth);
  };

  const value = useMemo(
    () => ({
      user,
      authReady,
      login,
      signup,
      logout,
      error,
      firebaseReady,
    }),
    [user, authReady, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
