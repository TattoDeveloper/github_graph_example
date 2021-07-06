import { useQuery } from '@apollo/client'
import React, { FunctionComponent, useState } from 'react'
import { TapBLock, TapView } from '../../../../shared/components/TapContainer/TapContainer'
import { GET_REPOSITORIES } from '../../../data/querys/get-repositories'
import style from './repository-list.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar
} from '@fortawesome/free-solid-svg-icons'
import { Repository } from '../../../domain/repository';
import { RespositoryCard } from './repository-card';


interface TapSectionProsps{
  userRepositories: unknown[]
}

const TapSection: FunctionComponent<TapSectionProsps> = ( { userRepositories }: TapSectionProsps ) =>{

  const [repositories, setRespostories] = useState(userRepositories);
  const [favorites, setFavorites] = useState<any>([])


  const saveFavorite = ( { isFavorite, id, ...rest}: Repository  ) =>{
    const index: number =  repositories.findIndex(( rep: any, index: number ) => rep.id  === id );
    if( index > -1 ){
      let _repoistories = [...repositories];
      const repositoryClone: Repository = { ...rest, id, isFavorite: isFavorite ? false : true  }
      _repoistories.splice(index,1, repositoryClone)
      const _favorites = _repoistories.filter((rep: any) => rep.isFavorite === true )
      setRespostories(_repoistories);
      setFavorites(_favorites);
    } 
  }


  return(
    <div className={ style.repositoriesCardContainer }>
      <TapBLock
      tapList={[
          "All",
          "Favorites",
      ]}
      >
          
        <TapView>
           <div className={style.repositoriesCardContainer}>
           {
            repositories.map(( repository : any )=>{
              return(
                <RespositoryCard
                   key={repository.id}
                  repository={repository}
                >
                    <FontAwesomeIcon 
                      onClick={()=> saveFavorite(repository) } 
                      icon={faStar} 
                      color={repository.isFavorite  ? 'green': '#ddd' }
                    />
                </RespositoryCard>
              )
            })
          }
           </div>
        </TapView>

        <TapView>
        <div className={style.repositoriesCardContainer}>
         {
           
            favorites.map(( repository : any )=>{
              return(
                <RespositoryCard
                 key={repository.id}
                 repository={repository}
                />
              )
            })
         }
         </div>
        </TapView>
          
      </TapBLock>

 </div>
  );
} 

interface RepositoryListProps{
  githubUserName: string
}


export const RepositoryList: FunctionComponent<RepositoryListProps> = ({ githubUserName }: RepositoryListProps ) => {

  const {loading, data, error} = useQuery( GET_REPOSITORIES, {
    variables: {
      login: githubUserName
    }
  } )
  
  return(
    <div>
      {loading && <span>loading...</span>}
      {error && <span>Something is wrong!!</span>}
      {
         data && <TapSection userRepositories={data.user.repositories.nodes}/>
      }
    </div>
  )
}