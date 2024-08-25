

import { InputHTMLAttributes } from "react";
import FormikHOC from "./FormikHOC";

type InputProps = {
    label: string;
    id: string;
    className?: string;
    name: string;
    error?: string|undefined;
    touched?: boolean;
  } & InputHTMLAttributes<HTMLInputElement>;

function Input({ label, id, className, name, error, touched, ...rest }:InputProps) {

    let borderClass = " border-gray-300  focus:border-indigo-500 ";
    return (
        <div>
            <label htmlFor={id} className="sr-only "> {label}
            </label>
            <input
                error={error}
                touched={touched}
                id={id}
                name={name}
                className={"  w-full rounded-md  border   pt-1  placeholder-gray-500 focus:ring-indiga-500" + borderClass + className}
                {...rest}
            />
            {error && touched && <div className="text-red-300">{error}</div>}
        </div>
    )
}
export const FormikInput = FormikHOC(Input);
export default Input;