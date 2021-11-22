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

/****** showing comment ******/
const commentSection = document.querySelector(".comment");

function loopCommentList(arr) {
  arr.forEach((comment) => displayComment(comment));
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
  const [postMonth, postDay, postYear] = [
    postDate.getMonth(),
    postDate.getDate(),
    postDate.getFullYear(),
  ];

  postDate = `${postMonth + 1}/${postDay}/${postYear}`;

  // time difference for dive deeper
  let currentTime = new Date();
  const [month, day, year] = [
    currentTime.getMonth(),
    currentTime.getDate(),
    currentTime.getFullYear(),
  ];
  currentTime = `${month + 1}/${day}/${year}`;
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

// dive deeper sprint3
function addEditContainer(aComment) {
  let editContainer = document.createElement("div");
  editContainer.classList.add("comment__edit-container");

  let likesContainer = document.createElement("span");
  editContainer.append(likesContainer);

  let likesIcon = document.createElement("img");
  likesIcon.src = "./assets/icons/heart-regular.svg";
  likesIcon.classList.add("comment__edit-like");
  likesContainer.append(likesIcon);
  likesIcon.id = `i${aComment.id}`;

  let likesCount = document.createElement("span");
  likesCount.innerText = aComment.likes;
  likesContainer.append(likesCount);

  let deleteBtn = document.createElement("button");
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
        window.location.reload(); // or delete that card ?
      } catch (e) {
        throw new Error("something went wrong"); // or console.log(e)?
      }
    });
  });
}

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
        window.location.reload(); // or delete that card ?
      } catch (e) {
        throw new Error("something went wrong"); // or console.log(e)?
      }
    });
  });
}

/****** form handling ******/
const form = document.querySelector(".form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //get new comment components from form input
  const username = e.target[0].value;
  const userComment = e.target[1].value; // or can give input a name attribute and then e.target.nameChosen.value
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
    window.location.reload();
  } catch (error) {
    throw new Error("something went wrong"); // or console.log(e) ?
  }

  //reset the form
  e.target.reset(); // can also do by select the input, and then nameInput.value = ""; commentInput.value = "";

  loopCommentList(commentList);
});
