import React, { FunctionComponent, useState } from 'react'
import { ReactNode } from 'react';
import { Repository } from '../../../domain/repository';
import style from './repository-list.module.css';

interface RepositoryCardProps{
  repository: Repository;
  children?: ReactNode;
}


export const RespositoryCard:FunctionComponent<RepositoryCardProps> = (
  { repository, children}: RepositoryCardProps) => {

  

  return(
    <article className={style.repositoryCard} key={repository.id}>
    <span>{ repository.isPrivate ? 'private' : 'public'}</span>
    <h3>{ repository.name}</h3>
    <footer> 
      { repository.primaryLanguage ?
        (<em>{repository.primaryLanguage.name}</em>) :
        (<em>unknown</em>) }
      { children }
    </footer>
  </article>
  );
}