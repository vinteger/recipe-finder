/**
 * @jest-environment node
 */
import {getRecipesByIngredient} from "@/app/actions";

const testLabel = "some label"
const testImage = "some image"
let ingredientParam = "test";

describe("test api", () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it("should fetch recipes from the correct url with ingredient", async () => {
        const fetchMock = jest
            .spyOn(global, 'fetch')
            .mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    status: 200,
                    json: async () => ({hits: [{recipe: {label: testLabel, image: testImage}}]})
                } as unknown as Response),
            )

        await getRecipesByIngredient(ingredientParam)

        expect(fetchMock)
            .toHaveBeenCalledWith(
                `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&q=${ingredientParam}`
            );
    })

    it("should return null if fetch fails", async () => {
        jest.spyOn(global, 'fetch')
            .mockImplementation(() =>
                Promise.resolve({
                    ok: false,
                    status: 500
                } as unknown as Response),
            )
        const errorMessage = "Failed to fetch recipe data"
        jest.spyOn(console, 'error').mockImplementation(() => {});

        const response = await getRecipesByIngredient(ingredientParam)

        expect(response).toBeNull()
        expect(console.error).toHaveBeenCalledWith(errorMessage)
    })

    it("should return null if error occurs when fetching", async () => {
        const error = new Error("Whoops");
        jest.spyOn(global, 'fetch')
            .mockImplementation(() => {
                return Promise.reject(error);
            })
        const errorMessage = "Error fetching recipe data"
        jest.spyOn(console, 'error').mockImplementation(() => {});

        const response = await getRecipesByIngredient(ingredientParam)

        expect(response).toBeNull()
        expect(console.error).toHaveBeenCalledWith(errorMessage, error)
    })
});