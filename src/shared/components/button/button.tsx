import { MouseEventHandler } from 'react';
import style from './button.module.css';

export interface ButtonProps{
  label: string;
  theme?: string;
  disable?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = 
( {label, disable=false, theme="primary" }: ButtonProps )=>(
  <button disabled={disable} className={`${style.button} ${style[theme]}`} type='submit'>{ label }</button>
)