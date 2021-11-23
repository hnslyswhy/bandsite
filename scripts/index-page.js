const baseUrl = "https://project-1-api.herokuapp.com/";
const key = "7d1b181a-7bbf-4a08-a5e3-9682f3039544";

let commentList;
/*
axios
  .get(`${baseUrl}comments/?api_key=${key}`)
  .then((response) => {
    console.log(response);
    commentList = response.data;
    console.log(commentList);
  })
  .catch((e) => console.log(e));
*/

async function getCommentList() {
  try {
    const response = await axios.get(`${baseUrl}comments/?api_key=${key}`);
    commentList = response.data;
    commentList.sort(
      (comment1, comment2) => comment2.timestamp - comment1.timestamp
    );
    console.log(commentList);
    loopCommentList(commentList);
    // dive deeper sprint3
    addDeleteFunc();
    addLikeFunc(commentList);
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong"); // ? is this proper way to handler error
  }
}

getCommentList();

/****** show comment ******/
function loopCommentList(arr) {
  arr.forEach((comment) => displayComment(comment));
}

function displayComment(aComment) {
  const commentSection = document.querySelector(".comment");
  let card = addCardElement(aComment);
  commentSection.append(card);
}

function clearDisplay() {
  const commentSection = document.querySelector(".comment");
  console.log(commentSection.lastChild.nodeName);
  while (
    commentSection.hasChildNodes() &&
    commentSection.lastChild.nodeName === "ARTICLE"
  ) {
    console.log(commentSection.lastChild);
    commentSection.removeChild(commentSection.lastChild);
  }
}

function addCardElement(aComment) {
  let card = document.createElement("article");
  card.classList.add("comment__card");

  const profileImg = document.createElement("img");
  profileImg.classList.add("comment__profile-image");
  profileImg.src = "https://via.placeholder.com/150";
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
  commentContent.innerText = aComment.comment;
  commentContainer.append(commentContent);

  let editContainer = addEditContainer(aComment);
  commentContainer.append(editContainer);

  return commentContainer;
}

function addInfoContainer(aComment) {
  let infoContainer = document.createElement("div");
  infoContainer.classList.add("comment__info-container");
  const name = document.createElement("p");
  name.classList.add("comment__name");
  name.innerText = aComment.name;
  infoContainer.append(name);

  let date = addDate(aComment.timestamp);
  infoContainer.append(date);

  return infoContainer;
}

function addDate(aDate) {
  let date = document.createElement("p");
  date.classList.add("comment__date");

  let postDate = new Date(aDate);
  let [postMonth, postDay, postYear] = [
    postDate.getUTCMonth(),
    postDate.getUTCDate(),
    postDate.getUTCFullYear(),
  ];
  postMonth = postMonth + 1;
  if (postMonth + 1 < 10) {
    postMonth = `0${postMonth.toString()}`;
  }
  if (postDay < 10) {
    postDay = `0${postDay.toString()}`;
  }
  postDate = `${postMonth}/${postDay}/${postYear}`;

  // showing time difference for dive deeper sprint2
  let currentTime = new Date().toUTCString();
  let differenceInTime = new Date(currentTime) - new Date(postDate);
  let differenceInDays = parseInt(
    Math.floor(differenceInTime / (1000 * 3600 * 24))
  );
  if (differenceInDays < 1) {
    date.innerText = `${postDate} (today)`;
  } else {
    date.innerText = `${postDate} (${differenceInDays} days)`;
  }

  return date;
}

/****** form handling ******/
const form = document.querySelector(".form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //get new comment components from form input
  const username = e.target.name.value;
  const userComment = e.target.comment.value;
  try {
    await axios({
      method: "post",
      url: `${baseUrl}comments/?api_key=${key}`,
      headers: { "Content-Type": "application/json" },
      data: {
        name: username,
        comment: userComment,
      },
    });
  } catch (error) {
    throw new Error("something went wrong"); // or console.log(e) ?
  }
  //reset the form
  e.target.reset();
  // reload the comments window.location.reload();
  clearDisplay();
  getCommentList();
});

/****** dive deeper sprint3 - likes & delete  ******/
function addEditContainer(aComment) {
  let editContainer = document.createElement("div");
  editContainer.classList.add("comment__edit-container");

  let likesContainer = document.createElement("div");
  editContainer.append(likesContainer);

  let likesIcon = document.createElement("span");
  likesIcon.classList.add("comment__edit-like");
  likesContainer.append(likesIcon);
  likesIcon.innerHTML = "❤️";
  likesIcon.id = `i${aComment.id}`;

  let likesCount = document.createElement("span");
  likesCount.classList.add("comment__edit-count");
  likesCount.innerText = aComment.likes;
  likesContainer.append(likesCount);

  let deleteBtn = document.createElement("span");
  deleteBtn.classList.add("comment__edit-delete");
  deleteBtn.id = aComment.id;
  deleteBtn.innerText = "delete";
  editContainer.append(deleteBtn);

  return editContainer;
}

/****** dive deeper sprint3 - delete handler ******/
function addDeleteFunc() {
  const deleteList = document.querySelectorAll(".comment__edit-delete");
  deleteList.forEach((btn) => {
    btn.addEventListener("click", async function (e) {
      try {
        await axios.delete(`${baseUrl}comments/${this.id}?api_key=${key}`);
        //another way to do it, refresh the page. window.location.reload();
        clearDisplay();
        getCommentList();
      } catch (e) {
        throw new Error("something went wrong"); // or console.log(e)?
      }
    });
  });
}

/****** dive deeper sprint3 - likes handler ******/
function addLikeFunc(arr) {
  const likeList = document.querySelectorAll(".comment__edit-like");
  likeList.forEach((icon) => {
    icon.addEventListener("click", async function (e) {
      let target = arr.find((comment) => (comment.id = this.id.slice(1)));
      console.log(target);
      let count = target.likes + 1;
      console.log(count);
      try {
        await axios({
          method: "put",
          url: `${baseUrl}comments/${this.id.slice(1)}/like?api_key=${key}`,
          data: {
            likes: count,
          },
        });
        //another way refresh the page. window.location.reload();
        clearDisplay();
        getCommentList();
      } catch (e) {
        throw new Error("something went wrong"); // or console.log(e)?
      }
    });
  });
}
