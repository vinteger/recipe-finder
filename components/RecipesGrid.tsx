import Image from "next/image";
import React from "react";
export interface Recipe {
  label: string
  image: string
}
const RecipesGrid = ({recipes}: { recipes: Recipe[]}) => {
  return <>
    <div className="flex justify-center p-10">
      {recipes.length > 0 &&
          <div
              className="grid sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] w-full self-center gap-10">
            {recipes.map((recipe, index) => (
                <div
                    key={`${index}-${recipe.label}`}
                >
                  <div className="flex flex-col">
                    <h1 className="h-16 text-2xl mb-1">{recipe.label}</h1>
                    <Image
                        src={recipe.image}
                        alt={recipe.label}
                        className="rounded-xl"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{width: "100%", height: "auto"}}
                    />
                  </div>
                </div>
            ))}
          </div>
      }
    </div>
  </>
}

export default RecipesGrid
