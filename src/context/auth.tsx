import React, { ReactNode, useContext, useEffect, useState } from "react";
import apiClient from "../lib/apiClient";
import { useRouter } from "next/router";

interface AuthContextType {
  user: null | {
    id: number;
    email: string;
    username: string;
  };
  // 引数はstring型のtokenをとり、引数は何も返さないからvoid型
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ログインログアウトの情報はアプリケーション全体で使いたいのでcontextでセットして全体で使えるようにする
const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    email: string;
    username: string;
  }>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      // AuthProviderが使われる時に発火する。tokenをバックエンド側でも使えるように.
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

      apiClient
        .get("/users/find")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    try {
      apiClient.get("/users/find").then((res) => {
        setUser(res.data.user);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    const isConfirmed = window.confirm("本当にログアウトしますか？");
    if (isConfirmed) {
      // ログアウト処理を実行
      localStorage.removeItem("auth_token");
      delete apiClient.defaults.headers["Authorization"];
      setUser(null);
      router.push("/login");
    } else {
      // キャンセル時の処理
      return;
    }
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
