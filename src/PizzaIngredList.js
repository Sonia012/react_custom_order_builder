import React from 'react'

// ingredientenlijst van 1 pizza
function PizzaIngredList(props) {
    return (props.ingredients.map(ingr => <li>{ingr.name}</li>))
}

export default PizzaIngredList