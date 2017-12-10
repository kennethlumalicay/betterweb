import React from 'react'; // eslint-disable-line
import { Link } from 'react-router-dom';
import { oneTag } from './../config/usertags.js';

export default (props) => (
  <div className='post'>
    { props.deletePermission
      ? (
        <div className='buttonHolder'>
          <button className='actionButton trash' onClick={props.delete}><i className='fa fa-trash-o' aria-hidden='true'></i></button>
          { props.editable
            ? <button className='actionButton edit' onClick={props.edit}><i className='fa fa-pencil-square-o' aria-hidden='true'></i></button>
            : null }
        </div>
      )
      : null }
    { props.page
      ? <a href={props.post.liveLink} target='_blank' rel='noopener noreferrer'>
        <div className='post-img' style={{backgroundImage: 'url('+props.post.imgLocation+')'}}></div>
      </a>
      : <Link to={'/post/' + props.post.pid}>
        <div className='post-img' style={{backgroundImage: 'url('+props.post.imgLocation+')'}}></div>
      </Link> }
    <div className='post-content'>
      <h2>
        <span>{props.post.title}</span>
        { props.post.ups
          ? <span className='ups-display'> <i className='fa fa-star-o' aria-hidden='true'></i> <span>{props.post.ups}</span></span>
          : null }
      </h2>
      <p>{props.post.description}</p>
      <div className='post-links'>
        { props.post.liveLink
          ? <a href={props.post.liveLink} target='_blank' rel='noopener noreferrer'><i className='fa fa-globe' aria-hidden='true'></i></a>
          : null }
        { props.post.githubLink
          ? <a href={props.post.githubLink} target='_blank' rel='noopener noreferrer'><i className='fa fa-github' aria-hidden='true'></i></a>
          : null }
        { !props.page
          ? <Link to={'/post/' + props.post.pid}><i className='fa fa-commenting' aria-hidden='true'></i> <sup>{props.post.commentCount || ''}</sup></Link>
          : null }
        <div className='sharePost'>
          <span><i className='fa fa-share' aria-hidden='true'></i></span>
          <div>
            <a href={`http://www.facebook.com/dialog/feed?app_id=140501023253690&ref=site&display=page&link=http://betterweb.tech/post/${props.post.pid}`} target='_blank' rel='noopener noreferrer'><i className='fa fa-facebook' aria-hidden='true'></i></a>
            <a href={`http://twitter.com/home?status=Help make ${props.post.guest ? 'this' : props.post.username+'\'s'} website better by giving some feedback here at http://betterweb.tech/post/${props.post.pid}. Thanks!`} target='_blank' rel='noopener noreferrer'><i className='fa fa-twitter' aria-hidden='true'></i></a>
            <a href={`https://www.reddit.com/submit?url=http://betterweb.tech/post/${props.post.pid}&title=Help make ${props.post.guest ? 'this' : props.post.username+'\'s'} website better by giving some feedback here. Thanks!`} target='_blank' rel='noopener noreferrer'><i className='fa fa-reddit' aria-hidden='true'></i></a>
          </div>
        </div>
        { props.upsPermission
          ? <button onClick={props.upvote}><i className='fa fa-star-o' aria-hidden='true'></i></button>
          : null }
      </div>
      { props.userPage
        ? null
        : <h3>
          { props.post.guest
            ? props.post.username
            : <Link to={'/user/' + props.post.uid}>{props.post.username}</Link> }
          {oneTag(props.post.usertag, true)}
        </h3> }
    </div>
  </div>
);