const tf = require("@tensorflow/tfjs");

class DQN {
  constructor(inputSize, outputSize, gamma) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.gamma = gamma;
    this.memory = [];
    this.model = this.createModel();
  }

  createModel() {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 30,
        inputShape: [this.inputSize],
        activation: "relu",
      })
    );
    model.add(
      tf.layers.dense({ units: this.outputSize, activation: "linear" })
    );
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });
    return model;
  }

  selectAction(state) {
    const qValues = this.model.predict(tf.tensor2d(state, [1, this.inputSize]));
    const action = tf.argMax(qValues).dataSync()[0];
    return action;
  }

  learn(batch) {
    const states = tf.torward(batch.state);
    const nextQValues = this.model.predict(tf.tensor2d(batch.nextState));
    const maxNextQValues = tf.max(nextQValues, 1);
    const targetQValues = states
      .mul(this.gamma)
      .add(batch.reward)
      .add(maxNextQValues.mul(1 - this.gamma));
    const inputs = tf.tensor2d(batch.state);
    const targets = tf.tensor2d(targetQValues.dataSync());
    this.model.fit(inputs, targets, { epochs: 1 });
  }
  update(reward, newState) {
    this.memory.push({
      state: this.lastState,
      nextState: newState,
      reward: reward,
    });
    if (this.memory.length > 100) {
      this.memory.shift();
    }
    if (this.memory.length > 50) {
      const batch = this.getRandomBatch(this.memory, 50);
      this.learn(batch);
    }
    this.lastState = newState;
  }

  getRandomBatch(memory, size) {
    const randomIndices = tf.randomUniform([size], 0, memory.length, "int32");
    const states = tf.gather(
      memory.map((item) => item.state),
      randomIndices
    );
    const nextStates = tf.gather(
      memory.map((item) => item.nextState),
      randomIndices
    );
    const rewards = tf.gather(
      memory.map((item) => item.reward),
      randomIndices
    );
    return {
      state: states.dataSync(),
      nextState: nextStates.dataSync(),
      reward: rewards.dataSync(),
    };
  }
}
