import React, { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
import "react-toastify/dist/ReactToastify.css";
import LoaderPage from "./pages/LoaderPage";
import PatientRecords from "./components/patientRecords/PatientRecords";
const ProtectedRoutes = lazy(() => import("./components/ProptecteRoute"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div>
      <LoaderPage />
      <ScrollToTop />
      <Suspense>
        <Routes>
          <Route path="/policlinicos/:id">
            <Route path="login" element={<Login />} />
            <Route path="registros-paciente" element={<PatientRecords />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="home" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
