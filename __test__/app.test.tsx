import React from "react";
import "@testing-library/react";
import { render } from "@testing-library/react";
import App from "../src/App";

test("renders starting page when game state is idle", () => {
  const { getByTestId } = render(<App/>);
  const startingPage = getByTestId("starting-page");
  expect(startingPage).toBeInTheDocument();
});

test("renders game table when game state is not idle", () => {
  jest.spyOn(require("./stores/GameStore"), "default").mockReturnValue({
    gameState: "playing",
  });
  const { getByTestId } = render(<App />);
  const gameTable = getByTestId("game-table");
  expect(gameTable).toBeInTheDocument();
});