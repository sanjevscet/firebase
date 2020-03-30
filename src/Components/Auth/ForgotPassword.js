import React from "react";
import { FirebaseContext } from "../../Firebase";

function ForgotPassword() {
    const { firebase } = React.useContext(FirebaseContext);
    const [resetPasswordEmail, setResetPasswordEmail] = React.useState("");
    const [isPasswordReset, setIsPasswordReset] = React.useState(false);
    const [passwordResetError, setPasswordResetError] = React.useState("");

    const handleResetPassword = async () => {
        try {
            await firebase.resetPassword(resetPasswordEmail);
            setIsPasswordReset(true);
            setPasswordResetError("");
        } catch (error) {
            console.error("Error in sending mail", error);
            setPasswordResetError(error.message);
            setIsPasswordReset(false);
        }
    };

    return (
        <div>
            <input
                type="email"
                className="input"
                placeholder="Provide email address .."
                onChange={e => setResetPasswordEmail(e.target.value)}
            />
            <div>
                <button className="button" onClick={handleResetPassword}>
                    Reset Password
                </button>
            </div>
            {isPasswordReset && <p>Check email to reset the Password</p>}
            {passwordResetError && <p className="error-text">{passwordResetError}</p>}
        </div>
    );
}

export default ForgotPassword;
