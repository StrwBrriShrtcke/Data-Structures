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
}
const s = new SlowSet();

console.log(s);
s.add(1);
s.add(1);
s.add(2);
console.log(s + "");
console.log(s.has(1))
console.log(s.has(4))
console.log(s.delete(1))
console.log(s.delete(6))
console.log(s.size())
console.log(s.toString())
