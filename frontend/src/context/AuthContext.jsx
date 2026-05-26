import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

function readAuth() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    user = null;
  }

  return {
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    user,
  };
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readAuth);

  const refreshAuth = useCallback(() => {
    setAuth(readAuth());
  }, []);

  const saveAuth = useCallback((payload) => {
    localStorage.setItem("token", payload.token || "");
    localStorage.setItem("role", payload.role || "");
    localStorage.setItem("user", JSON.stringify(payload.user || null));
    setAuth(readAuth());
    window.dispatchEvent(new Event("verichain-auth"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setAuth(readAuth());
    window.dispatchEvent(new Event("verichain-auth"));
  }, []);

  useEffect(() => {
    window.addEventListener("storage", refreshAuth);
    window.addEventListener("verichain-auth", refreshAuth);

    return () => {
      window.removeEventListener("storage", refreshAuth);
      window.removeEventListener("verichain-auth", refreshAuth);
    };
  }, [refreshAuth]);

  const value = useMemo(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth.token),
      saveAuth,
      logout,
    }),
    [auth, saveAuth, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
