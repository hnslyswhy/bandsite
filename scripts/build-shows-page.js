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

  const table = document.createElement("table");
  table.classList.add("shows__table");
  const tableRow = document.createElement("tr");
  tableRow.classList.add("shows__table-row", "shows__table-row--display1");
  const dateHead = document.createElement("th");
  dateHead.innerText = "DATE";
  dateHead.classList.add("shows__table-head");
  const venueHead = document.createElement("th");
  venueHead.innerText = "VENUE";
  venueHead.classList.add("shows__table-head");
  const locationHead = document.createElement("th");
  locationHead.innerText = "LOCATION";
  locationHead.classList.add("shows__table-head");
  const btnHead = document.createElement("th");
  btnHead.innerText = "";
  btnHead.classList.add("shows__table-head");
  // append tags
  main.append(section);
  section.append(title, table);
  table.append(tableRow);
  tableRow.append(dateHead, venueHead, locationHead, btnHead);

  for (let show of arr) {
    // create table row content
    const row = document.createElement("tr");
    row.classList.add("shows__table-row");
    const data1 = document.createElement("td");
    const p1 = document.createElement("td");
    p1.classList.add("shows__table-head", "shows__table-head--display");
    p1.innerText = "DATE";
    data1.classList.add("shows__table-date");
    data1.innerText = show.date;

    const p2 = document.createElement("td");
    p2.classList.add("shows__table-head", "shows__table-head--display");
    p2.innerText = "VENUE";
    const data2 = document.createElement("td");
    data2.classList.add("shows__table-data");
    data2.innerText = show.venue;

    const p3 = document.createElement("td");
    p3.classList.add("shows__table-head", "shows__table-head--display");
    p3.innerText = "LOCATION";
    const data3 = document.createElement("td");
    data3.classList.add("shows__table-data");
    data3.innerText = show.location;

    const data4 = document.createElement("td");
    data4.classList.add("shows__table-btn");
    data4.innerText = "BUY TICKETS";

    // append
    row.append(p1, data1, p2, data2, p3, data3, data4);
    table.append(row);
  }
}

displayShows(showList);

const buyTicketBtn = document.querySelector(".shows__table-btn");
buyTicketBtn.addEventListener("click", function () {
  console.log(window.location);
  window.location.replace("../index.html"); // need to change redirect route in the future
});
