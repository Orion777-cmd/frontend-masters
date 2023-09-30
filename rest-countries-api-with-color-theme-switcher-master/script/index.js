document.addEventListener("DOMContentLoaded", init);
function init() {
  let fetchedData;
  let africaData;
  let americaData;
  let asiaData;
  let europeData;
  let oceaniaData;

  const mainContent = document.getElementById("main-content");
  mainContent.className = "main-content";
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      fetchedData = data;
      africaData = fetchedData.filter((value) => value.region === "Africa");
      americaData = fetchedData.filter((value) => value.region === "Americas");
      asiaData = fetchedData.filter((value) => value.region === "Asia");
      europeData = fetchedData.filter((value) => value.region === "Europe");
      oceaniaData = fetchedData.filter((value) => value.region === "Oceania");

      document.getElementById("logo").addEventListener("click", () => {
        createDiv(data, mainContent);
      });

      document.getElementById("africa").addEventListener("click", () => {
        document.getElementById("filter-options").classList.toggle("none");
        createDiv(africaData, mainContent);
      });
      document.getElementById("america").addEventListener("click", () => {
        document.getElementById("filter-options").classList.toggle("none");
        createDiv(americaData, mainContent);
      });
      document.getElementById("asia").addEventListener("click", () => {
        document.getElementById("filter-options").classList.toggle("none");
        createDiv(asiaData, mainContent);
      });
      document.getElementById("europe").addEventListener("click", () => {
        document.getElementById("filter-options").classList.toggle("none");
        createDiv(europeData, mainContent);
      });
      document.getElementById("oceania").addEventListener("click", () => {
        document.getElementById("filter-options").classList.toggle("none");
        createDiv(oceaniaData, mainContent);
      });

      document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const data = fetchedData.filter((value) =>
          value.name.common
            .toLowerCase()
            .startsWith(document.getElementById("search").value.toLowerCase())
        );
        // document.getElementById("search").value = "";
        createDiv(data, mainContent);
      });
      createDiv(data, mainContent);
    });

  const filter = document.getElementById("filter");
  filter.addEventListener("click", () => {
    document.getElementById("filter-options").classList.toggle("none");
  });

  document.getElementById("dark-mode").addEventListener("click", () => {
    document.body.classList.toggle("body-dark");
    document.getElementById("dark-mode").classList.toggle("dark");
    document.getElementById("dark-text").classList.toggle("none");
    document.getElementById("light-text").classList.toggle("none");
    document.querySelector(".main-header").classList.toggle("dark");
    document.getElementById("search").classList.toggle("dark");
    document.querySelector(".filter").classList.toggle("dark");
    document.getElementById("filter-options").classList.toggle("dark");
    Array.prototype.forEach.call(
      document.querySelectorAll(".country-container"),
      (element) => {
        element.classList.toggle("dark");
      }
    );
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createDiv(data, container) {
  classLis = document.querySelector(".country-container")
    ? document.querySelector(".country-container").className
    : "country-container";

  removeAllChildNodes(container);
  for (let {
    name: { common: countryName },
    capital,
    population: countryPopulation,
    flags: { png: countryFlag },
    region: countryRegion,
  } of data) {
    const countryContainer = document.createElement("div");
    const countryImg = document.createElement("img");
    const textDiv = document.createElement("div");
    const header2 = document.createElement("h2");
    const paragraph = document.createElement("p");
    const paragraph2 = document.createElement("p");
    const paragraph3 = document.createElement("p");

    countryContainer.className = classLis;

    let countryCapital;
    capital ? (countryCapital = capital[0]) : (countryCapital = "");
    countryContainer.classList = "country-container";
    countryImg.src = countryFlag;
    header2.textContent = countryName;
    textDiv.appendChild(header2);
    paragraph.innerHTML = `<span>Population:</span> ${countryPopulation}`;
    textDiv.appendChild(paragraph);
    paragraph2.innerHTML = `<span>Region:</span> ${countryRegion}`;
    textDiv.appendChild(paragraph2);
    paragraph3.innerHTML = `<span>Capital:</span> ${countryCapital}`;
    textDiv.appendChild(paragraph3);
    countryContainer.append(countryImg);
    countryContainer.append(textDiv);
    container.append(countryContainer);
  }
}
