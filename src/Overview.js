import React from "react"
import PizzaIngredList from "./PizzaIngredList"

function Overview(props) {

    const totalPrice = props.allPizzasArray.map(pizza => Number(pizza.pizzaPrice)).reduce((acc, cur) => acc + cur, 0).toFixed(2)
    console.log("totale prijs", totalPrice)
    // 
    
    const allPizzas = props.allPizzasArray.map(pizza => {
        return (
            <div>
                <h3>Pizza {props.allPizzasArray.indexOf(pizza) + 1}</h3>
                <PizzaIngredList key={props.allPizzasArray.indexOf(pizza)} ingredients={pizza.pizzaIngr}/>
                <p>€{pizza.pizzaPrice}</p>
                <button name={props.allPizzasArray.indexOf(pizza)} onClick={props.handleClickDeletePizza}>Delete pizza</button>
            </div>
        )
    })
     
    return (
        <div>
            <h1>Order overview </h1>
             
            {allPizzas}
    
            <h1>Total: €{totalPrice}</h1>
            <button onClick={props.handleClickConfirmOrder}>Confirm order</button>



        </div>
    )
}

export default Overview