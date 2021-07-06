import { Container } from 'inversify';
import { IAuthRepository } from '../auth/domain/repositories/auth-repository';
import { AuthRepository } from '../auth/data/repositories/aut-repository';
import { IDataSource } from '../auth/domain/repositories/data-soruce';
import { LocalStorage } from '../auth/data/repositories/local-storage-repository';

export const container = new Container();
container.bind<IDataSource>('localStorage').to(LocalStorage);
container.bind<IAuthRepository>('authRepository').to(AuthRepository);

