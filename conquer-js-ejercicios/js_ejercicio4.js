const searchInput = document.querySelector("#search-input");
const filterItems = [...document.querySelectorAll("[data-filter-item]")];
const filterStatus = document.querySelector("#filter-status");

function filterList() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  let visibleItems = 0;

  for (const item of filterItems) {
    const matches = item.textContent.toLocaleLowerCase("es").includes(query);
    item.hidden = !matches;
    visibleItems += Number(matches);
  }

  filterStatus.textContent = `${visibleItems} ${visibleItems === 1 ? "elemento visible" : "elementos visibles"}.`;
}

searchInput.addEventListener("input", filterList);
filterList();
