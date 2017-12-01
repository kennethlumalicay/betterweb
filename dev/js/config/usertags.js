import React from 'react'; // eslint-disable-line

export const usertags = [
  { tag: 'User', color: '#48E5C2' },
  { tag: 'Business Owner', color: '#61E786' },
  { tag: 'Hobbyist', color: '#087E8B' },
  { tag: 'Blogger', color: '#EDFFEC' },
  { tag: 'Writer', color: '#9792E3' },
  { tag: 'Photographer', color: '#ADE25D' },
  { tag: 'Artist', color: '#F49D6E' },
  { tag: 'Front End', color: '#2176FF' },
  { tag: 'Back End', color: '#DD403A' },
  { tag: 'Full Stack', color: '#F79824' },
  { tag: 'Designer', color: '#FDCA40' },
  { tag: 'Bot', color: '#eee', hidden: true }
];

export const mappedTags = (checked) => usertags.map((e,i) => e.hidden ? null : (
  <label key={i} className='usertag' style={{backgroundColor: e.color}}>
    <input type='radio' name='usertag' value={e.tag} defaultChecked={ checked ? e.tag === checked : i<1}/>
    <span>{e.tag}</span>
  </label>
));

export const oneTag = (user, disabled) => {
  const { tag, color } = usertags.filter(e => e.tag === (user || 'User'))[0] || usertags[0];
  return (
    <label className='usertag' style={{backgroundColor: color}}>
      <input type='radio' name='usertag' value={tag} defaultChecked={!disabled} disabled={disabled}/>
      <span>{tag}</span>
    </label>
  );
};

export const getTagColor = (tag) => {
  const usertag = usertags.filter(e => e.tag === tag)[0];
  return usertag ? usertag.color : usertags[0].color;
};