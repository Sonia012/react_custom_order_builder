import React from 'react'
import ingredientsData from './ingredientsData'
import CreatePizza from './CreatePizza'
import Overview from './Overview'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            ingredients: ingredientsData,
            size: 1,
            pizzaObj: {
                pizzaIngr: [],
                pizzaPrice: 0
            },
            allPizzasArray: []

        }
    }

    //functies

    getPizzaIngr = () => {        
        const pizza = this.state.ingredients.filter(ingred => ingred.chosen === true)       
        return pizza
    }

    getPizzaPrice = () => {
        const pizza = this.getPizzaIngr()
        const pizzaPrice = pizza.map(ingred => ingred.price * this.state.size).reduce((acc, cur) => acc + cur, 0).toFixed(2)
        return pizzaPrice
    }

    resetCreatePizza = () => {
        this.setState(prevState => {
            const uncheckedIngredients = prevState.ingredients.map(ingredient => {
                ingredient.chosen = false
                return ingredient         
            })
            return {
                ingredients: uncheckedIngredients
            }
        })
    }

    //eventHandlers
    handleSize = (event) => {
        if (event.target.value === "small") {
            console.log("small aangeklikt")
            this.setState({size : 0.8})
            console.log(this.state.size)

        }
        else if (event.target.value === "medium") {
            console.log("medium aangeklikt")
            this.setState({size : 1})
            console.log(this.state.size)
        }
        else if (event.target.value === "large") {
            console.log("large aangeklikt")
            this.setState({size : 1.2})
            console.log(this.state.size)
        }                  
        }
    
    handleChange = (id) => {
        this.setState(prevState => {
            const chosenIngredients = prevState.ingredients.map(ingredient => {
                if (ingredient.id === id) {
                    ingredient.chosen = !ingredient.chosen
                }
                return ingredient         
            })
            return {
                ingredients: chosenIngredients
            }
        })
    }

    handleClickOrder = () => {
        // console.log("Ordered")
        const pizza = this.getPizzaIngr()
        const pizzaAmount = this.getPizzaPrice()
        this.setState(prevState => {
                return {
                pizzaObj: { ...prevState.pizzaObj, pizzaIngr: pizza, pizzaPrice: pizzaAmount}       
                }                
            },
            // callback functie zodat state al gewijzigd is
            () => {
                this.setState({allPizzasArray: this.state.allPizzasArray.concat(this.state.pizzaObj)})
            }
        )
        // werkt niet want blijkbaar is die oorspronkelijke array TOCH gewijzigd
        // this.setState({ingredients: ingredientsData})
       
        this.resetCreatePizza()

        //opgepast: deze console.log geeft de vorige staat weer (asynchroon) !!!!
        //als je de juiste staat wil kennen, consol.loggen in de render() hieronder
        // console.log(this.state.allPizzasArray)
    }

   
    handleClickDelete = () => {
        this.resetCreatePizza()
    }

    handleClickDeletePizza = (e) => {
        console.log("delete pizza werkt", e.target.name)
        // je haalt er 1 uit en dan verandert de oorspronkelijke array
        this.state.allPizzasArray.splice(e.target.name, 1)     
                
        this.setState({allPizzasArray : this.state.allPizzasArray})
    }

    handleClickConfirmOrder = () => {
        alert("Thank you for your order!")
    }


    //render
    render() {
        console.log('deze pizza', this.state.pizzaObj)
        console.log('alle pizzas', this.state.allPizzasArray)
        console.log("in render", this.state.ingredients)
        console.log("oorspronkelijke array", ingredientsData)
        // const ingredItems = this.state.ingredients.map(item => <IngredItem key={item.id} item={item} handleChange={this.handleChange}/>)
        return(
           
            <div>
                 
                <h1>Create your pizza</h1>
                <div className="ingred-list">
                   {/* {ingredItems} */}
                   <CreatePizza
                        ingredients={this.state.ingredients}
                        size={this.state.size}
                        getPizzaIngr={this.getPizzaIngr}
                        getPizzaPrice={this.getPizzaPrice}
                        //volgende functie doorgeven is niet nodig omdat we ze niet rechtstreeks gebruiken in CreatePizza.js
                        // resetCreatePizza={this.resetCreatePizza}
                        handleChange={this.handleChange}
                        handleSize={this.handleSize} 
                        handleClickDelete={this.handleClickDelete}
                        handleClickOrder={this.handleClickOrder}/>
                    <Overview 
                        allPizzasArray={this.state.allPizzasArray}
                        handleClickDeletePizza={this.handleClickDeletePizza}
                        handleClickConfirmOrder={this.handleClickConfirmOrder} />
                        
             </div>
            </div>
        )

    }       
    
}


export default App