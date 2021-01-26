import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";
import useSWR from "swr";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const auth = useAuthProvider();
  // console.log("auth:", auth);
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useAuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const { data: me } = useSWR(`${API_URL}/users/me`);

  useEffect(() => {
    if (me?.statusCode === 400) return setUser(null);

    setUser(me);
  }, [me]);

  /**
   * @param {Object} user
   */
  const setLoginUser = async (user) => {
    if (!user) setUser(null);
    setUser(user);

    router.push("/");
  };

  const logoutUser = async () => {
    try {
      setUser(null);
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const payload = await res.json();
    } catch (error) {
      // doing popup
      console.log("logout faield");
    }

    router.push("/");
  };

  return {
    user,
    setLoginUser,
    logoutUser,
  };
};

export default AuthContext;
