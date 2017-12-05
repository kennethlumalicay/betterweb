import React from 'react'; // eslint-disable-line
import { oneTag, getTagColor } from './../config/usertags.js';

export default (props) => (
  <section id='profile'>
    <h1><span style={{color: getTagColor(props.user.usertag)}}>{props.user.username}</span> {oneTag(props.user.usertag, true)} <span className='ups-display'><i className='fa fa-star-o' aria-hidden='true'></i> {props.user.ups}</span></h1>
  </section>
);