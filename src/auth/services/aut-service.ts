import { SingInDTO } from './../domain/dtos/sing-in-dto';
import { SingUpDTO } from '../domain/dtos/sing-up-dto';
import { container } from '../../config/container';
import { IAuthRepository } from '../domain/repositories/auth-repository';
import { IDataSource } from '../domain/repositories/data-soruce';

export const singUp = ( params: SingUpDTO ): boolean => {

    const repository: IAuthRepository = container.get('authRepository');

    return repository.singUp(params);
}

export const singIn =  ( params: SingInDTO ): string => {

    const repository: IAuthRepository = container.get('authRepository');

    return repository.signIn( params );
}

export const checkLoginStatus = (): boolean =>{
    const repository: IDataSource= container.get('localStorage');
    console.log(JSON.parse(repository.get('login')));
    return JSON.parse(repository.get('login'));
} 

export const getUserInfo = () => {
    const repository: IDataSource= container.get('localStorage');
    return repository.get('github')
}


export const logoutUser = () => {
    const repository: IAuthRepository = container.get('authRepository');
    repository.logout();
}