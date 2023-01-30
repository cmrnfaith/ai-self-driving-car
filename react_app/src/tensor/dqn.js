const tf = require("@tensorflow/tfjs");

class DQN {
    constructor(inputSize, nbAction, gamma) {
      this.gamma = gamma;
      this.rewardWindow = [];
      this.model = tf.sequential();
      this.model.add(tf.layers.dense({ units: 30, inputShape: [inputSize] }));
      this.model.add(tf.layers.dense({ units: nbAction }));
      this.model.compile({ optimizer: tf.train.adam(0.001), loss: 'meanSquaredError' });
      this.memory = new ReplayMemory(100000);
      this.lastState = tf.tensor([inputSize]).reshape([1, inputSize]);
      this.lastAction = 0;
      this.lastReward = 0;
    }
  
    async selectAction(state) {
      const probs = tf.softmax(this.model.predict(state).mul(tf.scalar(100)));
      const action = await probs.argMax().data();
      return action;
    }
  
    async learn(batchState, batchNextState, batchReward, batchAction) {
      const outputs = this.model.predict(batchState).gather(tf.tensor([batchAction]), 1);
      const nextOutputs = tf.max(this.model.predict(batchNextState), 1);
      const target = this.gamma.mul(nextOutputs).add(batchReward);
      const tdLoss = tf.losses.meanSquaredError(outputs, target);
      this.model.compile({ optimizer: tf.train.adam(0.001), loss: tdLoss });
      await this.model.fit(batchState, target, { batchSize: 100 });
    }
  
    async update(reward, newSignal) {
      const newState = tf.tensor(newSignal).reshape([1, newSignal.length]);
      this.memory.push([this.lastState, newState, this.lastAction, this.lastReward]);
      const action = await this.selectAction(newState);
      if (this.memory.memory.length > 100) {
        const [batchState, batchNextState, batchAction, batchReward] = this.memory.sample(100);
        await this.learn(batchState, batchNextState, batchReward, batchAction);
      }
      this.lastAction = action;
      this.lastState = newState;
      this.lastReward = reward;
      this.rewardWindow.push(reward);
      if (this.rewardWindow.length > 1000) {
        this.rewardWindow.shift();
      }
      return action;
    }
  
    score() {
      return this.rewardWindow.reduce((a, b) => a + b) / (this.rewardWindow.length + 1);
    }
    async save() {
      // Convert the model's weights to a format that can be saved to disk
      const saveResults = await this.model.save('downloads://my-model-1');
      console.log(saveResults);
  }

  async load(file) {
      // Use the TensorFlow.js `load` method to load the model's weights
      // from the uploaded file
      this.model = await tf.loadLayersModel(file);
  }
}

export default DQN;