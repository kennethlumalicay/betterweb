import React from 'react'; // eslint-disable-line

export default (props) => (
  <section id='profile'>
    <h1>{`${props.username} [${props.ups || '-'}]`}</h1>
  </section>
);