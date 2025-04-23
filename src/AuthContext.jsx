import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [access, setAccess] = useState(localStorage.getItem("accessToken"));
  const [refresh, setRefresh] = useState(localStorage.getItem("refreshToken"));
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (access) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [access]);

  useEffect(() => {
    const reqId = axios.interceptors.request.use((config) => {
      if (access) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${access}`;
      }
      return config;
    });
    setInitialized(true);
    return () => axios.interceptors.request.eject(reqId);
  }, [access]);

  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const orig = err.config;
        if (err.response?.status === 401 && !orig._retry && refresh) {
          orig._retry = true;
          try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, { refresh });
            localStorage.setItem("accessToken", data.access);
            setAccess(data.access);
            if (data.refresh) {
              localStorage.setItem("refreshToken", data.refresh);
              setRefresh(data.refresh);
            }
            orig.headers.Authorization = `Bearer ${data.access}`;
            return axios(orig);
          } catch (e) {
            logout();
            return Promise.reject(e);
          }
        }
        return Promise.reject(err);
      }
    );
    return () => axios.interceptors.response.eject(id);
  }, [refresh]);

  const login = async ({ username, password }) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/token/`, { username, password });
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    setAccess(data.access);
    setRefresh(data.refresh);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccess(null);
    setRefresh(null);
  };

  return (
    <AuthContext.Provider value={{ access, refresh, initialized, login, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
