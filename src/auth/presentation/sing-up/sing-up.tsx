import { Field, Form, Formik } from 'formik';
import React, { FunctionComponent } from 'react';
import { AuthSection } from '../components/auth-section/auth-section';
import { singUp } from '../../../assets/text/data.json'
import { Button } from '../../../shared/components/button/button';
import { userSingUpSchema } from '../validations/form-validartions';
import {  checkLoginStatus, singUp as singUpService } from '../../services/aut-service';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

interface formData {
  email: string;
  password: string;
  username: string;
}

export const SignUp : FunctionComponent = () => {

  const { data } = useFetch( checkLoginStatus );
  const history = useHistory();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmpassword:''
  }
   

  const onSubmit = ({ email, password, username }: formData) => {
     try{
      singUpService({email, password, githubUserName: username})
      history.push('/');
     }catch(error){
       console.error(error)
     }
  }

  if(data){
    return <Redirect to="/dashboard"/>
  }

  return (
    <AuthSection
     title={  singUp.title }
    >
       <Formik
        initialValues={ initialValues }
        onSubmit={ onSubmit }
        validationSchema={ userSingUpSchema }
       >
        {({errors, touched}) =>(
          <Form>
            <label htmlFor="email">{ singUp.fields.username.label }</label>
            <Field  type="text" name="username" placeholder={ singUp.fields.username.placeholder }/>
            {(errors.username && touched.username) && <span className="errorMessages">{ errors.username }</span> }

            <label htmlFor="email">{ singUp.fields.email.label }</label>
            <Field  type="email" name="email" placeholder={ singUp.fields.email.placeholder }/>
            {(errors.email && touched.email) && <span className="errorMessages">{ errors.email }</span> }

            <label htmlFor="password">{ singUp.fields.password.label }</label>
            <Field  type="password" name="password" placeholder={ singUp.fields.password.placeholder }/>
            {(errors.password && touched.password) && <span className="errorMessages">{ errors.password }</span> }

            <label htmlFor="confirmpassword">{ singUp.fields['confirm-password'].label }</label>
            <Field  type="password" name="confirmpassword" placeholder={ singUp.fields['confirm-password'].placeholder }/>
            {(errors.confirmpassword && touched.confirmpassword) && <span className="errorMessages">{ errors.confirmpassword }</span> }

            <Button disable={ !(touched.email  && touched.password) } label={ singUp.button } />
          </Form>
        )}
       </Formik>
       <Link to="/">Sing in</Link>
    </AuthSection>
  );
}