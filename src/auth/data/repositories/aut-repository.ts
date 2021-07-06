import { container } from './../../../config/container';
import { LocalStorage } from './local-storage-repository';
import { inject, injectable, multiInject } from 'inversify';
import { SingInDTO } from '../../domain/dtos/sing-in-dto';
import { SingUpDTO } from '../../domain/dtos/sing-up-dto';
import { IAuthRepository } from '../../domain/repositories/auth-repository';
import 'reflect-metadata';
import { IDataSource } from '../../domain/repositories/data-soruce';
import { decrypt, encrypt } from '../../../util/secure-helper';



@injectable()
export class AuthRepository implements IAuthRepository{
  
  private storage: IDataSource

  constructor(){
    this.storage = container.get('localStorage');
  }


  signIn( userCredentials: SingInDTO ): string {
    const data = this.storage.get('user');

    if(!data){
      throw new Error('user no found')
    }

    const descrypted = JSON.parse(decrypt(data));
    
    if(descrypted.email === userCredentials.email && 
       descrypted.password === userCredentials.password){
         this.storage.save({key:'login', value:true})
         return descrypted.githubUserName;
       }

    throw new Error('invalid credentials');
  }

  singUp( userData: SingUpDTO ): boolean {

    const cipherdata = encrypt(JSON.stringify(userData));
    this.storage.save({key: 'github', value: userData.githubUserName });
    this.storage.save({key: 'user', value: cipherdata });

    return true;
  }

  logout(): void {
     this.storage.delete('login');
  }


}

