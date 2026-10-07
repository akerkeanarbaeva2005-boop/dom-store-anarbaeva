export class Store {
  #items = [];                       

  add(item) {
    this.#items.push(item);
    return this;
  }

  remove(id) {
    this.#items = this.#items.filter((item) => item.id !== id);
    return this;
  }

  updateQty(id, qty) {
    const item = this.#items.find((i) => i.id === id);
    if (item) item.qty = qty;
    return this;
  }

  find(id) {
    return this.#items.find((i) => i.id === id);
  }

  get items() {
    return [...this.#items];       
  }

  get total() {
    return this.#items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}