import React from 'react';

function getSpreadOper(currentBranch, keys, currentFullKey) {
  let key = keys.shift();
  currentFullKey = [...currentFullKey, ...[key]];
  if (!currentBranch)
    throw `Branch on state ${keyToString(currentFullKey)} doesn't exist`;
  return (keys.length === 0) ? currentBranch[key] : getSpreadOper(currentBranch[key], keys, currentFullKey);
}

function spreadOper(currentBranch, keys, value, merge) {
  let key = keys.shift();
  if (!currentBranch) currentBranch = (parseInt(key) >= 0) ? [] : {};
  return (keys.length === 0) ? {
    ...currentBranch,
    [key]: (merge) ? value : {
      ...currentBranch[key],
      ...value
    }
  }
  : {
    ...currentBranch,
    [key]: spreadOper(currentBranch[key], keys, value)
  }
}

function getKey(key) {
  return key.split('.');
}

function keyToString(key) {
  return key.join('.');
}

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.retreveState = this.retreveState.bind(this);
  }

  placeState(key, value, merge) {
    super.setState(spreadOper(this.state, getKey(key), value, merge));
  }

  retreveState(key) {
    return(getSpreadOper(this.state, getKey(key), []));
  }

  updateState(key, value) {
    this.placeState(key, value, true);
  }
}