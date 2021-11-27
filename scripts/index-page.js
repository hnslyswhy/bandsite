const baseUrl = "https://project-1-api.herokuapp.com/";
const key = "7d1b181a-7bbf-4a08-a5e3-9682f3039544";

/* to find the function efficiently, use command + click (mac) on that function  */

/****** get comments ******/
let commentList;
const commentSection = document.querySelector(".comment");

function getCommentList() {
  axios
    .get(`${baseUrl}comments/?api_key=${key}`)
    .then((response) => {
      commentList = response.data;
      commentList.sort(
        (comment1, comment2) => comment2.timestamp - comment1.timestamp
      );
      clearDisplay();
      loopCommentList(commentList);
    })
    .catch((error) => {
      console.log(error);
      let message = displayErrorMessage();
      commentSection.append(message);
      //throw new Error("something went wrong"); // will be handled by the function using this function
    });
}
getCommentList();

/****** show comment ******/
function loopCommentList(arr) {
  arr.forEach((comment) => displayComment(comment));
}

function displayComment(aComment) {
  let card = createCardElement(aComment);
  commentSection.append(card);
}

function createCardElement(aComment) {
  let card = document.createElement("article");
  card.classList.add("comment__card");

  const profileImg = document.createElement("img");
  profileImg.classList.add("comment__profile-image");
  profileImg.src = "https://via.placeholder.com/150";
  profileImg.alt = "profile-image";
  card.append(profileImg);

  let commentContainer = createCommentContainer(aComment);
  card.append(commentContainer);

  return card;
}

function createCommentContainer(aComment) {
  let commentContainer = document.createElement("div");
  commentContainer.classList.add("comment__container");

  let infoContainer = createInfoContainer(aComment);
  commentContainer.append(infoContainer);

  let commentContent = document.createElement("p");
  commentContent.classList.add("comment__content");
  commentContent.innerText = aComment.comment;
  commentContainer.append(commentContent);

  let editContainer = createEditContainer(aComment);
  commentContainer.append(editContainer);

  return commentContainer;
}

function createInfoContainer(aComment) {
  let infoContainer = document.createElement("div");
  infoContainer.classList.add("comment__info-container");
  const name = document.createElement("p");
  name.classList.add("comment__name");
  name.innerText = aComment.name;
  infoContainer.append(name);

  let date = createDate(aComment.timestamp);
  infoContainer.append(date);

  return infoContainer;
}

function createDate(aDate) {
  let date = document.createElement("p");
  date.classList.add("comment__date");
  //format time
  let postDate = new Date(aDate);
  let postMonth = postDate.getUTCMonth();
  let postDay = postDate.getUTCDate();
  let postYear = postDate.getUTCFullYear();
  postMonth = (postMonth + 1).toString().padStart(2, "0");
  postDay = postDay.toString().padStart(2, "0"); //str.padStart(targetLength, padString)
  postDate = `${postMonth}/${postDay}/${postYear}`;
  let differenceInDays = getTimeDifference(postDate);
  date.innerText = `${postDate} (${differenceInDays} days)`;
  return date;
}

// showing time difference for dive deeper sprint2
function getTimeDifference(aDate) {
  let currentTime = new Date().toUTCString();
  let differenceInTime = new Date(currentTime) - new Date(aDate);
  let differenceInDays = parseInt(
    Math.floor(differenceInTime / (1000 * 3600 * 24))
  );
  if (differenceInDays < 1) {
    return "today";
  } else {
    return `${differenceInDays} days`;
  }
}

/****** form handling ******/
const form = document.querySelector(".form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const comment = e.target.comment.value;
  try {
    await axios({
      method: "post",
      url: `${baseUrl}comments/?api_key=${key}`,
      headers: { "Content-Type": "application/json" },
      data: { name, comment },
    }); //short hand using the variable as key, its value will be default as the key's value
    e.target.reset(); //form.reset()
    getCommentList();
  } catch (error) {
    e.target.reset();
    clearDisplay();
    let message = displayErrorMessage();
    commentSection.append(message);
  }
});

/****** clear out current displayed comments ******/
function clearDisplay() {
  // if only have article as children, can just set innerHTML = ""
  const commentSection = document.querySelector(".comment");
  //console.log(commentSection.lastChild.nodeName);
  while (
    commentSection.hasChildNodes() &&
    commentSection.lastChild.nodeName === "ARTICLE"
  ) {
    console.log(commentSection.lastChild);
    commentSection.removeChild(commentSection.lastChild);
  }
}

/****** dive deeper sprint3 - likes & delete  ******/
function createEditContainer(aComment) {
  let editContainer = document.createElement("div");
  editContainer.classList.add("comment__edit-container");

  let likesContainer = document.createElement("div");
  editContainer.append(likesContainer);

  let likesCount = document.createElement("span");
  likesCount.classList.add("comment__edit-count");
  likesCount.innerText = aComment.likes;

  let likesIcon = document.createElement("span");
  likesIcon.classList.add("comment__edit-like");
  likesContainer.append(likesIcon, likesCount);
  likesIcon.innerHTML = "❤️";
  likesIcon.addEventListener("click", function () {
    handleLike(aComment); // add eventListener to the tagObj directly
  });

  let deleteBtn = document.createElement("span");
  deleteBtn.classList.add("comment__edit-delete");
  deleteBtn.id = aComment.id;
  deleteBtn.innerText = "delete";
  deleteBtn.addEventListener("click", function () {
    handleDelete(aComment);
  });
  editContainer.append(deleteBtn);

  return editContainer;
}

/****** delete handler ******/
function handleDelete(aComment) {
  axios
    .delete(`${baseUrl}comments/${aComment.id}?api_key=${key}`)
    .then(() => getCommentList())
    .catch((e) => {
      throw new Error("something went wrong");
    });
}

/****** likes handler ******/
function handleLike(aComment) {
  let count = aComment.likes + 1;
  axios({
    method: "put",
    url: `${baseUrl}comments/${aComment.id}/like?api_key=${key}`,
    data: { likes: count },
  })
    .then(() => getCommentList())
    .catch((e) => {
      throw new Error("something went wrong"); // or console.log(e)?
    });
}

/****** show error message ******/
function displayErrorMessage() {
  const message = document.createElement("p");
  message.innerText = "Something Went Wrong. Try Again Later.";
  message.classList.add("error");
  return message;
}
