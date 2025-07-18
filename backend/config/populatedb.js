const { faker } = require("@faker-js/faker");
const prisma = require("./prisma");
const asyncHandler = require("express-async-handler");

const usersData = Array.from({ length: 10 }).map((element, index) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  element = {
    name: `${firstName} ${lastName}`,
    username: faker.internet.username({ firstName, lastName }),
    password: faker.internet.password(),
    email: faker.internet.email({ firstName, lastName }),
    bio: faker.person.bio(),
    avatarImageUrl: faker.image.avatar(),
    dateJoined: faker.date.past(),
  };
  return element;
});

const postsData = Array.from({ length: 20 }).map((element, index) => {
  let authorId = index + 1;
  //   let status = false;
  if (authorId > 10) {
    authorId -= 10;
  }

  // { width: 1750, height: 1750 }

  element = {
    body: faker.lorem.paragraph(),
    authorId,
    createdAt: faker.date.past(),
    postImageUrl: faker.image.urlPicsumPhotos(),
  };
  return element;
});

const commentsData = Array.from({ length: 40 }).map((element, index) => {
  let authorId = index + 1;
  if (authorId > 30) {
    authorId -= 30;
  } else if (authorId > 20) {
    authorId -= 20;
  } else if (authorId > 10) {
    authorId -= 10;
  }
  let postId = index + 1;
  if (postId > 20) {
    postId -= 20;
  }

  element = {
    comment: faker.lorem.sentence(),
    authorId,
    postId,
  };
  return element;
});

const populateUserDb = asyncHandler(async () => {
  await prisma.user.createMany({
    data: usersData,
  });
  console.log({ usersData });
});

const populatePostDb = asyncHandler(async () => {
  await prisma.post.createMany({
    data: postsData,
  });
  console.log(postsData);
});

const populateCommentDb = asyncHandler(async () => {
  await prisma.comment.createMany({
    data: commentsData,
  });
  console.log(commentsData);
});

const populatedb = asyncHandler(async () => {
  await populateUserDb();
  await populatePostDb();
  await populateCommentDb();
});

populatedb();
