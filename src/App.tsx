import AppRouter from "./routes/AppRouter";
import Layout from "./components/Layout/Layout";
import GitHubApi from "./api/gitHub";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";
import { restoreUser } from "./modules/auth/actionCreators";

export const githubApi = new GitHubApi()

export default function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(restoreUser());
  }, []);

  return <Layout>
    <AppRouter />
  </Layout>;
}