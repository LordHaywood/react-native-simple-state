import React from 'react';

function getSpreadOper(currentBranch, keys, currentFullKey) {
  let key = keys.shift();
  currentFullKey = [...currentFullKey, ...[key]];
  if (!currentBranch)
    throw `Branch on state ${currentFullKey.join('.')} doesn't exist`;
  return (keys.length === 0) ? currentBranch[key] : getSpreadOper(currentBranch[key], keys, currentFullKey);
}

function spreadOper(currentBranch, keys, value) {
  let key = keys.shift();
  if (!currentBranch) currentBranch = (parseInt(key) >= 0) ? [] : {};
  return (keys.length === 0) ? {
    ...currentBranch,
    [key]: value
  } : {
    ...currentBranch,
    [key]: spreadOper(currentBranch[key], keys, value)
  }
}

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.getState = this.getState.bind(this);
  }

  placeState(key, value) {
    super.setState(spreadOper(this.state, key.split('.'), value));
  }

  retreveState(key) {
    return(getSpreadOper(this.state, key.split('.'), []));
  }
}