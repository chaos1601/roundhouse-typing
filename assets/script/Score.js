'use strict';

class Score {
  #date;
  #hits;
  #percentage;

  constructor(date, hits, percentage) {
    this.#date = date || new Date();
    this.#hits = hits;
    this.#percentage = percentage;
  }

  get date() { return this.#date; }

  get hits() { return this.#hits; }

  get percentage() { return this.#percentage; }
}

export { Score };