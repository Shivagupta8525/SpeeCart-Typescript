import { FormikProps, withFormik } from "formik";
import { Link } from "react-router-dom";
import Input from "./Input";
import * as Yup from "yup";


interface FormValues {
    email: string;
  }

  interface ForgetProps extends FormikProps<FormValues> {};

function sendData(values:FormValues) {
    console.log("values.email", values.email);
}
const schema = Yup.object().shape({
    email: Yup.string().required("Please fill your email"),
})
export function Forget({ handleSubmit, values, errors, touched, handleChange, handleBlur }:ForgetProps) {

    return (
        <div className="flex bg-gray-100 w-screen h-screen justify-center items-center">
            <form onSubmit={handleSubmit}
                className=" flex  flex-col bg-white w-96   px-4 py-2 self-center rounded-xl shadow-md gap-2 ">
                <h1 className="self-center text-gray-600 text-3xl">Speed Cart</h1>
                <h2 className="text-2xl bold">Forgot Password</h2>
                <div>
                    <Input lable="Email or username"
                        type="email"
                        name="email"
                        placeholder="Enter Username or email"
                        id="email"
                        autoComplete="email"
                        required={true}
                        values={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={""}
                    />
                </div>
                <div className=" flex-col flex ">
                    <h1>ReSet password</h1>
                    <button type="submit" className="mb-6 border rounded-md bg-blue-600 text-white text-xl py-2 disabled:bg-blue-300"   >Send Link</button>
                </div>
                <Link className="self-center text-blue-600 hover:font-bold" to="/login"><button className="px-2 border rounded-md bg-blue-400 text-white text-lg ">Back</button></Link>
            </form>
        </div>
    )
}
const myHOC = withFormik<{},FormValues>({
    initialValues: {
        email: "",
    },
    handleSubmit: sendData,
    validationSchema: schema,
})
export default myHOC(Forget);