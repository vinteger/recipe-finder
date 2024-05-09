import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage, {NO_RECIPES_FOUND} from "@/components/LandingPage";
import {getRecipesByIngredient} from "@/app/actions";

const mockActions = jest.requireMock("../app/actions");
jest.mock("../app/actions", () => ({
    getRecipesByIngredient: jest.fn()
    })
);


describe("Landing Page", () => {

    beforeEach(() => {
        jest.resetAllMocks()
    })

    it("should render initial page", () => {
        render(<LandingPage/>)

        expect(screen.getByRole("heading", {name: "Recipe Finder"})).toBeInTheDocument()
        expect(screen.getByText("Enter ingredients")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("lettuce, tomatoes")).toBeInTheDocument()
        expect(screen.getByRole("button")).toHaveTextContent("Search")
        expect(screen.queryByText(NO_RECIPES_FOUND)).not.toBeInTheDocument()
    })

    it("should display a message if no recipes are found", async () => {
        const  user = userEvent.setup()
        mockActions.getRecipesByIngredient.mockResolvedValueOnce({hits: []})
        render(<LandingPage/>)

        await user.type(screen.getByRole("textbox"), "some ingredient")
        await user.click(screen.getByRole("button", {name: "Search"}))

        expect(screen.getByText(NO_RECIPES_FOUND)).toBeInTheDocument()
    })

    it("should display recipes after search", async () => {
        const  user = userEvent.setup()
        const label = "chicken";

        mockActions.getRecipesByIngredient.mockResolvedValueOnce({
            hits: [{recipe: {label, image: "https://localhost:3000/testImage"}}]
        })

        render(<LandingPage/>)

        await user.type(screen.getByRole("textbox"), "some ingredient")
        await user.click(screen.getByRole("button", {name: "Search"}))

        expect(getRecipesByIngredient).toHaveBeenCalledTimes(1)
        expect(await screen.findByText(label)).toBeInTheDocument()
    })

    it("should clear 'no recipes found' message after successful search", async () => {
        const  user = userEvent.setup()
        mockActions.getRecipesByIngredient.mockResolvedValueOnce({hits: []})

        render(<LandingPage/>)

        await user.click(screen.getByRole("button", {name: "Search"}))
        expect(screen.getByText(NO_RECIPES_FOUND)).toBeInTheDocument()

        mockActions.getRecipesByIngredient.mockResolvedValueOnce({
            hits: [{recipe: {label: "label", image: "https://localhost:3000/testImage"}}]
        })
        await user.type(screen.getByRole("textbox"), "some ingredient")
        await user.click(screen.getByRole("button", {name: "Search"}))

        expect(screen.queryByText(NO_RECIPES_FOUND)).not.toBeInTheDocument()
    })

    it("should clear previous search after new search", async () => {
        const  user = userEvent.setup()
        mockActions.getRecipesByIngredient.mockResolvedValueOnce({
            hits: [{recipe: {label: "first", image: "https://localhost:3000/testImage"}}]
        })

        render(<LandingPage/>)

        const ingredientSearchInput = screen.getByRole("textbox")
        await user.type(ingredientSearchInput, "some ingredient")
        await user.click(screen.getByRole("button", {name: "Search"}))

        expect(screen.getByText("first")).toBeInTheDocument()

        mockActions.getRecipesByIngredient.mockResolvedValueOnce({
            hits: []
        })

        await user.clear(ingredientSearchInput)
        await user.click(screen.getByRole("button", {name: "Search"}))

        expect(screen.getByText(NO_RECIPES_FOUND)).toBeInTheDocument()
        expect(screen.queryByText("first")).not.toBeInTheDocument()
    })

    it("should submit on Enter key press while focused on input", async () => {
        const  user = userEvent.setup()
        const label = "chicken";

        mockActions.getRecipesByIngredient.mockResolvedValueOnce({
            hits: [{recipe: {label, image: "https://localhost:3000/testImage"}}]
        })

        render(<LandingPage/>)

        await user.type(screen.getByRole("textbox"), "some ingredient{Enter}")

        expect(getRecipesByIngredient).toHaveBeenCalledTimes(1)
        expect(await screen.findByText(label)).toBeInTheDocument()
    })
})