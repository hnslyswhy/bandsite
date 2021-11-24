const baseUrl = "https://project-1-api.herokuapp.com/";
const key = "7d1b181a-7bbf-4a08-a5e3-9682f3039544";

/* to find the function efficiently, use command + click (mac) on that function  */

/************ get shows ************/
let showList;
const main = document.querySelector(".main");

async function getShowList() {
  try {
    const response = await axios.get(`${baseUrl}showdates/?api_key=${key}`);
    showList = response.data;
    displayShows(showList);
    rowEffect();
  } catch (error) {
    let message = displayErrorMessage();
    main.append(message);
  }
}
getShowList();

/***** create & display shows *******/
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

  let headerRow = addShowHeader(showArr); ///line48
  showsContainer.append(headerRow);

  showArr.forEach((show) => {
    let showCard = addCardElement(show); ///line62
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

    const infoData = document.createElement("p");
    if (item === "date") {
      infoData.classList.add("shows__date");
      infoData.innerText = dateFormatter(show, item);
    } else {
      infoData.classList.add("shows__data");
      infoData.innerText = show[item]; //its a variable, need use [] instead of .
    }

    showCard.append(infoHead, infoData);
  });

  let cardButton = document.createElement("button");
  cardButton.classList.add("shows__btn");
  cardButton.innerText = "BUY TICKETS";
  showCard.append(cardButton);

  return showCard;
}

function dateFormatter(show, item) {
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let showDate = new Date(parseInt(show[item])).toUTCString("en-US", options);
  let timeList = [showDate.split(",")[0]].concat(
    showDate.split(",")[1].split(" ")
  );
  let switchMonth = timeList[3];
  let switchDay = timeList[2];
  timeList[2] = switchMonth;
  timeList[3] = switchDay;
  console.log(timeList);
  timeList = timeList.join(" ").slice(0, 16).replace("Sep", "Sept");
  return timeList;
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

/****** show error message ******/
function displayErrorMessage() {
  const message = document.createElement("p");
  message.innerText = "Something Went Wrong. Try Again Later.";
  message.classList.add("error");
  return message;
}
