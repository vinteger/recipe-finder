"use client"

import React, {useState} from "react";
import {getRecipesByIngredient} from "@/app/actions";

export interface Response {
    hits: Hit[]
}

interface Hit {
    recipe: Recipe
}

interface Recipe  {
    label: string
    image: string
}

const LandingPage = () => {
    const [ingredient, setIngredient] = useState("")
    const [recipes, setRecipes] = useState<Recipe[]>([])

    const handleIngredientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(e.target.value)
    }

    const getRecipes = async () => {
        const response: Response = await getRecipesByIngredient(ingredient)

        if (response && response.hits) {
            const retrievedRecipes = response.hits.map( (hit: Hit) => {
                return {
                    label: hit.recipe.label,
                    image: hit.recipe.image
                }
            })
            setRecipes(retrievedRecipes)
        }
    }

    return (
        <>
        <div className="flex flex-col gap-2">
            <input type="text" className="rounded border-prussian-blue" onChange={handleIngredientInput}/>
            <button
                className="rounded bg-blue-300 border-solid border-2 border-prussian-blue text-prussian-blue hover:bg-sky-blue"
                onClick={getRecipes}
            >
                Search
            </button>
        </div>
            {recipes.length > 0 &&
                recipes.map((recipe, index) => (
                    <div key={`${index}-${recipe.label}`}>
                        <h1>{recipe.label}</h1>
                        <img src={recipe.image} alt={recipe.label}/>
                    </div>
                ))
            }
        </>
    )
}

export default LandingPage
