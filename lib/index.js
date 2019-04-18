exports.getFromObj = function(currentBranch, key) {
  const keys = getKey(key);
  return getFromObjInternal(currentBranch, keys, []);
}

function getFromObjInternal(currentBranch, keys, currentFullKey) {
  let key = keys.shift();
  currentFullKey = [...currentFullKey, ...[key]];
  if (!currentBranch)
    throw `Branch on state ${keyToString(currentFullKey)} doesn't exist`;
  return (keys.length === 0) ? currentBranch[key] : getFromObjInternal(currentBranch[key], keys, currentFullKey);
}

exports.addToObj = function(currentBranch, key, value, merge) {
  const keys = getKey(key);
  return addToObjInternal(currentBranch, keys, value, merge);
}

function addToObjInternal(currentBranch, keys, value, merge) {
  let key = keys.shift();
  if (!currentBranch) currentBranch = (parseInt(key) >= 0) ? [] : {};
  if (keys.length === 0) {
    if (isArray(currentBranch)) {
      currentBranch[key] = value;
      return currentBranch;
    } 
    return  {
      ...currentBranch,
      [key]: (merge && (typeof value === 'object')) ? {
        ...currentBranch[key],
        ...value
      } : value
    }
  } else {
    if (isArray(currentBranch)) {
      currentBranch[key] = value;
      return currentBranch;
    } 
    return  {
      ...currentBranch,
      [key]: addToObjInternal(currentBranch[key], keys, value, merge)
    }
  }
}

function isIn(value, array) {
  return array.indexOf(value) !== -1;
}

function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}

function isMap(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function isValue(value) {
  return value && isIn(typeof value, ["string", "boolean", "number", "undefined", "symbol", "function"]);
}

exports.removeFromObj = function(currentBranch, key) {
  const keys = getKey(key);
  return removeFromObjInternal(currentBranch, keys, []);
}

function removeFromObjInternal(currentBranch, keys, currentFullKey) {
  let key = keys.shift();
  if (!currentBranch)
    throw `Branch on state ${keyToString(currentFullKey)} doesn't exist`;

  if (keys.length === 0)  {
    if (isArray(currentBranch)) {
      currentBranch.splice(parseInt(key), 1);
    } else {
      delete currentBranch[key];
    }
    return currentBranch;
  } else {
    if (isArray(currentBranch)) {
      currentBranch[key] = removeFromObjInternal(currentBranch[key], keys, currentFullKey);
      return currentBranch;
    } else return {
      ...currentBranch,
      [key]: removeFromObjInternal(currentBranch[key], keys, currentFullKey)
    }
  }
}

function mergeUpdate(prev, add) {
  if ((isArray(prev) && isArray(add)) || (isMap(prev) && isMap(add))) {
    for (var field in add) {
      prev[field] = updateObj(prev[field], getKey(field), add[field]);
    }
  } else if (isValue(add) || isArray(add) || isMap(add)) {
    prev = add;
  }
  return prev;
}

exports.updateObj = function(currentBranch, key, value) {
  const keys = getKey(key);
  return updateObjInternal(currentBranch, keys, value);
}

function updateObjInternal(currentBranch, keys, value) {
  let key = keys.shift();
  if (!currentBranch) currentBranch = (parseInt(key) >= 0) ? [] : {};
  if (isArray(currentBranch)) {
    currentBranch[key] = (keys.length === 0) ? mergeUpdate(currentBranch[key], value) : updateObjInternal(currentBranch[key], keys, value)
    return currentBranch;
  } else {
    return {
      ...currentBranch,
      [key]: (keys.length === 0) ? mergeUpdate(currentBranch[key], value) : updateObjInternal(currentBranch[key], keys, value)
    }
  }
}

function getKey(key) {
  if (key.length <= 0) 
    throw "Key is not valid";
  let keys = key.split('.');
  for (let i in keys) 
    if (+keys[i] > 0)
      keys[i] = +keys[i];
  return keys;
}

function keyToString(key) {
  return key.join('.');
}
