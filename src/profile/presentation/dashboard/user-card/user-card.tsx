import React, { FunctionComponent } from 'react';
import style from './user-card.module.css'

interface Avatar{
  path: string;
  alt: string
}

interface UserCardProps{
  avatar: Avatar;
  userName: string;
}


export const UserCard: FunctionComponent<UserCardProps> = ({ avatar, userName }: UserCardProps) => {
  return(
       <div className={ style.userCard }>
          <img src={ avatar.path } alt={`${avatar.alt} ${ userName }`} />
          <h2>{ userName }</h2>
       </div>
  )
}