import React from "react";

import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../Firebase";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
    name: "",
    email: "",
    password: ""
};

function Login(props) {
    const [login, setLogin] = React.useState(true);
    const [firebaseError, setFirebaseError] = React.useState(null);

    async function authenticateUser() {
        const { name, email, password } = values;
        try {
            login
                ? await firebase.login(email, password)
                : await firebase.register(name, email, password);
            setFirebaseError(null);
            props.history.push('/')
        } catch (error) {
            console.error("Authentication error", error);
            setFirebaseError(error.message);
        }
        // console.log(JSON.stringify(response));
    }

    const {
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isSubmitting
    } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

    return (
        <div>
            <h2 className="mv3">{login ? "Create" : "Create Account"}</h2>
            <form className="flex flex-column" onSubmit={handleSubmit}>
                {!login && (
                    <input
                        type="text"
                        name="name"
                        // className={errors.name && 'error-input'}
                        value={values.name}
                        placeholder="Your Name .."
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                )}
                <input
                    type="email"
                    value={values.email}
                    className={errors.email && "error-input"}
                    name="email"
                    placeholder="Your Email .."
                    autoComplete="off"
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
                <input
                    type="password"
                    value={values.password}
                    className={errors.password && "error-input"}
                    name="password"
                    placeholder="choose a secure password"
                    autoComplete="off"
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {errors.password && (
                    <p className="error-text">{errors.password}</p>
                )}
                {firebaseError && <p className="error-text">{firebaseError}</p>}
                <div className="flex mt3">
                    <button
                        type="submit"
                        className="button pointer mr2"
                        disabled={isSubmitting}
                        style={{
                            background:
                                Object.keys(errors).length === 0
                                    ? "green"
                                    : "orange"
                        }}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="button pointer"
                        onClick={() => setLogin(prevLogin => !prevLogin)}
                    >
                        {login
                            ? "Need to create Account?"
                            : "Already have an account?"}
                    </button>
                </div>
            </form>
            <div className="forgot-password">
                <Link to="/forgot">Forgot password?</Link>
            </div>

        </div>
    );
}

export default Login;
