import phones from './phones'
import { FC,useReducer } from "react";
import React from 'react'
import { useContext } from 'react';

interface Phone {
    img: string,
    title: string,
    price: number
}

interface Item {

}

const Item: FC<Phone> = ({ img, title, price }) => {
    const state = useContext(MainContext);
    const count = state.items.find(item => item.phone.title == title)?.count;
    return (
    <div className="item">
        <img src={img} alt={title}></img>
        <div>
            <h4>{title}</h4>
            <p>${price}</p>
            <button>remove</button>
        </div>
        <div  className="count">
            <button><img src="up.svg" alt="increase" /></button>
            <h4>{count}</h4>
            <button><img src="bottom.svg" alt="descrease" /></button>
        </div>
    </div>
    )
}

const MainFooter = () => {
    const state = useContext(MainContext);
    let price = 0;
    state.items.map((item) => price += item.phone.price * item.count);
    return (
        <div className="main-footer">
            <div className="line"></div>
            <div className="total">
                <h4>Total</h4>
                <h4>${price}</h4>
            </div>
            <button className="clear">CLEAR CART</button>
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

type StateItem = {
    phone:Phone,
    count: number
}

type State = {
    items : Array<StateItem>
}

type Action = 
    | {type: "incr",title:string} 
    | {type: "dicr",title: string}

function reducer(state : State,action : Action){
    return state;
}

export default function Main() {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (
        <MainContext.Provider value={state}>
            <main>
                <h1>YOUR BAG</h1>
                <div className="items">
                    {state.items.map(item => 
                    <Item 
                        img={item.phone.img} 
                        title={item.phone.title} 
                        price={item.phone.price} 
                        key={Math.random() * 10}
                        />
                    )}
                </div>
                <MainFooter />
            </main>
        </MainContext.Provider>
    )
}

const MainContext = React.createContext<State>({items:[]})

export type {Phone};