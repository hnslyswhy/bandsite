const baseUrl = "https://project-1-api.herokuapp.com/";
const key = "7d1b181a-7bbf-4a08-a5e3-9682f3039544";
let showList;
async function getShowList() {
  try {
    const response = await axios.get(`${baseUrl}showdates/?api_key=${key}`);
    showList = response.data;
    console.log(showList);
    displayShows(showList);
    rowEffect();
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong"); // ? is this proper way to handler error
  }
}
getShowList();

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
  let headerList = Object.keys(showArr[0]).filter((item) => item !== "id");
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

  const showInfoList = Object.keys(show).filter((item) => item !== "id");
  showInfoList.forEach(function (item) {
    const infoHead = document.createElement("p");
    infoHead.classList.add("shows__head", "shows__head--display");
    infoHead.innerText = item.toUpperCase();
    showCard.append(infoHead);

    const infoData = document.createElement("p");
    if (item === "date") {
      infoData.classList.add("shows__date");
      let options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      let showDate = new Date(parseInt(show[item])).toUTCString(
        "en-US",
        options
      );
      let timeList = [showDate.split(",")[0]].concat(
        showDate.split(",")[1].split(" ")
      );
      let switchMonth = timeList[3];
      let switchDay = timeList[2];
      timeList[2] = switchMonth;
      timeList[3] = switchDay;
      console.log(timeList);
      timeList = timeList.join(" ").slice(0, 16).replace("Sep", "Sept");
      infoData.innerText = timeList;
    } else {
      infoData.classList.add("shows__data");
      infoData.innerText = show[item]; //its a variable, need use [] instead of .
    }

    showCard.append(infoData);
  });

  let cardButton = document.createElement("button");
  cardButton.classList.add("shows__btn");
  cardButton.innerText = "BUY TICKETS";
  showCard.append(cardButton);

  return showCard;
}

/***** row hover & active effect *******/
function rowEffect() {
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
}
