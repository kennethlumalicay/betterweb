import React, { Component } from 'react';  // eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPost, editPost } from './../actions/actions.js';
import path from 'path';

@connect(
  state => ({
    posts: state.posts
  }),
  dispatch => ({
    ...bindActionCreators({
      addPost: addPost,
      editPost: editPost
    }, dispatch),
    dispatch: dispatch
  })
)

class PostSubmit extends Component {

  submitPost(event) {
    event.preventDefault();
    const { dispatch, posts, closeModal, addPost, edit, editPost, post, user } = this.props;
    const data = edit ? post : user;
    const { target } = event;
    let hidden = {
      uid: data.uid,
      usertag: data.usertag,
      guest: data.guest,
      username: data.username
    };

    if(edit) {
      hidden = {
        ...hidden,
        img: data.img,
        pid: data.pid
      };
    }

    // file checks
    const file = edit ? target.newImg.files : target.img.files;
    if(file[0]) {
      switch(path.extname(file[0].name)) {
        case '.jpg':
        case '.png':
        case '.gif':
        case '.jpeg':
        case '.jpe':
          break;
        default:
          dispatch({ type: 'INVALID_FILE_TYPE' });
          return false;
      }
      if(file[0].size > 1.5e+6) {
        dispatch({ type: 'FILE_TOO_BIG' });
        return false;
      }
    }

    const github = target.githubLink.value;
    const live = target.liveLink.value;
    
    // check link if it start with http or https protocol
    const protocol = ['http', 'https'].join('|');
    const protocolRegex = new RegExp(`^(${protocol})://`);
    const check = (link) => protocolRegex.test(link);
    if((live ? !check(live) : false) || (github ? !check(github) : false)) {
      dispatch({ type: 'INVALID_PROTOCOL' });
      return false;
    }

    // make sure github link is from github
    if(github && github.length && !github.match(new RegExp(/^https:\/\/github.com\//,'i'))) {
      dispatch({ type: 'INVALID_GITHUB_LINK' });
      return false;
    }

    // check if the same link has been posted by the user within a day
    const uid = data.uid;
    const dupe = posts.items.filter(e => e.uid === uid && e.liveLink === live && e.timestamp - Date.now() < 24*1000*60*60);
    if(dupe.length && (edit ? post.liveLink !== live : true)) {
      dispatch({ type: 'SPAM' });
      return false;
    }

    closeModal();
    if(edit) {
      editPost(target, hidden);
      return false;
    }
    addPost(target, hidden);
  }

  render() {
    const { edit, post } = this.props;

    return (
      <section id='postsubmit'>
        <form className='form' onSubmit={(e) => this.submitPost(e)}>
          <input type='text' name='title' placeholder='Title' minLength='5' maxLength='25' autoFocus autoComplete='off' defaultValue={ edit ? post.title : ''} required={!edit}/>
          <input type='text' name='description' placeholder='Short description' maxLength='140' autoComplete='off' defaultValue={ edit ? post.description : ''}/>
          <label className='file-select'>
            <input type='file' name={edit ? 'newImg' : 'img'} accept='image/*' required={!edit}/>
            <span>Image</span>
          </label>
          <input type='url' name='liveLink' placeholder='Live link' autoComplete='off' defaultValue={ edit ? post.liveLink : ''} required={!edit}/>
          <input type='url' name='githubLink' placeholder='Github repo (optional)' autoComplete='off' defaultValue={ edit ? post.githubLink : ''}/>
          <input type='submit' value={ edit ? 'Update' : 'Submit'}/>
        </form>
      </section>
    );
  }
}

export default PostSubmit;