import { Product } from './Product';

/* Types */
type SortOptions = 'recent' | 'lowest' | 'highest';

type PriceRange = {
	min: number;
	max?: number;
};

type CartProducts = {
	id: string;
	name: string;
	price: number;
};

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

// load more products
const loadMoreBtn: HTMLButtonElement = document.querySelector(
	'.main-content__load-button'
);

// sort buttons
const sortProductsBtns: NodeListOf<HTMLButtonElement> =
	document.querySelectorAll('.order-button');
const dtSortProductsBtns: NodeListOf<HTMLButtonElement> =
	document.querySelectorAll('.desktop-order-selector__order-button');

// filter action buttons
const applyFilterBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
	'.buttons-wrapper__apply-button'
);
const resetFilterBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
	'.buttons-wrapper__reset-button'
);

// shopping cart elements
const shopCartModal: HTMLDialogElement =
	document.querySelector('.shopping-cart');
const showCartModalBtn: HTMLButtonElement = document.querySelector(
	'.header__cart-button'
);
const closeCartModalBtn: HTMLButtonElement = document.querySelector(
	'.shopping-cart__close-button'
);
const productsCounter: HTMLSpanElement = document.querySelector(
	'.header__item-counter'
);
const shopCartList: HTMLUListElement = document.querySelector(
	'.shopping-cart__list'
);
const shopCartTotalValue = document.querySelector('.shopping-cart__value');

/* Utils */
function adjustLayout() {
	if (window.innerWidth > 1024) {
		filterModal.close();
		orderModal.close();
	}
}

function formatPrice(price: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(price);
}

/* Components */
function colorFilterItem(color: string) {
	return `
    <li class="filter-item">
      <label class="filter-item__label">
        <input type="checkbox" class="color-filter" value="${color}" />
        <div class="filter-item__checkbox"></div>
        <span> ${color} </span>
      </label>
    </li>
  `;
}

function sizeFilterItem(size: string) {
	return `
    <label>
      <input type="checkbox" class="size-filter" value="${size}" />
      <span class="sizes-wrapper__box"> ${size} </span>
    </label>
  `;
}

function priceRangeItem(range: PriceRange) {
	let label = '';
	let value = '';

	if (range.max) {
		label = `de ${formatPrice(range.min)} até ${formatPrice(range.max)}`;
		value = `${range.min}-${range.max}`;
	} else {
		label = `a partir de ${formatPrice(range.min)}`;
		value = `${range.min}`;
	}

	return `
    <li class="filter-item">
      <label class="filter-item__label">
        <input
					type="checkbox"
					class="price-range-filter"
					value=${value}
				/>
        <div class="filter-item__checkbox"></div>
        <span> ${label} </span>
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
        <strong class="product-card__price">${formatPrice(data.price)}</strong>
        <sub class="product-card__installments">
				até ${data.parcelamento[0]}x de ${formatPrice(data.parcelamento[1])}</sub>
      </div>

      <button
				data-productid="${data.id}"
				data-productname="${data.name}"
				data-productprice="${data.price}"
				class="product-card__buy-button"
			>
				comprar
			</button>
    </div>
  `;
}

function shoppingCartItem(data: CartProducts) {
	return `
		<li class="shopping-cart__item">
			<span>
				${data.name}
				<b class="shopping-cart__price">${formatPrice(data.price)}</b>
			</span>
		</li>
	`;
}

