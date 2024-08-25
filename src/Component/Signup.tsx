import { FormikErrors, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import { withAlert, withUser } from "./withProvider";

interface FormValues {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface FormErrors extends FormikErrors<FormValues> {}

interface AlertProps {
    setAlert: (alert: { type: string; message: string }) => void;
}

interface UserProps {
    setUser: (user: any) => void;
}

type HandleCreateAccountProps = {
    values: FormValues;
    bag: {
        props: AlertProps & UserProps;
    };
};

function handleCreateAccount(values:FormValues, bag:HandleCreateAccountProps) {
    console.log( values.username, values.email, values.password, values.confirm_password);
    axios.post("https://myeasykart.codeyogi.io/signup",
        {
            fullName: values.username,
            email: values.email,
            password: values.password,
        }
    ).then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        console.log("user", user);
        bag.props.setUser(user);
        bag.props.setAlert({ type: "success", message: "Welcome " + "!" })
    }).catch(() => {
        bag.props.setAlert({ type: "error", message: "Email is already exist!" })
    })
}
const schema = Yup.object().shape({
    email: Yup.string().required("Please fill your email"),
    username: Yup.string().required("Please Enter username"),
    password: Yup.string().required("Please Enter password").min(8, "password must be 8 chracters"),
    confirm_password: Yup.string().required("Please confirm your pssword").min(8),
})
const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
}


interface SignupProps extends FormikProps<FormValues> {
    // You can extend with other props if needed
}
export function Signup({ handleSubmit , handleChange, handleBlur, touched, errors, values }:SignupProps) {
    return (
        <div className="flex bg-gray-100 w-screen h-screen justify-center items-center">
            <form onSubmit={handleSubmit}
                className=" flex  flex-col bg-white w-96   px-4 py-2 self-center rounded-xl shadow-md gap-2 ">
                <h1 className="self-center my-5 text-2xl text-gray-500 font-bold"> SpeedCart</h1>
                <h2 className="text-2xl bold">Create Account</h2>
                <div>
                    <Input
                        values={values.username}
                        error={errors.username}
                        touched={touched.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="name"
                        lable="Name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        autoComplete="username"
                        className={""}
                    />
                </div>
                <div>
                    <Input
                        values={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        lable="Email  "
                        type="email"
                        name="email"
                        placeholder="Enter  "
                        id="email"
                        autoComplete="email"
                        required
                        className={""}
                    />
                </div>
               
                <div>
                    <Input
                        values={values.password}
                        error={errors.password}
                        touched={touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        name="password"
                        lable="Password"
                        placeholder=" Enter  password"
                        id="password"
                        autoComplete="password"
                        className={""}
                    />
                </div>
                <div>
                    <Input
                        values={values.confirm_password}
                        error={errors.confirm_password}
                        touched={touched.confirm_password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        autoComplete="password"
                        name="confirm_password"
                        placeholder=" Reenter password"
                        id="confirm_password"
                        className={""}
                        lable="Confirm Password" />

                </div>
                <button type="submit" className="my-6 border rounded-md bg-blue-600 text-white text-xl py-2 disabled:bg-blue-300"   >Create Account</button>
                <p className="self-center ">New Customer?<Link className="text-blue-600 hover:font-bold underline" to="/Login">Login</Link></p>
            </form >
        </div>
    );
}
const myHOC = withFormik<SignupProps>({
    initialValues : initialValues,
    validationSchema: schema,
    handleSubmit: handleCreateAccount,
})
const mysignup = myHOC(Signup);
export default withUser(withAlert(mysignup));