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
    <div className='post-img' style={{backgroundImage: 'url('+props.post.imgLocation+')'}}></div>
    <h2>{props.post.title}</h2>
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
    </div>
    <h3>
      { props.post.guest
        ? props.post.username
        : <Link to={'/user/' + props.post.uid}>{props.post.username}</Link> }
      {oneTag(props.post.usertag, true)}
    </h3>
  </div>
);