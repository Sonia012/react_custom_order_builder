import React from 'react'

function IngredItem(props) {
    return(
       <div className="ingred-item">
            <p>{props.item.name} €{(Math.round(props.item.price * props.size * 100)/100).toFixed(2)}</p>

            <input
                type="checkbox"
                checked={props.item.chosen}
                onChange={() => props.handleChange(props.item.id)}
            />
                   
       </div>
    )
}

export default IngredItem