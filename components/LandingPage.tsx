"use client"

import React, {useState} from "react";
import {getRecipesByIngredient} from "@/app/actions";
import Image from "next/image";
import RecipesGrid from "@/components/RecipesGrid";

export interface Response {
  hits: Hit[]
}

interface Hit {
  recipe: Recipe
}

interface Recipe {
  label: string
  image: string
}

export const NO_RECIPES_FOUND = "No recipes found. Re-check spelling.";

const LandingPage = () => {
  const [ingredient, setIngredient] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [noRecipeFoundMessage, setNoRecipeFoundMessage] = useState(false)

  const handleIngredientInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value)
  }

  const getRecipes = async () => {
    setRecipes([])
    const response: Response = await getRecipesByIngredient(ingredient)

    if (response && response.hits.length > 0) {
      const retrievedRecipes = response.hits.map((hit: Hit) => {
        return {
          label: hit.recipe.label,
          image: hit.recipe.image
        }
      })
      setRecipes(retrievedRecipes)
      setNoRecipeFoundMessage(false)
    } else {
      setNoRecipeFoundMessage(true)
    }
  }

  return (
      <div className="text-prussian-blue">
        <div className="flex flex-col gap-2 mx-auto md:w-1/2 md:max-w-[500px]">
          <div className="flex content-baseline self-center gap-x-4">
            <Image
                src={"/logo.png"}
                alt={"recipe finder logo"}
                width={0}
                height={0}
                sizes="100vw"
                style={{width: "auto", height: "auto", maxHeight: "4rem"}}
            />
            <h1 className="text-5xl self-center">Recipe Finder</h1>
          </div>
          <label htmlFor="search">Enter ingredients</label>
          <input
              type="text"
              className="rounded border-prussian-blue p-2"
              id="search"
              onChange={handleIngredientInput}
              placeholder="lettuce, tomatoes"
              onKeyDown={async (e: React.KeyboardEvent) => {
                if (e.key === "Enter") {
                  await getRecipes();
                }
              }}
          />
          <button
              className="rounded bg-blue-300 border-solid border-2 border-prussian-blue hover:bg-sky-blue"
              onClick={getRecipes}
          >
            Search
          </button>
        </div>
        <RecipesGrid recipes={recipes}/>
        <div>
          {noRecipeFoundMessage && <p className="text-2xl">{NO_RECIPES_FOUND}</p>}
        </div>
      </div>
  )
}

export default LandingPage
