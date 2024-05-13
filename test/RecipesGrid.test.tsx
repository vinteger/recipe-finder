import {render, screen} from "@testing-library/react";
import RecipesGrid, {Recipe} from "@/components/RecipesGrid";

describe("Recipes Grid", () => {

  it("Should render initial page",  () => {
    const mockRecipes: Recipe[] = [{label: "chicken soup", image: "https://localhost:3000/testImage"}]
    render(<RecipesGrid recipes={mockRecipes}/>)

    expect(screen.queryByText("chicken soup")).toBeInTheDocument();
    expect(screen.queryByAltText("chicken soup")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", expect.stringContaining("testImage"))
  })
})