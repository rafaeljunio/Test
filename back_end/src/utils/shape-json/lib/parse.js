const core = require('./core');

const _ = {
  map: require('lodash/map'),
  groupBy: require('lodash/groupBy'),
  pick: require('lodash/pick'),
  values: require('lodash/values'),
  keys: require('lodash/keys'),
  forOwn: require('lodash/forOwn'),
  omit: require('lodash/omit'),
  extend: require('lodash/extend'),
  has: require('lodash/has'),
  get: require('lodash/get'),
  uniq: require('lodash/uniq'),
  uniqBy: require('lodash/uniqBy'),
  isObject: require('lodash/isObject'),
  isString: require('lodash/isString'),
  isFunction: require('lodash/isFunction'),
  isArray: require('lodash/isArray'),
  startsWith: require('lodash/startsWith'),
  isUndefined: require('lodash/isUndefined'),
  filter: require('lodash/filter'),
  isNumber: require('lodash/isNumber'),
  reduce: require('lodash/reduce'),
  isBoolean: require('lodash/isBoolean'),
};

const Operations = {
  group: 'groupBy',
  index: 'indexBy',
  mirror: 'mirror',
  set: 'set',
};

const defined = {
  group: require('./plugins/group.js'),
  mirror: require('./plugins/mirror.js'),
  set: require('./plugins/set.js'),
};

function parse(provider, scheme) {
  let json = {};
  _.forOwn(scheme, function (subScheme, schemeKey) {
    if (_.isFunction(subScheme) === false) {
      if (isOperation(schemeKey)) {
        const operation = retrieveOperation(schemeKey);
        const parsedOperation = parseSchemeOperation(
          provider,
          subScheme,
          operation,
        );
        if (_.isUndefined(operation.dest)) {
          json = parsedOperation;
        } else {
          json[operation.dest] = parsedOperation;
        }
      } else if (_.isString(subScheme)) {
        var parsedString = parseSchemeString(provider, subScheme);
        if (
          _.isString(parsedString) ||
          _.isNumber(parsedString) ||
          _.isBoolean(parsedString) ||
          parsedString === null
        ) {
          json[schemeKey] = parsedString;
        }
      } else if (_.isNumber(subScheme)) {
        var parsedString = parseSchemeNumber(provider, subScheme);
        if (parsedString || _.isNumber(parsedString)) {
          json[schemeKey] = parsedString;
        }
      } else if (_.isObject(subScheme)) {
        json[schemeKey] = parse(provider, subScheme);
      }
    }
  });
  return json;
}

function withoutEmptyObject(collection) {
  return _.filter(collection, function (value) {
    if (_.isObject(value)) {
      return _.keys(value).length !== 0;
    }
    return true;
  });
}

function parseSchemeOperation(provider, subScheme, operation) {
  let parsedCollection = executeOperation(operation, provider, subScheme);
  if (_.isArray(parsedCollection)) {
    parsedCollection = withoutEmptyObject(parsedCollection);
  }
  return parsedCollection;
}

function parseSchemeString(provider, schemeString) {
  if (_.isArray(provider)) {
    if (provider.length === 0) {
      return [];
    }
    return _.get(provider[0], schemeString);
  }
  return _.get(provider, schemeString);
}

function parseSchemeNumber(provider, schemeString) {
  if (_.isArray(provider) && provider.length === 0) {
    return [];
  }

  if (_.isArray(provider) && _.isArray(provider[0])) {
    return _.get(provider[0], schemeString);
  }
  return _.get(provider, schemeString);
}

function executeOperation(operation, provider, scheme) {
  if (_.has(defined, operation.name)) {
    const helpers = { _, parse, core };
    const result = defined[operation.name](
      operation,
      provider,
      scheme,
      helpers,
    );
    return result;
  }
}

function isOperation(text) {
  if (_.startsWith(text, '$')) {
    const name = getOperationName(text);
    return _.has(core, Operations[name]) || _.has(defined, name);
  }
}

function retrieveOperation(text) {
  if (isOperation(text)) {
    return {
      name: getOperationName(text),
      dest: getOperationDestinyKey(text),
      args: getOperationArguments(text),
    };
  }
}

function getOperationName(text) {
  return text.match(/\$(\w+)/)[1];
}

function getOperationDestinyKey(text) {
  const segment = text.match(/\[(\w+)\]/);
  if (segment) return segment[1];
}

function getOperationArguments(text) {
  const args = text.match(/\((\w+)\)/);
  if (args) return args[1];
}

exports.parse = function (provider, scheme) {
  return parse(provider, scheme);
};

exports.define = function (name, operation) {
  defined[name] = operation;
};
