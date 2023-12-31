'use strict';

import { Score } from "./Score.js";

const currentWordElement = document.querySelector('.currentWord');
const scoreElement = document.querySelector('.score');
const timerElement = document.querySelector('.timer');
const wordInput = document.querySelector('.wordInput');
const music = document.querySelector('.bgMusic');
const startButton = document.querySelector('.startButton');
const restartButton = document.querySelector('.restartButton');
const scoreButton = document.querySelector('.scoreButton');
const dialog = document.querySelector('dialog');
const highScore = document.querySelector('.highScore');


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

let timeRemaining = 16;
let score = 0;
let timer;
let currentWordIndex;
wordInput.disabled = true;
let messageElement;
let highScores = [];
let percentage = ((score / words.length) * 100).toFixed(2);

let shuffledWords = [...words];

function shuffleWordsArray() {
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }
}

// Function to start/restart the game
function startGame() {
  wordInput.value = '';
  clearInterval(timer);
  timeRemaining = 16;
  score = 0;
  currentWordIndex = 0;
  updateScore();
  timer = setInterval(updateTimer, 1000);

  // Disable the input field initially
  wordInput.disabled = false;
  restartButton.style.display = 'inline-block';
  startButton.style.display = 'none';
}

// Function to display the current word
function displayWord() {
  const remainingWords = shuffledWords.filter((word, index) => index !== currentWordIndex);
  const randomIndex = Math.floor(Math.random() * remainingWords.length);
  currentWordElement.innerText = remainingWords[randomIndex];
  currentWordIndex = shuffledWords.indexOf(remainingWords[randomIndex]); // Update currentWordIndex for scoring purposes
}

// Function to update the score
function updateScore() {
  scoreElement.innerText = score;
}

// Function to display a message when the timer runs out
function displayTimeUpMessage() {
  currentWordElement.innerText = "Time's up!";
  wordInput.disabled = true; // Disable input field after time's up
  // Add your message display logic here
  messageElement = document.createElement('p');
  messageElement.innerText = (`Your time has ended. You got a total score of ${score}.`);
  document.querySelector('.game').appendChild(messageElement);
}

function removeMessage() {
  if (messageElement) {
    messageElement.remove();
  }
}

// function to update the timer
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
wordInput.addEventListener('input', function (userValue) {
  const typedWord = userValue.target.value.trim().toLowerCase();
  const currentWord = words[currentWordIndex];

  if (typedWord === currentWord) {
    score++;
    currentWordIndex++;
    displayWord();
    updateScore();
    userValue.target.value = '';
  }
});

// Function to end the game
function endGame() {
  // Stop background music
  music.pause();

  const currentDate = new Date();
  const currentScore = new Score(currentDate, score, percentage);

  updateHighScores(currentScore);
  saveHighScores();
  displayHighScores();

  wordInput.value = '';
}

// Event listener for the start button
startButton.addEventListener('click', function () {
  wordInput.focus();
  startGame();
  startButton.innerText = 'Restart';
  // Play background music
  music.play();
});

function resetGame() {
  clearInterval(timer);
  timeRemaining = 16;
  score = 0;
  currentWordIndex = 0;
  wordInput.focus();
  updateScore();
  timer = setInterval(updateTimer, 1000);
  wordInput.disabled = false; // Enable the input field
  music.currentTime = 0; // Reset the music to the beginning
  music.play();

  wordInput.value = '';
}

// Event listener for the start button
startButton.addEventListener('click', function () {
  wordInput.focus();
  startGame();
  displayWord(); // Display the first word when the game starts
  music.play(); // Play background music
});

// Event listener for the restart button
restartButton.addEventListener('click', function () {
  timeRemaining = 16;
  wordInput.focus();
  resetGame();
  displayWord();
  removeMessage();
});

let volume = music.volume; // Initial volume set to the audio element's volume
volume = 0.5;

scoreButton.addEventListener('click', () => {
  dialog.showModal();
});

function saveHighScores() {
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Function to get the high score from localStorage
function getHighScores() {
  const storedScores = localStorage.getItem('highScores');
  return storedScores ? JSON.parse(storedScores) : [];
}

function updateHighScores(scoreObject) {
  const currentDate = new Date();
  const currentScore = new Score(currentDate, score, percentage);
  highScores.push(currentScore);
  // Sort high scores in descending order based on hits (score)
  highScores.sort((a, b) => b.hits - a.hits);
  // Keep only the top 10 high scores
  highScores = highScores.slice(0, 10);
}

function displayHighScores() {
  const storedHighScores = getHighScores();

  if (storedHighScores && storedHighScores.length > 0) {
    let highScoreText = '';
    storedHighScores.forEach((score, index) => {
      const formattedDate = score.date ? score.date.toLocaleDateString() : 'N/A'; // Check if date is defined
      highScoreText += `#${index + 1} Date: ${formattedDate}, Score: ${score.hits}, Percentage: ${score.percentage}%\n`;
    });
    highScore.innerText = highScoreText;
  } else {
    highScore.innerText = 'No high scores available yet.';
  }
}

dialog.addEventListener('click', function(event) {
  const rect = this.getBoundingClientRect();

  if (event.clientY < rect.top || event.clientY > rect.bottom || event.clientX < rect.left || event.clientX > rect.right) {
      dialog.close();
  }
});