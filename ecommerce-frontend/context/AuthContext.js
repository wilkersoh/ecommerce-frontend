import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";

let magic;
const AuthContext = createContext();

export const AuthProvider = (props) => {
  const auth = useAuthProvider();

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

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });

        // Just for testing
        const token = await getToken();
        console.log(token);
      }
    } catch (error) {}
  };

  /**
   * Retrieves the Magic Issues Bearer Token
   * This allows User to make authenticated requests
   * Do this after backend install strapi-plugin-magic and following step(add permission file)
   * This JWT Token only valid for 15min
   */
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (error) {}
  };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    checkUserLoggedIn();
  }, []);

  /**
   * Adds email to user
   * @param {string} email
   */
  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
    } catch (error) {
      setUser(null);
    }

    router.push("/");
  };

  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
    } catch (error) {}

    router.push("/");
  };

  return {
    user,
    setUser,
    loginUser,
    logoutUser,
    getToken,
  };
};

export default AuthContext;
