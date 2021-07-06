import React, { MouseEventHandler } from 'react'
import style from './Tap.module.css'

interface TapProps{
  label: string;
  handler: MouseEventHandler;
  _id?:any;
  active?: string;
  index: Number;
}

export const Tap: React.FunctionComponent<TapProps> =({ label, handler, _id, active, index } : TapProps )=>(
    <button onClick={handler} data-id={_id} data-index={index}  
        className={`${style.tap} ${style[active!!]}`}>
        {label}
    </button>
)


interface TapMenuProps{
  current:any;
  children: any
}
export const TapMenu: React.FunctionComponent<TapMenuProps> =({current, children}: TapMenuProps)=>{
    return(
        <div className={style.tapContainer}>
           {React.Children.map(children, (child, _index)=>{
         
               return React.cloneElement(child, {
                   active:_index == current ? 'active' : '',
                   index: _index
               })
           })}
        </div>
    )
}

interface TapViewProps{
  children: any;
}

export const TapView: React.FunctionComponent<TapViewProps> = ({children}: TapViewProps)=>(
  <div className={style.view}>
     {children}
  </div>
)



interface TapBlockProps{
  children:any;
  tapList: Array<any>
}
export const TapBLock: React.FunctionComponent<TapBlockProps>=({children, tapList}: TapBlockProps)=>{
  
  const [index, setIndex] = React.useState(0)

  const change=({target}: any)=>{
     setIndex(parseInt(target.dataset.index))
  }

  return(
    <div className={style.block}>
        <TapMenu
          current={index}
        >
            {
              tapList.map((tap, index) =>{
                return<Tap label={tap} index={index} handler={change}/>
              })
            }
        </TapMenu>

        <div className={style.blockSliderCont}>
            <div className={style.blockSlider}>
                {React.Children.map(children, (child, _index)=>{
                  console.log(child)
                    if(_index === index){
                      return React.cloneElement(child)
                    }
                })}
            </div>
        </div>
    </div>
  )
}