class SlowSet {

  #elements = [];

  constructor(iterable) {
    if (iterable) {
      for (const element of iterable) {
        this.add(element);
      }
    }
  }

  [Symbol.iterator]() {
    return this.#elements[Symbol.iterator]()
  }

  add(element) {
    if (!this.has(element)) {
      this.#elements.push(element);
    }
  }

  has(element) {
    return this.#elements.includes(element)
  }

  delete(element) {
    if (this.has(element)) {
      this.#elements.splice(this.#elements.indexOf(element), 1)
      return true;
    } else {
      return false
    }
  }

  size() {
    return this.#elements.length;
  }

  clear() {
    this.#elements.splice(0, this.#elements.length)
  }

  toString() {
    return `{ ${this.#elements} }`;
  }

  union(secondSet) {
    const newSet = new SlowSet(secondSet);
    for (const element of this.#elements) {
      newSet.add(element)
    }
    return newSet
  }

  isSubsetOf(set) {
    return this.#elements.every((element) => set.has(element))
  }

  isSupersetOf(set) {
    for (const element of set) {
      if (!this.has(element)) {
        return false
      }
    }
    return true
  }

  difference(set) {
    const newSet = new SlowSet(this.#elements)
    for (const element of set) {
      newSet.delete(element)
    }
    return newSet;
  }

  intersection(set) {
    const newSet = new SlowSet(set)
    for (const element of set) {
      if (!this.has(element)) {
        newSet.delete(element)
      }
    }
    return newSet;
  }

  isDisjointFrom(set) {
    const setsMap = new Map();

    for (const element of this.#elements) {
      setsMap.set(element, 1)
    }

    for (const element of set) {
      setsMap.set(element, 1 + setsMap.get(element) ?? 1)
    }

    return setsMap.forEach((key) => setsMap.get(key) === 1) ? true : false
  }
}

const c = new SlowSet([1, 2, 3]);
const d = new SlowSet([3, 4, 5])
const e = new SlowSet([1, 2, 3, 4, 5, 6, 7]);
const f = new SlowSet([2, 4, 6, 8, 10]);
const odd = new SlowSet([1, 3, 5, 7, 9]);
const even = new SlowSet([2, 4, 6, 8, 10]);
console.log(c.union(d).toString())
console.log(c.toString())
console.log(d.toString())
console.log(new SlowSet().toString())
// console.log(a.toString())
for (const element of c) {
  console.log(element)
}

const a = new SlowSet([1, 2])
console.log(a.isSubsetOf(c))
console.log(d.isSubsetOf(c))

console.log(a.isSupersetOf(c))
console.log(c.isSupersetOf(c))
console.log(c.difference(a).toString())
console.log(c.intersection(d).toString())
console.log(e.intersection(f).toString())
console.log(f.intersection(f).toString())
console.log(even.isDisjointFrom(odd))
console.log(a.isDisjointFrom(c))
