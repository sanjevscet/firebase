import React from "react";

function useFormValidation(initialState, validate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);


  React.useEffect(() => {
    if(isSubmitting) {
        const noErrors = Object.keys(errors).length ===0;
        if(noErrors) {
            console.log('authenticated');
            setSubmitting(false)
        } else{
            console.log(setSubmitting);
            setSubmitting(false)
        }
    }
  }, [errors, isSubmitting, setSubmitting])

  function handleChange(event) {
    event.persist();
    setValues(previousValues => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    console.log(validationErrors);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log({ values });
  }
  return { handleBlur, handleChange, handleSubmit, values, errors, isSubmitting };
}

export default useFormValidation;
