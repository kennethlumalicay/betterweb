import Comment from './../models/comment.js';
import { addCommentCount, minusCommentCount } from './postApi.js';
import { upvoteUser } from './userApi.js';

export const fetchComments = (query, cb) => {
  Comment.find({}, (err, comments) => {
    if(err) throw err;
    cb(comments);
  });
};

export const fetchPageComments = (query, cb) => {
  Comment.find({ pid: query.pid }, (err, comments) => {
    if(err) throw err;
    cb(comments);
  });
};

export const addComment = (query, cb) => {
  let newComment = new Comment({
    cid: query.pid + Date.now().toString(36),
    pid: query.pid,
    uid: query.uid,
    username: query.username,
    usertag: query.usertag,
    comment: query.comment,
    ups: 0,
    voted: [],
    timestamp: Date.now(),
    guest: query.guest
  });
  newComment.save(err => {
    if(err) throw err;
    addCommentCount(newComment, cb);
  });
};

export const deleteComment = (query, cb) => {
  Comment.remove({cid: query.cid}, err => {
    if(err) throw err;
    minusCommentCount(query, cb);
  });
};

export const upvoteComment = (query, cb) => {
  Comment.updateOne({ cid: query.cid }
    , { $inc: { ups: 1 }, $push: { voted: query.user }}
    , null
    , err => {
      if(err) throw err;
      upvoteUser(query, cb);
    }
  );
};

export const deletePostComments = (pid, cb) => {
  Comment.remove({pid: pid}, err => {
    if(err) throw err;
    cb(null);
  });
};

export const updateAllUserComments = (data, cb) => {
  const user = data.user;
  Comment.updateMany({ uid: user.uid }
    , { username: user.username, usertag: user.usertag }
    , null
    , () => {
      fetchComments(null, (comments) => {
        cb({
          ...data,
          comments: comments
        });
      });
    });
};