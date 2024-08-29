import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import rjlogo from "../assets/rajasthanpolice.jpg";
import { checkLogin } from "../services/api";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // const backgroundStyle = {
  //   backgroundImage: `url(${bg})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  // };

  // const overlayStyle = {
  //   position: "absolute",
  //   top: 64,
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the alpha (last) value to control opacity
  // };
  return (
    <div className="min-h-screen bg-white bg-bgimg bg-center bg-cover px-20 flex items-center justify-between">
      <div className="ml-20">
        <div>
          <img className="h-[20rem]" src={rjlogo} alt="" />
          <h1 className="text-black text-center text-6xl mt-4 font-bold">
            Rajasthan Police
          </h1>
        </div>
      </div>
      <div className="bg-[#f1f1f1] p-8 rounded-lg h-[34rem]  w-[30rem]">
        <div className=" flex flex-col justify-center items-center ">
          <div className="">
            <img className="h-20 " src="" alt="" />
          </div>
          <div className="my-4">
            {/* <span className="">Sign In To</span>
            <span className="font-bold text-lg ml-1 tracking-wide">
              BAD Marketing
            </span> */}
            <h1>
              Sign In To
              <b className="text-lg tracking-wide"> IPC Guardian</b>
            </h1>
          </div>
          <div className="  text-slate-400 font-semibold text-xs ">
            Your Social Campaigns
          </div>
        </div>
        <div className="mt-6">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .required("Required")
                .min(4, "Password must be at least 4 characters"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Assuming checkLogin returns a boolean
                const isLoginSuccessful = checkLogin(values);
                console.log(isLoginSuccessful);

                if (isLoginSuccessful) {
                  setIsLoggedIn(true);
                  // Additional logic or API calls can be added here if needed
                  login(isLoginSuccessful);
                  console.log("Login successful!");
                  navigate("/dashboard");
                } else {
                  console.log("Invalid email or password");
                  // Handle invalid login, e.g., show an error message
                }
              } catch (error) {
                console.error(error);
              } finally {
                setIsLoggedIn(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    className="w-full h-12 p-6 border border-slate-200 bg-transparent rounded"
                    placeholder=" Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mt-4">
                  <Field
                    type="password"
                    name="password"
                    className="w-full mt-6 p-6 h-12 border border-slate-200 bg-transparent rounded"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex justify-end mt-6">
                  <p className="text-xs font-medium text-[#009EF7]">
                    Forgot Password ?
                  </p>
                </div>
                {isLoggedIn ? (
                  <div className="mt-8 flex justify-center">
                    <CircularProgress
                      style={{
                        color: "black", // Set the color to black
                        width: "30px", // Adjust the width as needed
                        height: "30px", // Adjust the height as needed
                      }}
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 h-10 text-white text-sm shadow-md bg-black p-2 font-semibold rounded-md"
                  >
                    Login
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
