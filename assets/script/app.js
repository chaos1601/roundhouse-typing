'use strict';

import { Score } from "./Game.js";

const currentWordElement = document.querySelector('.currentWord');
const scoreElement = document.querySelector('.score');
const timerElement = document.querySelector('.timer');
const wordInput = document.querySelector('.wordInput');
const music = document.querySelector('.bgMusic');
const startButton = document.querySelector('.startButton');
const restartButton = document.querySelector('.restartButton');


const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
    'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
];

let timeRemaining = 99;
let score = 0;
let timer;
let currentWordIndex;

let shuffledWords = [...words];

function shuffleWordsArray() {
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }
}

// Function to start/restart the game
function startGame() {
  clearInterval(timer);
  timeRemaining = 99;
  score = 0;
  currentWordIndex = 0;
  displayWord();
  updateScore();
  timer = setInterval(updateTimer, 1000);
  wordInput.disabled = false; // Enable the input field
  restartButton.style.display = 'inline-block';
  startButton.style.display = 'none';
}

// Function to display the current word
function displayWord() {
  const remainingWords = words.filter((word, index) => index !== currentWordIndex);
  const randomIndex = Math.floor(Math.random() * remainingWords.length);
  currentWordElement.innerText = remainingWords[randomIndex];
  currentWordIndex = words.indexOf(remainingWords[randomIndex]); // Update currentWordIndex for scoring purposes
}

// function displayWord() {
//   if (shuffledWords.length === 0) {
//     shuffledWords = [...words]; // Reset the shuffledWords array when all words have been displayed
//   }

//   const randomIndex = Math.floor(Math.random() * shuffledWords.length);
//   currentWordElement.innerText = shuffledWords[randomIndex];
//   currentWordIndex = shuffledWords.indexOf(shuffledWords[randomIndex]); // Update currentWordIndex for scoring purposes

//   // Remove the displayed word from the array
//   shuffledWords.splice(randomIndex, 1);
// }

// Function to update the score
function updateScore() {
  scoreElement.innerText = score;
}

// Function to display a message when the timer runs out
function displayTimeUpMessage() {
  currentWordElement.innerText = "Time's up!";
  wordInput.disabled = true; // Disable input field after time's up
  // Add your message display logic here
  const messageElement = document.createElement('p');
  messageElement.innerText = (`Your time has ended. You got a total score of ${score}.`);
  document.querySelector('.game').appendChild(messageElement);
}

// function to udate the timer
function updateTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerElement.innerText = timeRemaining;
  } else {
    clearInterval(timer); // Stop the timer
    displayTimeUpMessage(); // Call function to display time's up message
    endGame();
  }
}

// Function to handle user input
wordInput.addEventListener('input', function (e) {
  const typedWord = e.target.value.trim().toLowerCase();
  const currentWord = words[currentWordIndex];

  if (typedWord === currentWord) {
    score++;
    currentWordIndex++;
    displayWord();
    updateScore();
    e.target.value = '';
  }
});

// Function to end the game
function endGame() {
  // Stop background music
  music.pause();

  // Calculate score percentage
  const percentage = ((score / words.length) * 100).toFixed(2);

  const currentDate = new Date();
  const currentScore = new Score(currentDate, score, percentage);
}

// Event listener for the start button
startButton.addEventListener('click', function () {
  startGame();
  startButton.innerText = 'Restart';
  // Play background music
  music.play();
});

function resetGame() {
  clearInterval(timer);
  timeRemaining = 99;
  score = 0;
  currentWordIndex = 0;
  displayWord();
  updateScore();
  timer = setInterval(updateTimer, 1000);
  wordInput.disabled = false; // Enable the input field

  music.currentTime = 0; // Reset the music to the beginning
  music.play();
}

// Event listener for the start button
startButton.addEventListener('click', function () {
  startGame();
  music.play(); // Play background music
});

// Event listener for the restart button
restartButton.addEventListener('click', function () {
  resetGame();
});

let volume = music.volume; // Initial volume set to the audio element's volume
music.volume = 0.5;

// Function to increase the volume
function increaseVolume() {
  if (volume < 1) {
    volume += 0.1; // Increase volume by 0.1 (can adjust this value)
    music.volume = volume;
  }
}

// Function to decrease the volume
function decreaseVolume() {
  if (volume > 0) {
    volume -= 0.1; // Decrease volume by 0.1 (can adjust this value)
    music.volume = volume;
  }
}

// Event listener for keyboard controls
document.addEventListener('keydown', function (event) {
  // Increase volume when the 'Up' arrow key is pressed
  if (event.key === 'ArrowUp') {
    increaseVolume();
  }

  // Decrease volume when the 'Down' arrow key is pressed
  if (event.key === 'ArrowDown') {
    decreaseVolume();
  }
});