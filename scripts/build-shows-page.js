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

function displayShows(arr) {
  // create tags, innerText, add class for container and table frame
  const main = document.querySelector(".main");
  const section = document.createElement("section");
  section.classList.add("shows");

  const title = document.createElement("h2");
  title.innerText = "Shows";
  title.classList.add("shows__title");

  const table = document.createElement("article");
  table.classList.add("shows__table");
  const tableRow = document.createElement("div");
  tableRow.classList.add("shows__table-row", "shows__table-row--display1");
  const dateHead = document.createElement("p");
  dateHead.innerText = "DATE";
  dateHead.classList.add("shows__table-head");
  const venueHead = document.createElement("p");
  venueHead.innerText = "VENUE";
  venueHead.classList.add("shows__table-head");
  const locationHead = document.createElement("p");
  locationHead.innerText = "LOCATION";
  locationHead.classList.add("shows__table-head");
  const btnHead = document.createElement("p");
  btnHead.innerText = "";
  btnHead.classList.add("shows__table-head");
  // append tags
  main.append(section);
  section.append(title, table);
  table.append(tableRow);
  tableRow.append(dateHead, venueHead, locationHead, btnHead);

  for (let i = 0; i < arr.length; i++) {
    // create table row content
    const row = document.createElement("div");
    row.classList.add("shows__table-row");
    const data1 = document.createElement("p");
    const p1 = document.createElement("p");
    p1.classList.add("shows__table-head", "shows__table-head--display");
    p1.innerText = "DATE";
    data1.classList.add("shows__table-date");
    data1.innerText = arr[i].date;

    const p2 = document.createElement("p");
    p2.classList.add("shows__table-head", "shows__table-head--display");
    p2.innerText = "VENUE";
    const data2 = document.createElement("p");
    data2.classList.add("shows__table-data");
    data2.innerText = arr[i].venue;

    const p3 = document.createElement("p");
    p3.classList.add("shows__table-head", "shows__table-head--display");
    p3.innerText = "LOCATION";
    const data3 = document.createElement("p");
    data3.classList.add("shows__table-data");
    data3.innerText = arr[i].location;

    const data4 = document.createElement("a");
    data4.classList.add("shows__table-btn");
    data4.href = "#"; // need to be able to dynamically go to different page
    data4.innerText = "BUY TICKETS";

    // append
    row.append(p1, data1, p2, data2, p3, data3, data4);
    table.append(row);
  }
}

displayShows(showList);

/***** row hover & active effect *******/
const rowList = document.querySelectorAll(".shows__table-row");
for (let i = 1; i < rowList.length; i++) {
  //hover effect
  rowList[i].addEventListener("mouseover", () => {
    rowList[i].classList.add("shows__table-row--hover");
  });
  rowList[i].addEventListener("mouseleave", () => {
    rowList[i].classList.remove("shows__table-row--hover");
  });

  //active effect
  rowList[i].addEventListener("click", function () {
    rowList[i].classList.add("shows__table-row--active");
  });
  // rowList[i].addEventListener("", function () {
  //   rowList[i].classList.remove("shows__table-row--active");
  // });
}
