import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
    username:yup.string().required("User name is required!"),
    password:yup.string().min(5).max(20).required("Password is required!")

});

