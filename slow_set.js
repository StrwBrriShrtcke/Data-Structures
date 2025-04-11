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
    const newSet = new SlowSet()
    for (const element of set) {
      if (this.has(element)) {
        newSet.add(element)
      }
    }
    return newSet;
  }

  isDisjointFrom(set) {
    return this.#elements.every((element) => !set.has(element))
  }

  forEvery(callBackFn) {
    for (const element of this.#elements) {
      callBackFn(element)
    }
  }

  symmetricDifference(set) {
    const newSet = new SlowSet();

    function check(aset, element) {
      if (!aset.has(element)) {
        return newSet.add(element)
      }
    }
    for (const element of this.#elements) {
      check(set, element)
      console.log(newSet.toString())
    }
    for (const element of set) {
      check(this, element)

    }
    return newSet;
  }

}