/* Filters data */
const filterColors = [
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

const filterSizes = [
	'P',
	'M',
	'G',
	'GG',
	'U',
	'36',
	'38',
	'40',
	'42',
	'44',
	'46',
];

const filterPriceRanges: PriceRange[] = [
	{ min: 0, max: 50 },
	{ min: 51, max: 150 },
	{ min: 151, max: 300 },
	{ min: 301, max: 500 },
	{ min: 500 },
];

/* Setups */
function setModalEvents() {
	showFilterBtn.addEventListener('click', () => {
		filterModal.showModal();
		document.body.style.overflow = 'hidden';
	});

	showOrderBtn.addEventListener('click', () => {
		orderModal.showModal();
		document.body.style.overflow = 'hidden';
	});

	showCartModalBtn.addEventListener('click', () => {
		renderShopCartProducts();
		shopCartModal.showModal();
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

	closeCartModalBtn.addEventListener('click', () => {
		shopCartModal.close();
		document.body.style.overflow = 'auto';
	});
}

function setSortButtonEvents() {
	// desktop sort buttons
	let dtCurrentSortSelected: HTMLButtonElement = null;

	dtSortProductsBtns.forEach((btn, key) => {
		if (key === 0) {
			dtCurrentSortSelected = btn;
		}

		btn.addEventListener('click', () => {
			const sortOption = btn.dataset.sort as SortOptions;

			if (dtCurrentSortSelected) {
				dtCurrentSortSelected.classList.remove(
					'desktop-order-selector__order-button--selected'
				);
			}

			btn.classList.add('desktop-order-selector__order-button--selected');
			dtCurrentSortSelected = btn;

			sortProducts(sortOption);

			orderModal.close();
			document.body.style.overflow = 'auto';
		});
	});

	// mobile sort buttons
	let currentSortSelected: HTMLButtonElement = null;

	sortProductsBtns.forEach((btn, key) => {
		if (key === 0) {
			currentSortSelected = btn;
		}

		btn.addEventListener('click', () => {
			const sortOption = btn.dataset.sort as SortOptions;

			if (currentSortSelected) {
				currentSortSelected.classList.remove('order-button--selected');
			}

			btn.classList.add('order-button--selected');
			currentSortSelected = btn;

			sortProducts(sortOption);

			orderModal.close();
			document.body.style.overflow = 'auto';
		});
	});
}

// filters
let selectedColors: string[] = [];
function setColorFilterEvents() {
	const colorFilters: NodeListOf<HTMLInputElement> =
		document.querySelectorAll('.color-filter');

	colorFilters.forEach((input) => {
		input.addEventListener('change', () => {
			const value = input.value;

			if (selectedColors.includes(value)) {
				selectedColors = selectedColors.filter((color) => color !== value);
			} else {
				selectedColors.push(value);
			}
		});
	});
}

let selectedSizes: string[] = [];
function setSizeFilterEvents() {
	const sizeFilters: NodeListOf<HTMLInputElement> =
		document.querySelectorAll('.size-filter');

	sizeFilters.forEach((input) => {
		input.addEventListener('change', () => {
			const value = input.value;

			if (selectedSizes.includes(value)) {
				selectedSizes = selectedSizes.filter((color) => color !== value);
			} else {
				selectedSizes.push(value);
			}
		});
	});
}

let selectedRanges: string[] = [];
function setPriceRangeFilterEvents() {
	const rangeFilters: NodeListOf<HTMLInputElement> = document.querySelectorAll(
		'.price-range-filter'
	);

	rangeFilters.forEach((input) => {
		input.addEventListener('change', () => {
			const value = input.value;

			if (selectedRanges.includes(value)) {
				selectedRanges = selectedRanges.filter((color) => color !== value);
			} else {
				selectedRanges.push(value);
			}
		});
	});
}

function setFilterButtonEvents() {
	const filterInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
		'input[type="checkbox"]'
	);

	applyFilterBtn.forEach((button) => {
		button.addEventListener('click', async () => {
			filterProducts();

			filterModal.close();
			document.body.style.overflow = 'auto';
		});
	});

	resetFilterBtn.forEach((button) => {
		button.addEventListener('click', async () => {
			filterInputs.forEach((input) => {
				input.checked = false;
			});

			filterModal.close();
			document.body.style.overflow = 'auto';

			await getProducts();
		});
	});
}

let shoppingCartProducts: CartProducts[] = [];
function setBuyButtonEvent() {
	const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
		'.product-card__buy-button'
	);

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.dataset.productid;
			const productName = button.dataset.productname;
			const productPrice = button.dataset.productprice;

			shoppingCartProducts.push({
				id: productId,
				name: productName,
				price: Number(productPrice),
			});

			updateTotalProductsPrice();
		});
	});
}

// other
function setOtherEvents() {
	loadMoreBtn.addEventListener('click', loadMoreProducts);
}

