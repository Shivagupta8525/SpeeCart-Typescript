
import React from "react";
import { useField, FieldInputProps, FieldMetaProps } from "formik";

interface FormikHOCProps {
  name: string;
  [key: string]: any;
}

function FormikHOC<P extends object>(
  Component: React.ComponentType<P>
): React.FC<FormikHOCProps> {
  return function Out({ name, ...rest }: FormikHOCProps) {
    const [field, meta] = useField(name);
    const { value, onBlur, onChange }: FieldInputProps<any> = field;
    const { error, touched }: FieldMetaProps<any> = meta;

    let borderClass = "border-gray-300 focus:border-indigo-500";
    if (error && touched) {
      borderClass = "border-red-500";
    }

    return (
      <Component
        {...(rest as P)}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        touched={touched}
        error={error}
        className={borderClass}
      />
    );
  };
}

export default FormikHOC;
