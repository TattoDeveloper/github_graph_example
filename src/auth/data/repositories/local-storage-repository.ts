import { injectable } from 'inversify';
import { SingInDTO } from '../../domain/dtos/sing-in-dto';
import { SingUpDTO } from '../../domain/dtos/sing-up-dto';
import { IAuthRepository } from '../../domain/repositories/auth-repository';
import 'reflect-metadata';
import { IDataSource } from '../../domain/repositories/data-soruce';

@injectable()
export class LocalStorage implements IDataSource{
  get(key: string): any {
   return localStorage.getItem( key );
  }

  save(params: Record<string, any>): void {
    localStorage.setItem( params.key, params.value );
  }

  delete( key:  string ): void {
    localStorage.removeItem( key );
  }

}