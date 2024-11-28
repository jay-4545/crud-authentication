import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import Layout from "./layout/main/Layout";
import AddUpdateCategoriesForm from "./pages/admin/AddUpdateCategoriesForm";
import CategoryList from "./pages/admin/CategoryList";
import Home from "./pages/main/Home";
import SignIn from "./pages/main/SignIn";
import SignUp from "./pages/main/SignUp";
import VerifyEmail from "./pages/main/VerifyEmail";
import store from "./redux/store";
import AuthGaurdAdmin from "./gaurd/AuthGaurdAdmin";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="verifyEmail" element={<VerifyEmail />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AuthGaurdAdmin>
                <LayoutAdmin />
              </AuthGaurdAdmin>
            }
          >
            <Route path="categories" element={<CategoryList />} />
            <Route
              path="categories/:id"
              element={<AddUpdateCategoriesForm />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
