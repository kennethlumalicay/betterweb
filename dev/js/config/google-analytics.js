import ga from 'react-ga';

ga.initialize('UA-110893275-1');

export const logPageView = (window) => {
  ga.pageview(window.location.pathname + window.location.search);
};

export const logModalView = (modal) => {
  ga.modalview(`/${modal}`);
};

export const logLogin = (type) => {
  ga.event({
    category: 'user',
    action: 'login',
    label: type
  });
};

export const logRegister = () => {
  ga.event({
    category: 'user',
    action: 'register'
  });
};

export const logAddPost = () => {
  ga.event({
    category: 'post',
    action: 'add'
  });
};

export const logAddComment = () => {
  ga.event({
    category: 'comment',
    action: 'add'
  });
};

export const logUpvote = () => {
  ga.event({
    category: 'upvote',
    action: 'add'
  });
};

export const logOutboundLink = (label) => {
  ga.outboundLink({
    label: label,
  }, () => {});
};