import { screen, render } from "@testing-library/react";
import Placeholder from "../src/containers/QuestionsContainer";

const setup = () => {
  return render(<Placeholder questions={[]} />);
};

describe("Placeholder", () => {
  it("Renders Three Cards", () => {
    setup();
    const placeholders = screen.getAllByText(/Placeholder/);

    expect(placeholders.length).toEqual(3);
  });
});
