import { SingUpDTO } from './../dtos/sing-up-dto';
import { SingInDTO } from './../dtos/sing-in-dto';


export abstract class IAuthRepository{

    abstract signIn( userCredentials: SingInDTO ): string;
    abstract singUp( userData: SingUpDTO ): boolean;
    abstract logout(): void;

}