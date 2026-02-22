import { createContext, useContext, useEffect, useState, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  const notificationTimeoutRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          localStorage.removeItem("user");
          return;
        }

        const snap = await getDoc(doc(db, "usuarios", firebaseUser.uid));

        if (!snap.exists()) {
          setUser(null);
          localStorage.removeItem("user");
          return;
        }

        const userData = {
          uid: firebaseUser.uid,
          ...snap.data()
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

      } catch (error) {
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const showNotification = (type, message, timeout = 3000) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    setNotification({ type, message });

    if (timeout) {
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
      }, timeout);
    }
  };

  const clearNotification = () => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        globalLoading,
        setGlobalLoading,
        notification,
        showNotification,
        clearNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de AppProvider");
  }
  return context;
}