function updateTotalProductsPrice() {
	const total = shoppingCartProducts
		.map((product) => product.price)
		.reduce((prev, cur) => prev + cur, 0);

	shopCartTotalValue.innerHTML = formatPrice(total);
	productsCounter.innerText = shoppingCartProducts.length + '';

	renderShopCartProducts();
}

function setClearShopCartButtonEvent() {
	const button: HTMLButtonElement = document.querySelector(
		'.shopping-cart__clear-button'
	);

	button.addEventListener('click', () => {
		shoppingCartProducts = [];

		updateTotalProductsPrice();
		shopCartModal.close();
		document.body.style.overflow = 'auto';
	});
}

// renders
function renderFilterData() {
	filterColors.forEach((value) => {
		const item = colorFilterItem(value);

		colorList.innerHTML += item;
		dtColorList.innerHTML += item;
	});

	filterSizes.forEach((value) => {
		const item = sizeFilterItem(value);

		sizeList.innerHTML += item;
		dtSizeList.innerHTML += item;
	});

	filterPriceRanges.forEach((value) => {
		const item = priceRangeItem(value);

		rangeList.innerHTML += item;
		dtRangeList.innerHTML += item;
	});
}

function renderProducts(products: Product[]) {
	const productsContainer = document.querySelector('.products-container');
	productsContainer.innerHTML = null;

	products.forEach((product) => {
		const item = productCard(product);

		productsContainer.innerHTML += item;
	});

	setBuyButtonEvent();
}

function renderShopCartProducts() {
	shopCartList.innerHTML = null;

	shoppingCartProducts.forEach((product) => {
		const item = shoppingCartItem(product);

		shopCartList.innerHTML += item;
	});
}

/* Services */
const limit = window.innerWidth >= 1024 ? 9 : 4;

async function getProducts() {
	try {
		const res = await fetch(`${serverUrl}/products?_limit=${limit}`);
		const data: Product[] = await res.json();

		renderProducts(data);
	} catch (error) {
		alert('Houve um erro ao carregar os produtos');
	}
}

async function loadMoreProducts() {
	try {
		const res = await fetch(`${serverUrl}/products`);
		const data: Product[] = await res.json();

		renderProducts(data);
	} catch (error) {
		alert('Houve um erro ao carregar mais produtos');
	}
}

async function sortProducts(sort: SortOptions) {
	try {
		let req: string = `${serverUrl}/products`;

		if (sort === 'recent') {
			req += '?_sort=date&_order=desc';
		} else {
			const order = sort === 'lowest' ? 'asc' : 'desc';

			req += `?_sort=price&_order=${order}`;
		}

		const res = await fetch(req);
		const data: Product[] = await res.json();

		renderProducts(data);
	} catch (error) {
		alert('Houve um erro ao carregar mais produtos');
	}
}

function filterByColor(colors: string[]) {
	return colors.map((color) => `color=${color}`);
}

function filterByPrice(prices: string[]) {
	return prices.map((price) => {
		const [min, max] = price.split('-');

		return `price_gte=${min}&price_lte=${max}`;
	});
}

function filterBySize(products: Product[]) {
	if (selectedSizes.length > 0) {
		return products.filter((product) =>
			selectedSizes.some((size) => product.size.includes(size))
		);
	} else {
		return products;
	}
}

async function filterProducts() {
	try {
		const colorFilter = filterByColor(selectedColors);
		const priceFilter = filterByPrice(selectedRanges);

		const filter = colorFilter.concat(priceFilter).join('&');

		const res = await fetch(`${serverUrl}/products?${filter}`);
		const data: Product[] = await res.json();

		const filteredList = filterBySize(data);

		renderProducts(filteredList);
	} catch (error) {
		alert('Houve um erro ao carregar mais produtos');
	}
}

/* Main */
function main() {
	console.log(serverUrl);

	adjustLayout();

	setModalEvents();
	setSortButtonEvents();
	setClearShopCartButtonEvent();
	setOtherEvents();

	renderFilterData();
	setColorFilterEvents();
	setSizeFilterEvents();
	setPriceRangeFilterEvents();
	setFilterButtonEvents();

	getProducts();
}

window.addEventListener('resize', adjustLayout);
document.addEventListener('DOMContentLoaded', main);
