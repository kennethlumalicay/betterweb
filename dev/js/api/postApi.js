import Post from './../models/post.js';
import fs from 'fs';
import { updateAllUserComments, deletePostComments } from './commentApi.js';

export const fetchPosts = (query, cb) => {
  Post.find({}, (err, posts) => {
    if(err) throw err;
    cb(posts);
  });
};

export const fetchOnePost = (query, cb) => {
  Post.find({ pid: query.pid }, (err, post) => {
    if(err) throw err;
    cb(post);
  });
};

export const addPost = (query, cb) => {
  let newPost = new Post({
    pid: query.uid + Date.now().toString(36),
    uid: query.uid,
    username: query.username,
    usertag: query.usertag,
    img: query.img,
    title: query.title,
    description: query.description,
    liveLink: query.liveLink,
    githubLink: query.githubLink,
    timestamp: Date.now(),
    ups: 0,
    guest: query.guest,
    locked: false,
    commentCount: 0
  });
  newPost.save(err => {
    if(err) throw err;
    return cb(newPost );
  });
};

export const editPost = (query, cb) => {
  Post.findOne({ pid: query.pid }, (err, post) => {
    if(err) throw err;
    Object.keys(query).forEach(key => {
      post[key] = query[key] ? query[key] : post[key];
    });
    if(query.newImg) {
      fs.unlinkSync('./src/uploads/' + post.img);
      post.img = query.newImg;
    }
    post.save(err => {
      if(err) throw err;
      return cb(post);
    });
  });
};

export const deletePost = (query, cb) => {
  Post.remove({pid: query.pid}, err => {
    if(err) throw err;
    fs.unlink('./src/uploads/' + query.img, err => {
      if(err) throw err;
      deletePostComments(query.pid, cb);
    });
  });
};

export const updateAllUserPost = (user, cb) => {
  Post.updateMany({ uid: user.uid }
    , { username: user.username, usertag: user.usertag }
    , null
    , (err) => {
      if(err) throw err;
      fetchPosts(null, (posts) => {
        updateAllUserComments({
          posts: posts,
          user: user
        }, cb);
      });
    });
};

export const addCommentCount = (comment, cb) => {
  Post.updateOne({ pid: comment.pid }
    , { $inc: { commentCount: 1 }}
    , null
    , (err) => {
      if(err) throw err;
      cb(comment);
    });
};

export const minusCommentCount = (comment, cb) => {
  Post.updateOne({ pid: comment.pid }
    , { $inc: { commentCount: -1 }}
    , null
    , (err) => {
      if(err) throw err;
      cb(null);
    });
};