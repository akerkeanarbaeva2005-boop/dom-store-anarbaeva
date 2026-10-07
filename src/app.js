import { Store } from './store.js';

const store = new Store();
store.add({ id: 1, name: 'Ноутбук', price: 350000, qty: 1 });
store.add({ id: 2, name: 'Мышь', price: 5000, qty: 2 });
store.add({ id: 3, name: 'Клавиатура', price: 12000, qty: 1 });

let nextId = 4;

const listEl = document.getElementById('product-list');
const totalEl = document.getElementById('total');
const formEl = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const qtyInput = document.getElementById('qty');
const nameError = document.getElementById('name-error');
const priceError = document.getElementById('price-error');
const qtyError = document.getElementById('qty-error');

function render() {
  listEl.innerHTML = '';

  for (const item of store.items) {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price.toLocaleString()} ₸</td>
      <td>
        <button class="qty-dec" data-action="dec">−</button>
        <span class="qty">${item.qty}</span>
        <button class="qty-inc" data-action="inc">+</button>
      </td>
      <td>${(item.price * item.qty).toLocaleString()} ₸</td>
      <td><button class="delete" data-action="delete">Удалить</button></td>
    `;

    listEl.appendChild(tr);
  }

  totalEl.textContent = store.total.toLocaleString() + ' ₸';
}

function validate() {
  let ok = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = 'Введите название товара';
    ok = false;
  } else {
    nameError.textContent = '';
  }

  const price = Number(priceInput.value);
  if (!priceInput.value || isNaN(price) || price <= 0) {
    priceError.textContent = 'Цена должна быть больше 0';
    ok = false;
  } else {
    priceError.textContent = '';
  }
  const qty = Number(qtyInput.value);
  if (!qtyInput.value || isNaN(qty) || !Number.isInteger(qty) || qty <= 0) {
    qtyError.textContent = 'Количество — целое число больше 0';
    ok = false;
  } else {
    qtyError.textContent = '';
  }

  return ok;
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();                         

  if (!validate()) return;

  store.add({
    id: nextId++,
    name: nameInput.value.trim(),
    price: Number(priceInput.value),
    qty: Number(qtyInput.value),
  });

  formEl.reset();
  render();
});
listEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const tr = btn.closest('tr');
  const id = Number(tr.dataset.id);
  const action = btn.dataset.action;

  if (action === 'delete') {
    store.remove(id);
  } else if (action === 'inc') {
    const item = store.find(id);
    if (item) store.updateQty(id, item.qty + 1);
  } else if (action === 'dec') {
    const item = store.find(id);
    if (item && item.qty > 1) store.updateQty(id, item.qty - 1);
  }

  render();                                    
});

render();