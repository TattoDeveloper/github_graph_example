import { AES, enc} from 'crypto-js'

const { REACT_APP_SECRECT } = process.env

export const encrypt = ( data: any ) => AES.encrypt(data, REACT_APP_SECRECT ?? 'generic')

export const decrypt = ( cipherdata: any ) => AES.decrypt(cipherdata, REACT_APP_SECRECT ?? 'generic').toString(enc.Utf8)