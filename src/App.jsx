import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Header } from "./components/Header";
import { Content } from "./components/Content";
import Spinner from "./components/Spinner";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fetchUser = () => axios.get(`${API_URL}/users/me/`).then((r) => r.data.user);
const fetchRepos = () => axios.get(`${API_URL}/repos/`).then((r) => r.data.user_repos);
const fetchCommits = () => axios.get(`${API_URL}/commits/`).then((r) => r.data.user_commits);

function App() {
  const { access, initialized, logout } = useAuth();
  const isAuth = !!access;

  const ready = !!access && initialized;

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: ready,
  });

  const reposQuery = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
    enabled: ready,
  });

  const commitsQuery = useQuery({
    queryKey: ["commits"],
    queryFn: fetchCommits,
    enabled: ready,
  });

  const isLoading = isAuth && (!initialized || userQuery.isLoading || reposQuery.isLoading || commitsQuery.isLoading);

  const loadingTexts = [
    "oh god how did this get here i am not good with computer",
    "has anyone really been far even as decided to use even go want to do look more like?",
    "why do they call it oven when you of in the cold food of out hot eat the food",
    "they don't think it be like it is, but it do",
    "the missile knows where it is at all times. it knows this because it knows where it isn't",
  ];

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % loadingTexts.length), 3000);
    return () => clearInterval(t);
  }, [isLoading]);

  if (!isAuth) {
    return (
      <BrowserRouter>
        <Header></Header>
      </BrowserRouter>
    );
  }

  if (isLoading) {
    return <Spinner text={loadingTexts[idx]} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Header
          API_URL={API_URL}
          onLogout={logout}
          username={userQuery.data.username}
          repos={reposQuery.data}
          commits={commitsQuery.data}
        />
        <Content API_URL={API_URL} repos={reposQuery.data} commits={reposQuery.data} />
      </BrowserRouter>
    </div>
  );
}

export default App;
