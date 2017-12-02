import Post from './../models/post.js';
import aws from 'aws-sdk';
import { updateAllUserComments, deletePostComments } from './commentApi.js';
import { upvoteUser } from './userApi.js';

const s3 = new aws.S3();

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
    imgLocation: query.imgLocation,
    title: query.title,
    description: query.description,
    liveLink: query.liveLink,
    githubLink: query.githubLink,
    timestamp: Date.now(),
    ups: 0,
    voted: [],
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
    if(query.new) {
      s3.deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: post.img
      }, err => {
        if(err) throw err;
      });
      post.img = query.newImg;
      post.imgLocation = query.newImgLocation;
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
    s3.deleteObject({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: query.img
    }, err => {
      if(err) throw err;
      deletePostComments(query.pid, cb);
    });
  });
};

export const upvotePost = (query, cb) => {
  Post.updateOne({ pid: query.pid }
    , { $inc: { ups: 1 }, $push: { voted: query.user }}
    , null
    , err => {
      if(err) throw err;
      upvoteUser(query, cb);
    }
  );
};

export const updateAllUserPost = (user, cb) => {
  Post.updateMany({ uid: user.uid }
    , { username: user.username, usertag: user.usertag }
    , null
    , err => {
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
    , err => {
      if(err) throw err;
      cb(comment);
    });
};

export const minusCommentCount = (comment, cb) => {
  Post.updateOne({ pid: comment.pid }
    , { $inc: { commentCount: -1 }}
    , null
    , err => {
      if(err) throw err;
      cb(null);
    });
};