class ReplayMemory {
  constructor(capacity) {
    this.capacity = capacity;
    this.memory = [];
  }

  push(event) {
    this.memory.push(event);
    if (this.memory.length > this.capacity) {
      this.memory.shift();
    }
  }

  sample(batchSize) {
    let samples = [];
    let selectedIndices = new Set();
    while (samples.length < batchSize) {
      let randomIndex = Math.floor(Math.random() * this.memory.length);
      if (!selectedIndices.has(randomIndex)) {
        samples.push(this.memory[randomIndex]);
        selectedIndices.add(randomIndex);
      }
    }
    return samples;
  }
}
export default ReplayMemory;
