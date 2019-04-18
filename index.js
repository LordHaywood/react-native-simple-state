import React from 'react';
import { getFromObj, addToObj, removeFromObj, updateObj } from './lib/index';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.retreveState = this.retreveState.bind(this);
  }

  placeState(key, value, merge) {
    super.setState(addToObj(this.state, key, value, merge));
  }

  retreveState(key) {
    return getFromObj(this.state, key);
  }

  updateState(key, value) {
    super.setState(updateObj(this.state, key, value));
  }

  deleteState(key) {
    super.setState(removeFromObj(this.state, key));
  }
}