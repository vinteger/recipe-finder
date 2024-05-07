"use server"

export async function getRecipesByIngredient(ingredient: string) {
    try {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&q=${ingredient}`);
        if (!response.ok) {
            console.error('Failed to fetch recipe data');
            return null;
        }
        return await response.json()
    } catch (error) {
        console.error("Error fetching recipe data", error)
        return null;
    }
}