class SlowSet {

  #elements = [];

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
    return this.#elements.toString();
  }

  union(secondSet) {
    const newSet = new SlowSet()
    for (const element of this.#elements) {
      newSet.add(element)
    }
    for (const element of secondSet.#elements) {
      newSet.add(element)
    }
    return newSet
  }
}

const s = new SlowSet();
s.add(1)
s.add(2)
const a = new SlowSet();
a.add(1)
a.add(4);
a.add(5);
console.log(s.union(a).toString())
console.log(a.toString())
console.log(s.toString())
