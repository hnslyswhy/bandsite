const showList = [
  {
    date: "Mon Sept 06 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

/***** create & display shows *******/
const main = document.querySelector(".main");

function displayShows(showArr) {
  let container = addContainer(showArr);
  main.append(container);
}

function addContainer(showArr) {
  const section = document.createElement("section");
  section.classList.add("shows");

  const title = document.createElement("h2");
  title.innerText = "Shows";
  title.classList.add("shows__title");
  section.append(title);

  const showsContainer = document.createElement("div");
  showsContainer.classList.add("shows__container");
  section.append(showsContainer);

  let headerRow = addShowHeader(showArr);
  showsContainer.append(headerRow);

  showArr.forEach((show) => {
    let showCard = addCardElement(show);
    showsContainer.append(showCard);
  });

  return section;
}

function addShowHeader(showArr) {
  let headerList = Object.keys(showArr[0]);
  headerList[3] = "";
  const headerRow = document.createElement("div");
  headerRow.classList.add("shows__headline", "shows__headline--display");
  headerList.forEach((item) => {
    const rowHead = document.createElement("p");
    rowHead.innerText = item.toUpperCase();
    rowHead.classList.add("shows__head");
    headerRow.append(rowHead);
  });
  return headerRow;
}

function addCardElement(show) {
  let showCard = document.createElement("article");
  showCard.classList.add("shows__row");

  const showInfoList = Object.keys(show);
  showInfoList.forEach(function (item) {
    const infoHead = document.createElement("p");
    infoHead.classList.add("shows__head", "shows__head--display");
    infoHead.innerText = item.toUpperCase();
    showCard.append(infoHead);

    const infoData = document.createElement("p");
    if (item === "date") {
      infoData.classList.add("shows__date");
    } else {
      infoData.classList.add("shows__data");
    }
    infoData.innerText = show[item]; //its a variable, need use [] instead of .
    showCard.append(infoData);
  });

  let cardButton = document.createElement("button");
  cardButton.classList.add("shows__btn");
  cardButton.innerText = "BUY TICKETS";
  showCard.append(cardButton);

  return showCard;
}

displayShows(showList);

/***** row hover & active effect *******/
const rowList = document.querySelectorAll(".shows__row");
rowList.forEach((row) => {
  //hover effect
  row.addEventListener("mouseover", () => {
    row.classList.add("shows__row--hover");
  });
  row.addEventListener("mouseleave", () => {
    row.classList.remove("shows__row--hover");
  });

  //active effect
  row.addEventListener("click", function () {
    //check if any active row, if there is, remove its active effect
    rowList.forEach((row) => {
      row.classList.forEach((el) => {
        if (el === "shows__row--active") {
          row.classList.remove("shows__row--active");
        }
      });
    });
    // remove hover effect for the clicked row to avoid effect conflicts
    row.classList.remove("shows__row--hover");
    // add active effect
    row.classList.add("shows__row--active");
  });
});
