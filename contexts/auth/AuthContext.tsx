import { PropsWithChildren, createContext } from "react";
import useAsyncStorageState from "@/hooks/useAsyncStorageState";
import useLog from "@/hooks/useConsoleLog";

type User = {
  username: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  profilePicture: string;
  notify: {
    orders: boolean;
    password: boolean;
    offers: boolean;
    newsletters: boolean;
  };
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  updateUserField: (field: keyof User, value: string) => void;
  changeUser: (user: User) => void;
  login: (user: User, callback?: () => void) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type AuthProviderProps = PropsWithChildren<{}>;
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser, loading] = useAsyncStorageState({
    key: "user",
    initialValue: null as User | null,
  });

  useLog(user);

  function login(user: User, callback?: () => void) {
    setUser(user);
    if (callback) callback();
  }

  const changeUser = (user: User) => {
    setUser(user);
  };

  const updateUserField = (field: keyof User, value: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout, changeUser, updateUserField }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
