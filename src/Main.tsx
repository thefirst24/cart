import phones from './phones'
import { FC,useReducer } from "react";
import React from 'react'
import { useContext } from 'react';

interface Phone {
    img: string,
    title: string,
    price: number
}

interface ListItem {
    phone: Phone,
    incr: Function,
    dicr: Function,
    destroy: Function
}

const Item: FC<ListItem> = (item) => {
    const {img,title,price} = item.phone;
    const state = useContext(MainContext);
    const count = state.items.find(item => item.phone.title === title)?.count;
    return (
    <div className="item">
        <img src={img} alt={title}></img>
        <div>
            <h4>{title}</h4>
            <p>${price}</p>
            <button>remove</button>
        </div>
        <div  className="count">
            <button onClick={() => item.incr()}><img src="up.svg" alt="increase" /></button>
            <h4>{count}</h4>
            <button onClick={() => item.dicr()}><img src="bottom.svg" alt="descrease" /></button>
        </div>
    </div>
    )
}

const MainFooter : FC<any> = (clearAll) => {
    const state = useContext(MainContext);
    let price = 0;
    state.items.map((item) => price += item?.phone?.price * item?.count);
    return (
        <div className="main-footer">
            <div className="line"></div>
            <div className="total">
                <h4>Total</h4>
                <h4>${Math.round(price * 100) / 100}</h4>
            </div>
            <button className="clear" onClick={() => clearAll.clearAll()}>CLEAR CART</button>
        </div>

    )
}


const initialState = {
    items:[
        {
            phone:phones[0],
            count: 1,
        },
        {
            phone:phones[1],
            count: 1,
        },
        {
            phone:phones[2],
            count: 1,
        },
        {
            phone:phones[3],
            count: 1,
        }
    ]
}

interface StateItem {
    phone:Phone,
    count: number
} 

type State = {
    items : Array<StateItem>
}

type Action = 
    | {type: "incr",title:string} 
    | {type: "decr",title: string}
    | {type: "destroy",title: string}
    | {type: "clear"}



export default function Main() {
    
    
    const reducer = React.useCallback((state : State,action : Action) => {
        let newState = {...state}
        if (action.type === "clear") {
            newState.items = [];
            return newState;
        }
        let item = newState.items.find(item => item?.phone.title === action.title);
        const index = newState.items.indexOf(item!);
        switch (action.type) {
            case 'incr': 
                newState.items[index].count += 0.5;
                return newState;
        
            case 'decr':
                newState.items[index].count -= 0.5;
                return newState;
            case 'destroy':
                newState.items = newState.items.filter(item => item.phone.title !== action.title);
                return newState;
            default:
                return newState;
        }
    },[])


    const [state,dispatch] = useReducer(reducer,initialState)
    console.log(state);
    return (
        <MainContext.Provider value={state}>
            <main>
                <h1>YOUR BAG</h1>
                <div className="items">
                    {state.items.map(item => 
                    {
                        if (item.count <= 0) dispatch({type:"destroy",title:item.phone.title})
                        else
                        return <Item 
                            phone={item.phone} 
                            incr={() => dispatch({type:"incr",title:item.phone.title})} 
                            dicr={() => dispatch({type:"decr",title:item.phone.title})}
                            destroy={() => dispatch({type:"destroy",title:item.phone.title})}
                            key={Math.random() * 10}
                        />
                    }
                    )}
                </div>
                {state.items.length != 0 && <MainFooter clearAll={() => dispatch({type:"clear"})}/>}
                {state.items.length == 0 && <h2>Is currently empty</h2>}
            </main>
        </MainContext.Provider>
    )
}

const MainContext = React.createContext<State>({items:[]})

export type {Phone};