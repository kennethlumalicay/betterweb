import React, { Component } from 'react';  // eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import { fetchPosts, fetchOnePost, deletePost, upvote, postChecked } from './../actions/actions.js';
import Post from './../components/Post.js';
import EditPost from './PostSubmit.js';
import Comments from './Comments.js';

@connect(
  state => ({
    posts: state.posts,
    user: state.user
  }),
  dispatch => ({
    ...bindActionCreators({
      deletePost: deletePost,
      fetchPosts: fetchPosts,
      fetchOnePost: fetchOnePost,
      upvote: upvote,
      postChecked: postChecked
    }, dispatch),
    dispatch: dispatch
  })
)

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: props.match.params.pid,
      post: null,
      checked: false,
      editPostModal: false
    };
  }

  componentWillReceiveProps(next) {
    const post = this.getPost(next);
    this.initPage(post);
  }

  componentDidMount() {
    if(!this.props.posts.items.length) {
      this.props.fetchOnePost(this.state.pid);
    }
    const post = this.getPost(this.props);
    this.initPage(post);
  }

  initPage(post) {
    if(typeof post !== 'undefined') {
      document.title = post.title + ' | BetterWeb';
      document.description = post.description;
      if(post.newComment && post.uid === this.props.user.uid) {
        this.props.postChecked(post);
      }
    }
    this.setState({
      post: post,
      checked: true
    });
  }

  openEditPost() {
    this.setState({
      editPostModal: true
    });
  }

  closeEditPost() {
    this.setState({
      editPostModal: false
    });
  }

  getPost(props) {
    return props.posts.items && props.posts.items.filter(e => e.pid === props.match.params.pid)[0];
  }

  render() {
    const { user, posts, upvote } = this.props;
    const { post, checked, editPostModal } = this.state;
    if(posts.fetching || !posts.items || !checked) {
      return (
        <section id='postpage'>
          <div className='fetching'>
            <h1><i className='fa fa-spinner fa-spin' aria-hidden='true'></i></h1>
          </div>
        </section>
      );
    }
    if(!post) {
      return (
        <section id='postpage'><div className='not-found'><h1>Post not found.</h1></div></section>
      );
    }
    return (
      <section id='postpage'>
        <Post
          post={post}
          page={true}
          editable={true}
          owner={user.uid === post.uid}
          deletePermission={user.mod || user.admin}
          delete={p => {
            this.props.deletePost(p);
            this.props.history.goBack();
          }}
          edit={() => this.openEditPost()}
          upsPermission={!user.guest && !post.voted.find(e => e === user.uid)}
          upvote={() => upvote(post, user, 'post')}/>
        <Comments post={post}/>

        <Modal className='modal' isOpen={editPostModal} onRequestClose={() => this.closeEditPost()} shouldCloseOnOverlayClick={false}>
          <div>
            <button className='modal-close' onClick={() => this.closeEditPost()}><i className='fa fa-times' aria-hidden='true'></i></button>
            <EditPost user={user} post={post} edit={true} closeModal={() => this.closeEditPost()}/>
          </div>
        </Modal>
      </section>
    );
  }
}

export default PostPage;