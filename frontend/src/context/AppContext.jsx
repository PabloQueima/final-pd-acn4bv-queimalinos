import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem("user");
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "usuarios", firebaseUser.uid));

        if (!snap.exists()) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = {
          uid: firebaseUser.uid,
          ...snap.data()
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);

      } catch (err) {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const showNotification = (type, message, timeout = 3000) => {
    setNotification({ type, message });

    if (timeout) {
      setTimeout(() => {
        setNotification(null);
      }, timeout);
    }
  };

  const clearNotification = () => {
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
