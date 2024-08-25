
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import { withUser, withAlert } from "./withProvider";
import { User } from "./context";


interface FormValues {
    email: string;
    password: string;
  }
  interface LoginProps extends FormikProps<FormValues> {
    user?: User;
    setUser: (user: any) => void; 
    setAlert: (alert: { type: string; message: string }) => void;
  }

function callLogApi(values:FormValues, bag:any) {
    // console.log("callLogApi is called");
    // console.log("sending data", values.email, values.password);
    axios.post("https://myeasykart.codeyogi.io/login", {
        email: values.email,
        password: values.password,
    })
        .then((response) => {
            // console.log("response", response.data);
            const { user, token } = response.data;
            localStorage.setItem("token", token);
            bag.props.setUser(user);
            bag.props.setAlert({ type: "success", message: "Successfully Login" });
        }).catch(() => {
            console.log("error from login  password api");
            bag.props.setAlert({ type: "error", message: "Invalid email or password" });
        })
}
const schema = Yup.object().shape({
    email: Yup.string().email().required("Please Enter Email"),
    password: Yup.string().required("Please Enter password").min(8)
});

export function Login({ handleSubmit, values, errors, touched, handleChange, handleBlur, user }:LoginProps) {
    if (user) {
        return <Navigate to="/" />
    }
    return (
        <div className="flex bg-gray-100 w-screen h-screen justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className=" flex  flex-col bg-white w-96   px-4 py-2 self-center rounded-xl shadow-md gap-4   ">
                <h1 className="self-center my-5 text-2xl text-gray-500 font-bold"> SpeedCart</h1>
                <h2 className="text-2xl blod"> Sign In</h2>
                <div>
                    <Input value={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label="Email"
                        id="email-address"
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="rounded-b-none"
                        autoComplete="email"
                        required
                    />
                </div>
                <div>
                    <Input
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        id="password"
                        autoComplete="password"
                        required
                    />
                    <Link className="text-blue-600 my-2 " to="/forget">Forget Password</Link>
                </div>
                <button type="submit" className="my-6 border rounded-md bg-blue-600 text-white text-xl py-2 disabled:bg-blue-300"  >Log in</button>
                <p className="self-center ">New Customer?<Link className="text-blue-600 hover:font-bold underline" to="/Signup">Signup</Link></p>
            </form>
        </div>
    );
}

const myHOC = withFormik({
    initialValues: {
        email: "",
        password: "",
    },
    handleSubmit: callLogApi,
    validationSchema: schema,
})(Login);
export default withAlert(withUser(myHOC));
