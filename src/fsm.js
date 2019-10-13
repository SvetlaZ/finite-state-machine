class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config) {
            this.state    = config.initial;
            this.initial  = config.initial;
            this.states   = config.states;
            this.undoList = [];
            this.redoList = [];
        } else {
            throw new Error();
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state; 
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) { 
        if (this.states[state]) {
            this.undoList.push(this.state);  
            this.state = state;
            this.redoList = [];
        } else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.state].transitions[event]) {
            this.undoList.push(this.state);
            this.state = this.states[this.state].transitions[event];
            this.redoList = [];
        } else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let array = [];

        for (let state in this.states) {
            if (!event || this.states[state].transitions[event]) {
                array.push(state);
            }
        }
        
        return array;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoList.length) {
            this.redoList.push(this.state);
            this.state = this.undoList.pop();
            
            return true;
        }
        
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoList.length) {
            this.undoList.push(this.state);
            this.state = this.redoList.pop();
            
            return true;
        }
        
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoList = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
