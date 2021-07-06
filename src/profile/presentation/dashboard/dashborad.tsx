import React, { FunctionComponent, useEffect } from 'react';
import style from './dashboard.module.css'
import { UserCard } from './user-card/user-card';
import { dashboard } from '../../../assets/text/data.json'
import { Redirect, useHistory } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { checkLoginStatus, getUserInfo, logoutUser } from '../../../auth/services/aut-service';
import { RepositoryList } from './repository-list/repository-list';




export const DashBoard : FunctionComponent = () => {

  const { data, isLoad } = useFetch( checkLoginStatus )
  const userInfo = useFetch( getUserInfo )
  const history = useHistory();

  const logout = () => {
     logoutUser();
     history.push('/')
  } 

  if(!isLoad && !data) {
     return <Redirect to="/" />
  }

  return(
   <section className={ `guide ${ style.dashboard }`}>
      <div>
        <UserCard
            avatar={ dashboard.avatar }
            userName={ userInfo.data ?? 'User'}
         />
         <span onClick={ logout }> logout </span>
      </div>
      {(!isLoad && userInfo.data)&& <RepositoryList githubUserName={ userInfo.data as unknown as string } />}
   </section>
 )
}