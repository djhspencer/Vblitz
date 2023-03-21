import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useAxios } from "./context/AxiosContext";
import { useEffect, useCallback, useState } from "react";
import { LoginReg } from "./pages/LoginReg";
import ReqAuth from "./components/ReqAuth";


function App() {
  const { updateAuthState, authState } = useAuth();
  const { authAxios } = useAxios();
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(() => {
    const options = {
      method: "GET",
      url: "http://localhost:4000/users/refresh",
      withCredentials: true,
    };

    return authAxios(options)
      .then((response) => {
        const accessToken = response.data.accessToken;
        console.log(accessToken);

        updateAuthState({
          accessToken: accessToken,
          authenticated: true,
        });

        setStatus("success");
      })
      .catch((e) => {
        console.error(e);
        updateAuthState({
          accessToken: null,
          authenticated: false,
        });

        setStatus("error");
      });
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status !== "loading") {
    return (
      <>

        <Box>
          <Routes>
            <Route path="/login" element={<LoginReg />} />
            <Route element={<ReqAuth />}>
            </Route>
          </Routes>
        </Box>

      </>
    );
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default App;

