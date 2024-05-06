import {render, screen} from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
    it("should render an input field", () => {
        render(<Home/>)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByRole("button")).toHaveTextContent("Search")
    })
})