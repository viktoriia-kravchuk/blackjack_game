import React from "react";
import "@testing-library/react";
import { render, screen, fireEvent} from "@testing-library/react";
import App from "../App";
import {GameState} from "../types";
import { BlackjackStore } from "../stores/GameStore";
// import blackjackStore from "./stores/GameStore";



describe(("App"), ()=> {
  let store: BlackjackStore;

  beforeEach(() => {
    store = new BlackjackStore();
  });

  it("renders starting page when game state is idle", () => {
    const { getByTestId } = render(<App/>);
    const startingPage = getByTestId("starting-page");
    expect(startingPage).toBeInTheDocument();
  });

  it('renders game table when click on play button', () => {
    render(<App />);
    const button = screen.getByAltText("play-logo");
    const gameTable = screen.queryByTestId('game-table');

    expect(gameTable).not.toBeInTheDocument();

    fireEvent.click(button);

    const gameTableAfterStateChange = screen.queryByTestId('game-table');
    expect(gameTableAfterStateChange).toBeInTheDocument();
  });
})

