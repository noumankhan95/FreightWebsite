import React, { Suspense, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SIdeBar";
import { Oval } from "react-loader-spinner";
import Contacts from "./Pages/Contacts";
import InvoicePdf from "./Components/InvoicePdf";
import useUser from "./store/User";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
const CreateJob = React.lazy(() => import("./Pages/CreateJob"));
const JobDetail = React.lazy(() => import("./Pages/JobDetail"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Authenticate = React.lazy(() => import("./Pages/Authenticate"));
const GenerateInvoice = React.lazy(() => import("./Pages/GenerateInvoice"));

function App() {
  const { isloggedIn, AuthStateLogIn } = useUser();
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    setisloading((p) => true);
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        AuthStateLogIn();
      } else {
        // User is signed out
        // ...
      }
      setisloading((p) => false);
    });
    return () => sub();
  }, []);
  if (isloading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#0000FF"
          secondaryColor="#0000FF"
          ariaLabel="oval-loading"
        />
      </div>
    );
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#0000FF"
              secondaryColor="#0000FF"
              ariaLabel="oval-loading"
            />
          </div>
        }
      >
        {isloggedIn ? (
          <div>
            <Header />
            <div className="flex">
              <SideBar />
              <Routes>
                <Route path="/home" Component={CreateJob} />
                <Route path="/" Component={Dashboard} />
                <Route path="/jobDetail/:id" Component={JobDetail} />
                <Route path="/jobDetail/:id" Component={JobDetail} />
                <Route path="/generateInvoice" Component={GenerateInvoice} />
                <Route path="/manageContacts" Component={Contacts} />
                <Route path="/invoicePdf" Component={InvoicePdf} />

                <Route path="*" Component={NotFound} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/auth" Component={Authenticate} />
            <Route path="*" Component={Authenticate} />
          </Routes>
        )}
      </Suspense>
    </div>
  );
}

export default App;
