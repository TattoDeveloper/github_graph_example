import * as Yup  from 'yup';

const passwordSchema = Yup.object().shape({
   password: Yup.string()
             .min(6, 'password Has to have 6+ characters')
             .required('Password is required')
})

const emailSchema = Yup.object().shape({
   email: Yup.string()
             .email("Enter a valid email")
             .required("Email is required")
})

export const userSingInSchema = emailSchema.concat(passwordSchema);

export const userSingUpSchema = Yup.object().shape({
   username: Yup.string()
                .required('GitHub username is required')
                .min(3, 'GitHub username Has to have 3+ characters'),
   confirmpassword: Yup.string()
                       .required("Confirm password is required")
                       .oneOf([Yup.ref('password')],'Password must match')
}).concat(emailSchema).concat(passwordSchema)