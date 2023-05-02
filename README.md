# React/TypeScript/MobX Blackjack Game

This is a simple implementation of the Blackjack game using the React, TypeScript, and MobX technologies. It provides a user interface where users can interact with the game and play Blackjack. The game is implemented using MobX for state management.

## An explanation of the game progression

- Face cards are valued at 10, number cards are valued by their number, and an ace can be valued as 1 or 11.
- Shuffle the deck of cards
- Deal two cards to the player and two cards to the dealer
- Calculate the total value of the player's hand
- Determine if the player has blackjack or if they can hit or stand
- If the player hits, deal another card and recalculate the total value
- If the player stands, the dealer reveals their second card and hits until their hand value is 17 or higher
- Determine the winner based on the total value of each hand

## Features

The following features are implemented in the application:

- Users can play Blackjack.

- Users can hit/stand or surrender.

- Users can reset the game.

- Users can see their score and the dealer's score.

- Users can see a message indicating whether they won or lost.

## Example


## Project Structure

The project has the following structure:

- `src/App.tsx`: The main entry point of the application.

- `src/components`: Contains the application's React components.

- `src/stores`: Contains the application's MobX store.

## Technologies Used

The application was developed using the following technologies:

- React: A popular JavaScript library for building user interfaces.

- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

- MobX: A state management library that makes it easy to manage application state.

- CSS

## Installation

1\. Clone the repository to your local machine.

2\. Navigate to the root directory of the project.

3\. Run `npm install` or `yarn` to install the project dependencies.

## Running the Application

1\. Navigate to the root directory of the project.

2\. Run `npm start` or `yarn start` to start the development server.

3\. The application should now be running at <http://localhost:3000/>.
