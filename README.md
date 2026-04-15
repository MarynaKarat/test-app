# Quiz CLI

An interactive command-line quiz game for learning JavaScript and general programming concepts. The app runs in the terminal, lets you choose a category and number of questions, and shows a final score with a short review of missed questions.

## Features

- Interactive CLI flow (category + question count selection)
- Multiple-choice questions with explanations
- Shuffled question order (Fisher–Yates)
- Progress indicator and final results summary
- Zero runtime dependencies (uses Node.js built-ins)

## Requirements

- Node.js **>= 18** (see `package.json` `engines.node`)

## Setup / Installation

```bash
git clone https://github.com/MarynaKarat/test-app.git
cd test-app
npm install
```

## Usage

### Run the quiz

```bash
npm start
```

You will be prompted to:

1. Choose a category
2. Choose how many questions to answer
3. Select answers by entering the option number

### Run tests

```bash
npm test
```

> The project currently uses Node’s built-in test runner (`node --test`). If no test files exist yet, this command may do nothing.

## Example session

```text
Choose a category:
  1. JavaScript Basics
  2. Node.js Fundamentals
  3. General Programming

Your choice (enter number): 1

How many questions?
  1. All questions
  2. 3 questions
  3. 5 questions

Your choice (enter number): 2
```

## Project Structure

> The code references `./src/*` and `data/questions.json`, but the current repository has all `.js` files and `questions.json` at the root. See **Troubleshooting**.

```text
.
├── index.js            # CLI entry point (loads questions, runs main loop)
├── quiz.js             # Quiz class (shuffling, asking, scoring, results)
├── input.js            # Readline-based prompts (select/confirm/pressEnter)
├── colors.js           # ANSI color helpers (no dependencies)
├── questions.json      # Question bank (categories + questions)
└── package.json        # Project metadata and npm scripts
```

## How it works (high level)

- `index.js`
  - Loads questions from JSON.
  - Prompts the user for a category and question count.
  - Creates a `Quiz` instance and loops until all questions are answered.
  - Prints final results and optionally restarts.

- `quiz.js`
  - Implements `Quiz` class.
  - Shuffles question order.
  - Uses `select()` to collect answers.
  - Tracks score and stores per-question answer details for review.

- `input.js`
  - Wraps Node’s `readline` module with promise-based helpers:
    - `prompt()`
    - `select()`
    - `confirm()`
    - `pressEnter()`

- `colors.js`
  - Minimal ANSI escape code utilities for colored terminal output.

## Data format

Questions are stored as JSON with the following shape:

- `categories` object
  - each category has:
    - `name`: string
    - `questions`: array of:
      - `question`: string
      - `options`: string[]
      - `answer`: number (0-based index into `options`)
      - `explanation`: string (optional)

## Troubleshooting

### Module path mismatch (`./src/*`) / missing `data/questions.json`

`index.js` imports:

- `./src/input.js`
- `./src/quiz.js`
- `./src/colors.js`

and loads data from:

- `data/questions.json`

…but in the current repository tree those files live at the root:

- `input.js`, `quiz.js`, `colors.js`, `questions.json`

**Fix option A (recommended): align the file structure**

```bash
mkdir -p src data
mv input.js quiz.js colors.js src/
mv questions.json data/
```

**Fix option B: adjust imports/paths in `index.js`**

- Change `./src/input.js` → `./input.js`
- Change `./src/quiz.js` → `./quiz.js`
- Change `./src/colors.js` → `./colors.js`
- Change `join(__dirname, 'data', 'questions.json')` → `join(__dirname, 'questions.json')`

## License

MIT (see `package.json`).
