import { render, screen, fireEvent } from "@testing-library/react";
import { BlackjackStore } from "../stores/GameStore";
import ActionButtons from "../components/ActionButtons/ActionButtons";
import { GameState } from "../types";

// jest.mock("mobx-react");

describe("ActionButtons", () => {
  let store: BlackjackStore;
  beforeEach(() => {
    store = new BlackjackStore();
    // store.shuffleDeck();
    // store.setGameState(GameState.Betting);
    // store.placeBet(10);

    jest.clearAllMocks();
  });

  it("should render Reset button initially", () => {
    render(<ActionButtons />);
    expect(screen.getByText("RESET")).toBeInTheDocument();
  });
});