export interface Game {
    created: number;
    guessesLeft: number;
    lettersToGuess: Array<string>;
    letters: Array<Letter>;
    currentScore: number;
    won: boolean;
    lost: boolean;
}

export interface Letter {
    letter: string;
    chosen: boolean;
}
