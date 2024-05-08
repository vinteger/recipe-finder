import {getRecipesByIngredient} from "@/app/actions";

const fetchMock = jest
.spyOn(global, 'fetch')
.mockImplementation(() =>
    Promise.resolve( {
        ok: true,
        status: 200,
        json: async () => ({hits: [{recipe: {label: "test", image: "test"}}]})
    } as unknown as Response),
)


describe("test api", () => {

    afterEach(() => {
      jest.resetAllMocks()
    })

    it("should return recipes", async () => {
        const response = await getRecipesByIngredient("test")
        expect(fetchMock).toHaveBeenCalled();
        // expect(response.hits[0].recipe.label).toBe("test")
        // expect(response.hits[0].recipe.image).toBe("test")
    })
});