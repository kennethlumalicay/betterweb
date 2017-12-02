import React from 'react'; // eslint-disable-line

export default (props) => (
  <section id='profile'>
    <h1>{props.username} <span className='ups-display'><i className='fa fa-star-o' aria-hidden='true'></i> {props.ups}</span></h1>
  </section>
);