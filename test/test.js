var expect = require('chai').expect;
var lib = require('../lib/index');

describe('getFromObj()', function () {
  // Retreving field from the root
  it('retreve field of root map', function () {
    let result = lib.getFromObj({a: 1, b: 2, c: 2}, "a");
    expect(result).to.be.eql(1);
  });

  it('retreve field of root array', function () {
    let result = lib.getFromObj([9,8,7,6,5,4], "1");
    expect(result).to.be.eql(8);
  });

  // Retreving field from a nested object
  it('retreve field of nested map', function () {
    let result = lib.getFromObj({a: {a: 1, b: 2, c: 3}, b: {a: 4, b: 5, c: 6}, c: 9}, "b.c");
    expect(result).to.be.eql(6);
  });

  it('retreve field of nested array', function () {
    let result = lib.getFromObj([[1,2], [3,4], [5,6]], "1.0");
    expect(result).to.be.eql(3);
  });

  // Retreving field from deep nested object
  it('retreve field of deep nested map', function () {
    const obj = {
      a: {
        d: {
          d: 1,
          c: 2
        },
        e: {
          d: 4,
          w: 3
        }
      }
    };
    let result = lib.getFromObj(obj, "a.e.w");
    expect(result).to.be.eql(3);
  });

  // Retreving field from the root
  it('retreve field of deep nested array', function () {
    const obj = [
      [
        [1,2],
        [3,4],
        [5,6],
        [1,2],
        [3,4],
        [5,6]
      ],
      [
        3, 
        [1,2],
        [3,4],
        [5,6]
      ], 
      [5,6]
    ];
    let result = lib.getFromObj(obj, "1.3.1");
    expect(result).to.be.eql(6);
  });
});

describe('addToObj()', function () {
  it('add field to root map', function () {
    let result = lib.addToObj({}, "a", 1, false);
    expect(result).to.be.eql({a: 1});
  });

  it('add field to root map without replacement', function () {
    let result = lib.addToObj({b: 2}, "a", 1, false);
    expect(result).to.be.eql({b: 2, a: 1});
  });

  it('add field to root map with replacement', function () {
    let result = lib.addToObj({b: 2}, "a", 1, true);
    expect(result).to.be.eql({a: 1, b: 2});
  });

  it('add to existing field to root map without replacement', function () {
    let result = lib.addToObj({b: 2, a: 5}, "a", 1, false);
    expect(result).to.be.eql({b: 2, a: 1});
  });

  it('add to existing field to root map with replacement', function () {
    let result = lib.addToObj({b: 2, a: 5}, "a", 1, true);
    expect(result).to.be.eql({a: 1, b: 2});
  });

  it('add to existing map to root map without replacement', function () {
    let result = lib.addToObj({a: {b: {e: 6}, c: 7}}, "a.b", {f: 8}, false);
    expect(result).to.be.eql({a: {b: {f: 8}, c: 7}});
  });

  it('add to existing map to root map with replacement', function () {
    let result = lib.addToObj({a: {b: {e: 6}, c: 7}}, "a.b", {f: 8}, true);
    expect(result).to.be.eql({a: {b: {e: 6, f: 8}, c: 7}});
  });

  it('add to existing array without replacement', function () {
    let result = lib.addToObj({a: [0, 1]}, "a.1", 4, false);
    expect(result).to.be.eql({a: [0, 4]});
  });

  it('add to existing array with replacement', function () {
    let result = lib.addToObj({a: [0, 1]}, "a.1", 4, true);
    expect(result).to.be.eql({a: [0, 4]});
  });
});


describe('removeFromObj()', function () {
  it('remove field from root map', function () {
    let result = lib.removeFromObj({a: 2}, "a");
    expect(result).to.be.eql({});
  });

  it('remove field from root array', function () {
    let result = lib.removeFromObj([1,3,5], "1");
    expect(result).to.be.eql([1,5]);
  });

  it('remove field from nested map', function () {
    let result = lib.removeFromObj({a: {b: 3, c: 5}}, "a.c");
    expect(result).to.be.eql({a: {b: 3}});
  });

  it('remove field from nested array', function () {
    let result = lib.removeFromObj({a: [1,2,3,5]}, "a.2");
    expect(result).to.be.eql({a: [1,2,5]});
  });

  it('remove field from deep nested map', function () {
    let result = lib.removeFromObj({a: {b: {b: 3, c: 5}, c: {b: 3, c: 5}}}, "a.c.b");
    expect(result).to.be.eql({a: {b: {b: 3, c: 5}, c: {c: 5}}});
  });

  it('remove field from deep nested array', function () {
    let result = lib.removeFromObj({a: [1,[1,2,3,5]]}, "a.1.1");
    expect(result).to.be.eql({a: [1,[1,3,5]]});
  });
});

describe('updateObj()', function () {
  it('update field from root map', function () {
    let result = lib.updateObj({a: 2}, "a", 3);
    expect(result).to.be.eql({a: 3});
  });

  it('update field from nested map', function () {
    let result = lib.updateObj({a: {b: 5, f: 6}}, "a.f", 3);
    expect(result).to.be.eql({a: {b: 5, f: 3}});
  });

  it('add field to nested map', function () {
    let result = lib.updateObj({a: {b: 5, f: 6}}, "a.r", 3);
    expect(result).to.be.eql({a: {b: 5, f: 6, r: 3}});
  });

  it('add field to nested array', function () {
    let result = lib.updateObj({a: [4,5,7]}, "a.3", 3);
    expect(result).to.be.eql({a: [4,5,7,3]});
  });

  it('update field from root array', function () {
    let result = lib.updateObj({a: [5,7,3]}, "a.1", 3);
    expect(result).to.be.eql({a: [5,3,3]});
  });

  it('add map to nested array', function () {
    let result = lib.updateObj({a: [4,5,7]}, "a.3", {a: 5, h:3});
    expect(result).to.be.eql({a: [4,5,7, {a: 5, h:3}]});
  });

  it('add array to nested array', function () {
    let result = lib.updateObj({a: [4,5,7]}, "a.3", [4,8,3,6]);
    expect(result).to.be.eql({a: [4,5,7, [4,8,3,6]]});
  });
});