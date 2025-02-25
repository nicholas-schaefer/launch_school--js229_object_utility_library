"use strict";

const _ = function _(...underscoreArgs) {

  return {
    first() {
      const arr = underscoreArgs[0];
      if (!Array.isArray(arr)) throw new Error('Invalid type');

      return arr[0];
    },
    last() {
      const arr = underscoreArgs[0];
      if (!Array.isArray(arr)) throw new Error('Invalid type');

      return arr[arr.length - 1];
    },
    without(...elsToRemove) {
      const arrToFilter = underscoreArgs[0];

      return arrToFilter.filter((elCandidate) => {
        return elsToRemove.every((elToRemove) => elCandidate !== elToRemove);
      });
    },
    lastIndexOf(elToMatch) {
      const arrToSearch = underscoreArgs[0];
      return arrToSearch.lastIndexOf(elToMatch);
    },
    sample(...args) {
      if (underscoreArgs.length === 0 || !Array.isArray(underscoreArgs[0])) throw new Error("Calling object must be an array");
      const arrToSample = underscoreArgs[0];
      let sampleCount = args[0] ?? 1;
      if (!Number.isInteger(sampleCount) || sampleCount < 0) throw new Error();

      const arrUnsampledIndexes = _.range(arrToSample.length);
      const arrSampledElements = [];

      while (arrUnsampledIndexes.length > 0 && sampleCount > 0) {
        const randomIdx = Math.floor(Math.random() * arrUnsampledIndexes.length);
        const idxToSample = arrUnsampledIndexes[randomIdx];
        arrSampledElements.push(arrToSample[idxToSample]);
        arrUnsampledIndexes.splice(randomIdx, 1);
        sampleCount -= 1;
      }

      return arrSampledElements.length === 1 ? arrSampledElements[0] : arrSampledElements;
    },
    findWhere(objToMatch) {
      const MATCH_NOT_FOUND = undefined
      if (underscoreArgs.length === 0) return MATCH_NOT_FOUND;
      const arrOfObjects = underscoreArgs[0];

      const indexMatch = arrOfObjects.findIndex((possibleObjMatch) => {
        return Object.entries(objToMatch).every(([prop, val]) => {
          return (Object.hasOwn(possibleObjMatch, prop)) && (val === possibleObjMatch[prop]);
        })
      })

      return indexMatch === -1 ? MATCH_NOT_FOUND : arrOfObjects[indexMatch];
    },
    where(objToMatch) {
      const arrOfObjects = underscoreArgs[0];

      return arrOfObjects.filter((possibleObjMatch) => {
        return Object.entries(objToMatch).every(([prop, val]) => {
          return (Object.hasOwn(possibleObjMatch, prop)) && (val === possibleObjMatch[prop]);
        })
      })
    },
    pluck(propToMatch) {
      const arrOfObjects = underscoreArgs[0];

      return arrOfObjects.reduce((arrResults, possibleObjMatch)=>{
        Object.hasOwn(possibleObjMatch, propToMatch) && arrResults.push(possibleObjMatch[propToMatch])

        return arrResults;
      }, [])

    },
    keys() {
      const obj = underscoreArgs[0];

      return Object.keys(obj);
     },
    values() {
      const obj = underscoreArgs[0];

      return Object.values(obj);
    },
    pick(...propsToCopy) {
      const oldObj = underscoreArgs[0];

      return propsToCopy.reduce((newObj, propToCopy) =>{
        if (Object.hasOwn(oldObj, propToCopy)){
          newObj[propToCopy] = oldObj[propToCopy];
        }

        return newObj;
      }, {});

    },
    omit(...propsToOmit) {
      const oldObj = underscoreArgs[0];

      const propsToOmitSet = new Set(propsToOmit);
      const newObj = {}

      Object.entries(oldObj).forEach(([prop, val]) =>{
        if (!propsToOmitSet.has(prop)){
          newObj[prop] = val;
        }
      })

      return newObj;
    },
    has(propToFind) {
      const obj = underscoreArgs[0];

      return Object.hasOwn(obj, propToFind);
    },
    isElement(){

    },
    isArray(arg){
      return Array.isArray(arg);
    },
    isObject(arg){
      console.log(typeof arg === 'object')
      console.log(typeof arg === 'function')
      return typeof arg === 'object' || typeof arg === 'function';
    },
    isFunction(arg){
      return typeof arg === 'function';
    },
    isBoolean(arg){
      console.log(typeof arg)
      return typeof arg === 'boolean';
    },
    isString(arg){
      return typeof arg === 'string';
    },
    isNumber(arg){
      return Number.isNumber(arg);
    },
  }
}

_.isElement = function isElement(){

}

_.isArray = function isArray(arg){
  return this().isArray(arg)
}

_.isObject = function isObject(arg){
  return this().isObject(arg)
}

_.isFunction = function isFunction(arg){
  return this().isFunction(arg)
}

_.isBoolean = function isBoolean(arg){
  return this().isBoolean(arg)
}

_.isString = function isString(arg){
  return this().isString(arg)
}

_.isNumber = function isNumber(arg){
  return this().isNumber(arg)
}

_.extend = function range(...objects) {
  const newObj = Object.assign(...objects);

  return newObj;

}

_.range = function range(...args) {
  const rangeArr = args;

  if (rangeArr.length === 0 || rangeArr.length > 2) throw new Error("Either 1 or 2 arguments required");
  if (!rangeArr.every((el) => Number.isInteger(el))) throw new Error("Arguments must be of type Integer");


  const min = rangeArr[1] === undefined ? 0 : rangeArr[0];
  const max = rangeArr[1] ?? rangeArr[0];

  const range = [];
  for (let i = min; i < max; i += 1) {
    range.push(i);
  }
  console.log(range)
  return range;
}