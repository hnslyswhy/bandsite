/****** comment handling ******/
let commentList = [
  {
    name: "Connor Walton",
    date: "02/17/2021",
    commentText:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    profileImg: "./assets/images/Mohan-muruge.jpg",
  },
  {
    name: "Emilie Beach",
    date: "01/09/2021",
    commentText:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    profileImg: "./assets/images/Mohan-muruge.jpg",
  },
  {
    name: "Miles Acosta",
    date: "12/20/2020",
    commentText:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    profileImg: "./assets/images/Mohan-muruge.jpg",
  },
];

/****** showing comment ******/
const commentSection = document.querySelector(".comment");

function loopCommentList(arr) {
  commentList.forEach((comment) => displayComment(comment));
}

function displayComment(aComment) {
  let card = addCardElement(aComment);
  commentSection.append(card);
}

function addCardElement(aComment) {
  let card = document.createElement("article");
  card.classList.add("comment__card");

  const profileImg = document.createElement("img");
  profileImg.classList.add("comment__profile-image");
  profileImg.src = aComment.profileImg;
  profileImg.alt = "profile-image";
  card.append(profileImg);

  let commentContainer = addCommentContainer(aComment);
  card.append(commentContainer);

  return card;
}

function addCommentContainer(aComment) {
  let commentContainer = document.createElement("div");
  commentContainer.classList.add("comment__container");

  let infoContainer = addInfoContainer(aComment);
  commentContainer.append(infoContainer);

  let commentContent = document.createElement("p");
  commentContent.classList.add("comment__content");
  commentContent.innerText = aComment.commentText;
  commentContainer.append(commentContent);

  return commentContainer;
}

function addInfoContainer(aComment) {
  let infoContainer = document.createElement("div");
  infoContainer.classList.add("comment__info-container");
  const name = document.createElement("p");
  name.classList.add("comment__name");
  name.innerText = aComment.name;
  infoContainer.append(name);

  let date = addDate(aComment.date);
  infoContainer.append(date);

  return infoContainer;
}

function addDate(aDate) {
  let date = document.createElement("p");
  date.classList.add("comment__date");

  // time difference for dive deeper
  let currentTime = new Date();
  const [month, day, year] = [
    currentTime.getMonth(),
    currentTime.getDate(),
    currentTime.getFullYear(),
  ];
  currentTime = `${month}/${day}/${year}`;
  let differenceInTime = new Date(currentTime) - new Date(aDate);
  let differenceInDays = parseInt(
    Math.floor(differenceInTime / (1000 * 3600 * 24))
  );
  if (differenceInDays < 1) {
    date.innerText = `${aDate} (today)`;
  } else {
    date.innerText = `${aDate} (${differenceInDays} days)`;
  }

  return date;
}

loopCommentList(commentList);

/****** form handling ******/
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //get new comment components from form input
  const username = e.target[0].value;
  const userComment = e.target[1].value; // or can give input a name attribute and then e.target.nameChosen.value
  let commentDate = new Date();
  const [month, day, year] = [
    commentDate.getMonth(),
    commentDate.getDate(),
    commentDate.getFullYear(),
  ];
  commentDate = `${month}/${day}/${year}`;

  // add into list
  commentList.unshift({
    name: username,
    date: commentDate,
    commentText: userComment,
    profileImg: "./assets/images/Mohan-muruge.jpg",
  });

  //clear the displayed comment
  const cards = document.querySelectorAll(".comment__card");
  for (let card of cards) {
    card.remove();
  }

  // show new commentList
  loopCommentList(commentList);

  //reset the form
  e.target.reset(); // can also do by select the input, and then nameInput.value = ""; commentInput.value = "";
});
