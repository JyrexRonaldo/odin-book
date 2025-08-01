const prisma = require("../config/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await prisma.user.findMany({
    omit: {
      password: true,
    },
    include: {
      followedBy: true,
      following: true,
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });
  res.json(allUsers);
});

const followRequestHandler = asyncHandler(async (req, res) => {
  const { followeeId } = req.body;

  const allFollows = await prisma.follows.findMany();

  let followAction = false;
  allFollows.forEach((follow) => {
    if (
      follow.followedById === +followeeId &&
      follow.followingId === req.user.id
    ) {
      followAction = true;
    }
  });

  if (followAction) {
    await prisma.follows.delete({
      where: {
        followingId_followedById: {
          followedById: +followeeId,
          followingId: req.user.id,
        },
      },
    });
    res.status(201).json("User unfollowed");
  } else {
    await prisma.follows.create({
      data: {
        followedById: +followeeId,
        followingId: req.user.id,
      },
    });
    res.status(201).json("User followed");
  }
});

const createPost = asyncHandler(async (req, res) => {
  const { body, authorId, imgPublicUrl } = req.body;
  await prisma.post.create({
    data: {
      body,
      authorId: +authorId,
      postImageUrl: imgPublicUrl,
    },
  });
  console.log(req.body);
  res.json(req.body);
});

const getFeed = asyncHandler(async (req, res) => {
  const userPosts = await prisma.post.findMany({
    where: {
      authorId: req.user.id,
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
      comments: true,
      likedBy: true,
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
    },
  });

  const followingIdsObjects = await prisma.follows.findMany({
    where: { followingId: req.user.id },
    select: { followedById: true },
  });

  const followingIds = followingIdsObjects
    .map((idObject) => idObject.followedById)
    .filter((id) => id !== req.user.id);

  const followersPosts = await prisma.post.findMany({
    where: {
      authorId: { in: followingIds },
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
      comments: true,
      likedBy: true,
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
    },
  });

  const feed = userPosts.concat(followersPosts);

  res.status(200).json(feed);
});

const createCommentHandler = asyncHandler(async (req, res) => {
  const { comment, postId } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      comment,
      authorId: req.user.id,
      postId: +postId,
    },
    include: {
      likedBy: true,
      _count: {
        select: {
          likedBy: true,
        },
      },
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
    },
  });
  res.status(200).json(newComment);
});

const getAllPost = asyncHandler(async (req, res) => {
  const allPost = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
      comments: true,
      likedBy: true,
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
    },
  });
  res.status(200).json(allPost);
});

const getLikedPost = asyncHandler(async (req, res) => {
  const likedPostIdsObjects = await prisma.likes.findMany({
    where: {
      userId: req.user.id,
    },
    select: {
      postId: true,
    },
  });

  const likePostIds = likedPostIdsObjects.map((idObject) => {
    return idObject.postId;
  });

  const likedPosts = await prisma.post.findMany({
    where: {
      id: { in: likePostIds },
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
      comments: true,
      likedBy: true,
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
    },
  });

  res.status(200).json(likedPosts);
});

const createLikePost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const likeRecord = await prisma.likes.findUnique({
    where: {
      userId_postId: {
        userId: req.user.id,
        postId: +postId,
      },
    },
  });
  if (likeRecord) {
    await prisma.likes.delete({
      where: {
        userId_postId: {
          userId: req.user.id,
          postId: +postId,
        },
      },
    });
    const likeCount = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      select: {
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
    });
    res.status(200).json({ message: "Post unliked", likeCount });
  } else {
    await prisma.likes.create({
      data: {
        userId: req.user.id,
        postId: +postId,
      },
    });
    const likeCount = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      select: {
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
    });
    res.status(200).json({ message: "Post liked", likeCount });
  }
});

const getUserProfileByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const userProfile = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      posts: {
        include: {
          author: {
            select: {
              name: true,
              username: true,
              avatarImageUrl: true,
            },
          },
          comments: true,
          likedBy: true,
          _count: {
            select: {
              comments: true,
              likedBy: true,
            },
          },
        },
      },
      followedBy: {
        select: {
          following: {
            include: {
              followedBy: true,
              _count: {
                select: {
                  following: true,
                  followedBy: true,
                },
              },
            },
          },
        },
      },
      following: {
        select: {
          followedBy: {
            include: {
              followedBy: true,
              _count: {
                select: {
                  following: true,
                  followedBy: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          posts: true,
          followedBy: true,
          following: true,
        },
      },
    },
  });
  res.status(200).json(userProfile);
});

const deletePostById = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const deletedData = await prisma.post.delete({
    where: {
      id: +postId,
    },
  });
  console.log(deletedData);
  res.status(200).json(deletedData);
});

async function handleProfileChange(
  userId,
  name,
  bio,
  imgPublicUrl,
  changeType,
  res
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      bio,
      avatarImageUrl: imgPublicUrl,
    },
  });
  res.status(200).json({ changeType, message: "Change successful" });
}

async function handleUsernameChange(userId, username, changeType, res) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
    },
  });
  res.status(200).json({ changeType, message: "Username change successful" });
}

async function handlePasswordChange(
  userId,
  userPassword,
  oldPassword,
  newPassword,
  changeType,
  res
) {
  const match = await bcrypt.compare(oldPassword, userPassword);
  console.log(match);
  if (match) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    res.status(200).json({ changeType, message: "Password change successful" });
  } else {
    res.status(200).json({ changeType, message: "Invalid old password" });
  }
}

