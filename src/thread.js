import { pubSub } from "./pubsub.js";
function thread (string, separator) {
    if(!string) {
        return "nothing has been specified in the text area.";
    }
    if (!separator) {
        return string;
    }
    pubSub.publish('generateThreads', string.split(separator));
    return string.split(separator);
}
export default thread;
