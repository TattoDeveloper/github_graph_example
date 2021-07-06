import { container } from './../config/container';
import React from 'react'
import { interfaces } from 'inversify';

 export const useFetch = (service: Function, params:any[] = [])=>{

   const [data, setData] = React.useState(undefined)
   const [isLoad, setLoad] = React.useState(true)
   React.useEffect(()=>{
      async function get(){
          const response =  await service(...params)
          setData(response)
          setLoad(false)
      }

      get() 
   },[])


   return {data: data, isLoad}
} 

