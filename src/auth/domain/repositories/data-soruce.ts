export abstract class IDataSource{
  abstract save( params: Record<string, any> ): void;
  abstract get( key:string ): any;
  abstract delete( key:string ): void;
}