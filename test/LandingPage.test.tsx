import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from "@/components/LandingPage";
import {getRecipesByIngredient} from "@/app/actions";

const mockActions = jest.requireMock("../app/actions");
jest.mock("../app/actions", () => ({
    getRecipesByIngredient: jest.fn()
    })
);


describe("Landing Page", () => {
    it("should render an input field", () => {
        render(<LandingPage/>)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button")).toHaveTextContent("Search")
    })

    it("should look for recipes on button click", async () => {
        const  user = userEvent.setup()
        render(<LandingPage/>)

        await user.click(screen.getByRole("button", {name: "Search"}))

        expect(getRecipesByIngredient).toHaveBeenCalledTimes(1)

    })

    it("should display a message if no recipes are found", async () => {
        mockActions.getRecipesByIngredient.mockResolvedValueOnce([])
        render(<LandingPage/>)

        expect(screen.getByText("No recipes found. Re-check spelling.")).toBeInTheDocument()
    })
})