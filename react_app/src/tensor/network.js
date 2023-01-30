const tf = require("@tensorflow/tfjs");
class Network {
    constructor(input_size, nb_action) {
        this.input_size = input_size;
        this.nb_action = nb_action;
        this.fc1 = tf.layers.dense({ units: 30, inputShape: [input_size] });
        this.fc2 = tf.layers.dense({ units: nb_action });
      }
    
      async forward(state) {
        let x = this.fc1.apply(state);
        x = tf.relu(x);
        let q_values = this.fc2.apply(x);
        return q_values;
      }
}
export default Network;