import { ReactNode, createContext, useContext, useState } from "react";
import { AuthTypes } from "../Types/AuthTypes";

// Define a type for your context
type AuthContextType = {
  user: AuthTypes | null;
  setUser: React.Dispatch<React.SetStateAction<AuthTypes | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthTypes | null>(null);
  const [loading, setLoading] = useState(true);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
