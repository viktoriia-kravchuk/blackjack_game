import React from "react";
import { render, screen, act} from "@testing-library/react";
import CardImage from "../components/GameTable/CardImage";

describe("CardImage component", () => {
    it("should render with the correct class name", () => {
      jest.useFakeTimers();
      const fileName = "2H";
      const delay = 500;
      render(<CardImage fileName={fileName} delay={delay} />);
      const gameCard = screen.queryByTestId("game-card");
      expect(gameCard).toBeNull();
  
      act(() => {
        jest.advanceTimersByTime(delay);
      });
  
      const visibleGameCard = screen.queryByTestId('game-card');
      expect(visibleGameCard?.classList.contains(`card-${fileName}`)).toBe(true);
    });
  
    it("should be visible after the specified delay", () => {
        jest.useFakeTimers();
        const fileName = "2H";
        const delay = 500;
        render(<CardImage fileName={fileName} delay={delay} />);
        const gameCard = screen.queryByTestId("game-card");
        expect(gameCard).toBeNull();
    
        act(() => {
          jest.advanceTimersByTime(delay);
        });
    
        const visibleGameCard = screen.queryByTestId("game-card");
        expect(visibleGameCard).not.toBeNull();
      });
  });