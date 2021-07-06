import React, { FunctionComponent, ReactNode } from 'react';
import style from './auth-section.module.css';
import { logo } from '../../../../assets/text/data.json'

interface AuthSectionProps{
  title: string
  children: ReactNode
}

export const AuthSection : FunctionComponent<AuthSectionProps> = ({title, children }: AuthSectionProps) => {
  return (
    <section className={ `guide ${style.authSection}` }>
       <div className={ style.authContainer }>
          <div className={ style.authBrandContainer }>
             <h1>{ title }</h1>
             <img src={logo.path} alt={logo.alt} />
          </div>
          <div className={ style.authFormContainer }>
            <span>{ title }</span>
            { children }
          </div>
       </div>
    </section>
  );
}