import { GoogleLogin } from '@react-oauth/google'
import styles from './signup.module.scss'
import useSignup from './useSignup'
import handleGoogleLoginSuccess from '../../utils/handleGoogleLoginSuccess'

const Signup = () => {

    const { formik } = useSignup()

    return (
        <>
            <section className={`${styles.signup}`}>

                <div className={`${styles.signupWrapper}`}>

                    <h2 className='text-center'>Sign Up Form</h2>

                    <form onSubmit={formik.handleSubmit}>

                        <div className={`${styles.input_group}`}>
                            <label>Name</label>
                            <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} className='mt-2' placeholder='Enter name...' />
                        </div>

                        {
                            formik.touched.name && formik.errors.name && (
                                <div className='error'>{formik.errors.name}</div>
                            )
                        }

                        <div className={`${styles.input_group} mt-3`}>
                            <label>Email</label>
                            <input type='email' name='email' value={formik.values.email} onChange={formik.handleChange} className='mt-2' placeholder='Enter email...' />
                        </div>

                        {
                            formik.touched.email && formik.errors.email && (
                                <div className='error'>{formik.errors.email}</div>
                            )
                        }

                        <div className={`${styles.input_group} mt-3`}>
                            <label>Password</label>
                            <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} className='mt-2' placeholder='Enter password...' />
                        </div>

                        {
                            formik.touched.password && formik.errors.password && (
                                <div className='error'>{formik.errors.password}</div>
                            )
                        }

                        <button className='mt-4' type='submit'>Sign Up</button>

                        <div className="oauth-login mt-4">

                            <div className={`${styles.divider}`}>Or Sign Up Using</div>

                            {/* Google OAuth Button */}
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={(error) => console.log("OAuth Error:", error)}
                            />
                        </div>


                    </form>

                </div>

            </section>
        </>
    )

}

export default Signup