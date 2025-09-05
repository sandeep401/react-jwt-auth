import { useState } from "react";

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (validate) setErrors({ ...errors, [name]: validate(name, value, { ...values, [name]: value }) });
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validate ? validate(key, values[key], values) : null;
      if (error) validationErrors[key] = error;
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) await callback(values);
  };

  return { values, errors, handleChange, handleSubmit, setErrors };
}
