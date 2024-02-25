const searchInput = document.getElementById('searchInput');
const grid = document.getElementById('grid');

async function fetchNames() {
	try {
		const response = await fetch('data.json');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		displayNames(data);
	} catch (error) {
		console.error('Error fetching names:', error);
	}
}

function displayNames(names) {
	grid.innerHTML = '';
	names.forEach((name) => {
		const nameContainer = document.createElement('div');
		nameContainer.classList.add('name-container');
		nameContainer.innerHTML = `<h2 class="name">${name.name}</h2>`;
		grid.appendChild(nameContainer);
	});

	searchInput.addEventListener('input', () => {
		const searchTerm = searchInput.value.toLowerCase();
		filterNames(names, searchTerm);
		if (searchInput.value.length === 0) {
			window.location.reload();
		}
	});
}

function filterNames(names, searchTerm) {
	const filteredNames = names.filter((name) =>
		name.name.toLowerCase().includes(searchTerm),
	);
	displayNames(filteredNames);
}

fetchNames();
