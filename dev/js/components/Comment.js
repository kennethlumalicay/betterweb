import React from 'react'; // eslint-disable-line
import { Link } from 'react-router-dom';
import { oneTag, getTagColor } from './../config/usertags.js';

export default (props) => (
  <div className='comment'>
    { props.diff
      ? (
        <div className='commentUser'>
          { props.bot || props.comment.guest
            ? <h6>{props.comment.username}</h6>
            : <Link to={'/user/' + props.comment.uid}><h6 style={{color: getTagColor(props.comment.usertag)}}>{props.comment.username}</h6></Link> }
          {oneTag(props.comment.usertag, true)}
        </div> 
      )
      : null }
    { props.bot
      ? <div className='innerhtml'>{props.comment.comment}</div>
      : <div className='innerhtml' dangerouslySetInnerHTML={props.commentHtml}></div> }
    <div className='buttonHolder'>
      { props.upsPermission
        ? <button className='actionButton star' onClick={props.upvote}><i className='fa fa-star-o' aria-hidden='true'></i></button>
        : null }
      { props.deletePermission
        ? <button className='actionButton trash' onClick={props.delete}><i className='fa fa-trash-o' aria-hidden='true'></i></button>
        : null }
    </div>
    { props.comment.ups
      ? <div className='comment-details'><i className='fa fa-star-o' aria-hidden='true'></i> {props.comment.ups}</div>
      : null }
  </div>
);