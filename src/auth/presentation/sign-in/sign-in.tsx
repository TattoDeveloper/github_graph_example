import React, { FunctionComponent, useState } from 'react';
import { AuthSection } from '../components/auth-section/auth-section';
import { Field, Formik, Form } from 'formik';
import { userSingInSchema } from '../validations/form-validartions';
import { singIn } from '../../../assets/text/data.json'
import { Button } from '../../../shared/components/button/button';
import {  checkLoginStatus, singIn as singInService } from '../../services/aut-service';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

interface formData {
    email: string;
    password: string;
}

export const SignIn : FunctionComponent = () => {

  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { data } = useFetch( checkLoginStatus );
  const history = useHistory();


  const initialValues = {
    email: '',
    password: ''
  }
   

  const onSubmit = ({ email, password }: formData) => {
    try{
      singInService({email, password});
      history.push("/dashboard");
    }catch(error){
      setIsInvalidCredentials(true);
      setErrorText( error.message );
    }
  }

  if(data){
     return <Redirect to="/dashboard"/>
  }
 
  return (
    <AuthSection
     title={  singIn.title }
    >

       { isInvalidCredentials && <span className="errorMessages">{ errorText }</span> }
       <Formik
        initialValues={ initialValues }
        onSubmit={ onSubmit }
        validationSchema={ userSingInSchema }
       >
        {({errors, touched}) =>(
          <Form>
            <label htmlFor="email">{ singIn.fields.email.label }</label>
            <Field  type="email" name="email" placeholder={ singIn.fields.email.placeholder }/>
            {(errors.email && touched.email) && <span className="errorMessages">{errors.email}</span> }

            <label htmlFor="password">{ singIn.fields.password.label }</label>
            <Field  type="password" name="password" placeholder={ singIn.fields.password.placeholder }/>
            {(errors.password && touched.password) && <span className="errorMessages">{errors.password}</span> }
            
            <Button label={ singIn.button } />
          </Form>
          
        )}
       </Formik>
      
       <Link to="/sign-up">Sing up</Link>

    </AuthSection>
  );
}