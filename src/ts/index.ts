import { Product } from './Product';

const serverUrl = 'http://localhost:5000';

/* Elements */

// filter modal elements
const filterModal: HTMLDialogElement = document.querySelector('#filter-modal');
const showFilterBtn: HTMLButtonElement =
	document.querySelector('#show-filters');
const closeFilterBtn: HTMLButtonElement =
	document.querySelector('#close-filters');

// order modal elements
const orderModal: HTMLDialogElement = document.querySelector('#order-modal');
const showOrderBtn: HTMLButtonElement = document.querySelector('#show-orders');
const closeOrderBtn: HTMLButtonElement =
	document.querySelector('#close-orders');

// mobile filters
const colorList = document.getElementById('colors-filter-list');
const sizeList = document.getElementById('sizes-filter-options');
const rangeList = document.getElementById('range-filter-list');

// desktop filters
const dtColorList = document.getElementById('dt-colors-filter-list');
const dtSizeList = document.getElementById('dt-sizes-filter-options');
const dtRangeList = document.getElementById('dt-range-filter-list');

/* Components */
function colorFilterItem(color: string) {
	return `
    <li class="filter-item">
      <label class="filter-item__label">
        <input type="checkbox" />
        <div class="filter-item__checkbox"></div>
        <span> ${color} </span>
      </label>
    </li>
  `;
}

function sizeFilterItem(size: string | number) {
	return `
    <label>
      <input type="checkbox" />
      <span class="sizes-wrapper__box"> ${size} </span>
    </label>
  `;
}

function priceRangeItem(range: string) {
	return `
    <li class="filter-item">
      <label class="filter-item__label">
        <input type="checkbox" />
        <div class="filter-item__checkbox"></div>
        <span> ${range} </span>
      </label>
    </li>
  `;
}

function productCard(data: Product) {
	return `
    <div class="product-card">
      <img
        src="${data.image}"
        alt="Mulher usando ${data.name}"
        class="product-card__banner"
      />

      <span class="product-card__title">${data.name}</span>

      <div>
        <strong class="product-card__price">R$ ${data.price}</strong>
        <sub class="product-card__installments">até ${data.parcelamento[0]}x de R$ ${data.parcelamento[1]}</sub>
      </div>

      <button class="product-card__buy-button">comprar</button>
    </div>
  `;
}

/* Filters data */
const colors = [
	'Amarelo',
	'Azul',
	'Branco',
	'Cinza',
	'Laranja',
	'Preto',
	'Rosa',
	'Verde',
	'Vermelho',
	'Vinho',
];

const sizes = ['P', 'M', 'G', 'GG', 'U', 36, 38, 40, 42, 44, 46];

const priceRanges = [
	'de R$ 0,00 até R$ 50,00',
	'de R$ 51,00 até R$ 150,00',
	'de R$ 151,00 até R$ 300,00',
	'de R$ 301,00 até R$ 500,00',
	'a partir de R$ 500,00',
];

/* Utils */
function adjustLayout() {
	if (window.innerWidth > 1024) {
		filterModal.close();
		orderModal.close();
	}
}

function setModalActions() {
	showFilterBtn.addEventListener('click', () => {
		filterModal.showModal();
		document.body.style.overflow = 'hidden';
	});

	showOrderBtn.addEventListener('click', () => {
		orderModal.showModal();
		document.body.style.overflow = 'hidden';
	});

	closeFilterBtn.addEventListener('click', () => {
		filterModal.close();
		document.body.style.overflow = 'auto';
	});

	closeOrderBtn.addEventListener('click', () => {
		orderModal.close();
		document.body.style.overflow = 'auto';
	});
}

function renderFilterData() {
	colors.forEach((value) => {
		const item = colorFilterItem(value);

		colorList.innerHTML += item;
		dtColorList.innerHTML += item;
	});

	sizes.forEach((value) => {
		const item = sizeFilterItem(value);

		sizeList.innerHTML += item;
		dtSizeList.innerHTML += item;
	});

	priceRanges.forEach((value) => {
		const item = priceRangeItem(value);

		rangeList.innerHTML += item;
		dtRangeList.innerHTML += item;
	});
}

function renderProducts(products: Product[]) {
	const productsContainer = document.querySelector('.products-container');

	products.forEach((product) => {
		const item = productCard(product);

		productsContainer.innerHTML += item;
	});
}

async function getProducts() {
	try {
		const res = await fetch(`${serverUrl}/products`);
		const data: Product[] = await res.json();

		const limitedList: Product[] =
			window.innerWidth >= 1024 ? data.splice(0, 9) : data.splice(0, 4);

		renderProducts(limitedList);
	} catch (error) {
		alert('Houve um erro ao carregar os produtos');
	}
}

/* Main */
function main() {
	console.log(serverUrl);

	adjustLayout();
	setModalActions();
	renderFilterData();
	getProducts();
}

window.addEventListener('resize', adjustLayout);
document.addEventListener('DOMContentLoaded', main);
