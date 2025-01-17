import styles from "./signin.module.scss";
import useSignin from "./useSignin.js";
import { GoogleLogin } from "@react-oauth/google";
import handleGoogleLoginSuccess from "../../utils/handleGoogleLoginSuccess.js";

const Signin = () => {
    const { formik, user, isAuthenticated } = useSignin();

    return (
        <>
            <section className={`${styles.signin}`}>
                <div className={`${styles.signinWrapper}`}>
                    {isAuthenticated ? (
                        <h2 className="text-center">Welcome Back, {user.name}</h2>
                    ) : (
                        <>
                            <h2 className="text-center">Sign In Form</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={`${styles.input_group} mt-3`}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className="mt-2"
                                        placeholder="Enter email..."
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <div className="error">{formik.errors.email}</div>
                                )}
                                <div className={`${styles.input_group} mt-3`}>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        className="mt-2"
                                        placeholder="Enter password..."
                                    />
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className="error">{formik.errors.password}</div>
                                )}
                                <button className="mt-4" type="submit">
                                    Sign In
                                </button>
                            </form>

                            <div className="oauth-login mt-4">

                                <div className={`${styles.divider}`}>Or Sign In Using</div>

                                {/* Google OAuth Button */}
                                <GoogleLogin
                                    onSuccess={handleGoogleLoginSuccess}
                                    onError={(error) => console.log("OAuth Error:", error)}
                                />
                            </div>

                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Signin;