const editProfileInfo = asyncHandler(async (req, res) => {
  const {
    changeType,
    name,
    bio,
    imgPublicUrl,
    username,
    oldPassword,
    newPassword,
  } = req.body;

  if (changeType === "profile") {
    await handleProfileChange(
      req.user.id,
      name,
      bio,
      imgPublicUrl,
      changeType,
      res
    );
  } else if (changeType === "username") {
    await handleUsernameChange(req.user.id, username, changeType, res);
  } else if (changeType === "password") {
    await handlePasswordChange(
      req.user.id,
      req.user.password,
      oldPassword,
      newPassword,
      changeType,
      res
    );
  }
});

const getCommentsByPostId = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const comments = await prisma.comment.findMany({
    where: {
      postId: +postId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      likedBy: true,
      _count: {
        select: {
          likedBy: true,
        },
      },
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
    },
  });
  res.status(200).json(comments);
});

const deleteCommentById = asyncHandler(async (req, res) => {
  const { commentId } = req.body;
  const deletedComment = await prisma.comment.delete({
    where: {
      id: +commentId,
    },
  });
  res.status(200).json(deletedComment);
});

const createLikeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;
  const commentLikeRecord = await prisma.commentLikes.findUnique({
    where: {
      userId_commentId: {
        userId: req.user.id,
        commentId: +commentId,
      },
    },
  });

  if (commentLikeRecord) {
    await prisma.commentLikes.delete({
      where: {
        userId_commentId: {
          userId: req.user.id,
          commentId: +commentId,
        },
      },
    });
    // const commentLikeCount = await prisma.comment.findUnique({
    //   where: {
    //     id: +commentId,
    //   },
    //   select: {
    //     _count: {
    //       select: {
    //         likedBy: true,
    //       },
    //     },
    //   },
    // });
    res.status(200).json({ message: "Comment unliked" });
  } else {
    await prisma.commentLikes.create({
      data: {
        userId: req.user.id,
        commentId: +commentId,
      },
    });
    // const commentLikeCount = await prisma.comment.findUnique({
    //   where: {
    //     id: +commentId,
    //   },
    //   select: {
    //     _count: {
    //       select: {
    //         likedBy: true,
    //       },
    //     },
    //   },
    // });
    res.status(200).json({ message: "Comment liked" });
  }
});

const deleteUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  await prisma.user.delete({
    where: {
      username,
    },
  });
  res.status(200).json(`User: ${username} deleted`);
});

// const getPostById = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const post = await prisma.user.findUnique({
//     where: {
//       id: +userId,
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//           username: true,
//           avatarImageUrl: true,
//         },
//       },
//       comments: true,
//       likedBy: true,
//       _count: {
//         select: {
//           comments: true,
//           likedBy: true,
//         },
//       },
//     },
//   });
//   res.status(200).json(post);
// });

const editCommentById = asyncHandler(async (req, res) => {
  const { commentId, editComment } = req.body;
  const editedComment = await prisma.comment.update({
    where: {
      id: +commentId,
    },
    data: {
      comment: editComment,
    },
    include: {
      likedBy: true,
      _count: {
        select: {
          likedBy: true,
        },
      },
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
    },
  });
  res.status(200).json(editedComment);
});

const getPostByPostId = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: +postId,
    },
    include: {
      author: {
        select: {
          name: true,
          username: true,
          avatarImageUrl: true,
        },
      },
      comments: true,
      likedBy: true,
      _count: {
        select: {
          comments: true,
          likedBy: true,
        },
      },
    },
  });
  res.status(200).json(post);
});

const createMessage = asyncHandler(async (req, res) => {
  const { messageBody, receiverId } = req.body;
  const message = await prisma.messages.create({
    data: {
      message: messageBody,
      senderId: req.user.id,
      receiverId: +receiverId,
    },
  });
  res.status(200).json(message);
});

const getMessagesByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const messages = await prisma.messages.findMany({
    where: {
      AND: [
        { senderId: { in: [req.user.id, +userId] } },
        { receiverId: { in: [req.user.id, +userId] } },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  res.status(200).json(messages);
});

const deleteMessageById = asyncHandler(async (req, res) => {
  const { messageId } = req.body;
  await prisma.messages.delete({
    where: {
      id: +messageId,
    },
  });
  res.status(200).json(`MessageID: ${messageId}  deleted`);
});

const editMessageById = asyncHandler(async (req, res) => {
  const { messageBody, messageId } = req.body;
  // const { commentId, editComment } = req.body;
  await prisma.messages.update({
    where: {
      id: +messageId,
    },
    data: {
      message: messageBody,
    },
  });
  res.status(200).json("Message edited");
});

module.exports = {
  getAllUsers,
  followRequestHandler,
  createPost,
  getFeed,
  createCommentHandler,
  getAllPost,
  getLikedPost,
  createLikePost,
  getUserProfileByUsername,
  deletePostById,
  editProfileInfo,
  getCommentsByPostId,
  deleteCommentById,
  createLikeComment,
  deleteUserByUsername,
  // getPostById,
  editCommentById,
  getPostByPostId,
  createMessage,
  getMessagesByUserId,
  deleteMessageById,
  editMessageById,
};
