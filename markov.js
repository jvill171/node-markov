/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {

    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
                
        let word = this.words[i];
        let nextWord = this.words[i + 1] || null;
        
        if (chains.has(word)){
            // Ensure nextWord is unique within the mapped word
            if(!Array.from(chains.get(word)).includes(nextWord)){
                chains.get(word).push(nextWord);
            }
        }
        else{
            chains.set(word, [nextWord]);
        }
    }
    this.chains = chains;
  }


  // Takes an array & returns a random item in the array
  static choice(arr) {
    // console.log(arr)
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys.filter(word => word[0] == word[0].toUpperCase()));
    let result = [];
    // produce markov chain until reaching termination word
    while (result.length < numWords && key !== null) {
        result.push(key);
        key = MarkovMachine.choice(this.chains.get(key));
    }
    return result.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};