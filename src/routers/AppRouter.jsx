import { Navigate, Route, Routes } from "react-router-dom";
import { CheckingAuth } from "../UI/components/CheckingAuth";
import { HomeRouter } from "../Journal/router/HomeRouter";
import { AuthRouter } from "../Auth/router/AuthRouter";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {/* login y registro */}
      {status === "authenticated" ? (
        <Route path="/*" element={<HomeRouter />} />
      ) : (
        <Route path="/auth/*" element={<AuthRouter />} />
      )}

      <Route path="*" element={<Navigate to="/auth/login" />} />

      {/* <Route path='/auth/*' element={ <AuthRouter/> } /> */}

      {/* app */}
      {/* // <Route path='/*' element={ <HomeRouter/> } /> */}
    </Routes>
  );
};
