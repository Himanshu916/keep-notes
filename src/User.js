import { useAuth } from "./Contexts/AuthContext";

export default function User() {
  const { state } = useAuth();
  return <>{state.user}</>;
}
