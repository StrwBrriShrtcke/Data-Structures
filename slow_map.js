class SlowMap {
  #keyValuePairs = []

  constructor(iterable) {
    if (iterable !== undefined) {
      for (const [k, v] of iterable) {
        this.#keyValuePairs.push([k, v])
      }
    }
  }

  [Symbol.iterator]() {
    return this.#keyValuePairs[Symbol.iterator]()
  }

  set(key, value) {
    for (const pair of this.#keyValuePairs) {
      if (pair[0] === key) {
        pair[1] = value
        return this
      }
    }
    this.#keyValuePairs.push([key, value])
    return this;
  }

  toString() {
    return "{" + this.#keyValuePairs.map(([k, v]) => `${k}: ${v}`).join(", ") + "}"
  }

  delete(key) {
    for (let i = 0; i < this.#keyValuePairs.length; i++) {
      if (this.#keyValuePairs[i][0] === key) {
        this.#keyValuePairs.splice(i, 1)
        return true
      }
    }
    return false
  }

  clear() {
    this.#keyValuePairs = []
  }

  forEach(callBackFn) {
    for (let i = 0; i < this.#keyValuePairs.length; i++) {
      const [key, value] = this.#keyValuePairs[i]
      callBackFn(value, key, this.#keyValuePairs);
    }
  }

  get(key) {
    for (const [k, v] of this.#keyValuePairs) {
      if (k === key) {
        return v
      }
    }
    return undefined
  }

  has(key) {
    for (const [k] of this.#keyValuePairs) {
      if (k === key) {
        return true
      }
    }
    return false
  }

  size() {
    return this.#keyValuePairs.length
  }

  static groupBy(iterable, callBackFn) {
    const newMap = new SlowMap()
    let index = 0;
    for (const element of iterable) {
      const group = callBackFn(element, index)
      if (!newMap.has(group)) {
        newMap.set(group, [element])
      } else {
        newMap.get(group).push(element)
      }
      index++
    }
    return newMap
  }

}
