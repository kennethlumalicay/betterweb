import React, { Component } from 'react'; // eslint-disable-line
import hljs from 'highlight.js';
import emoji from 'markdown-it-emoji';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addComment, fetchComments, deleteComment, upvote } from './../actions/actions.js';
import Comment from './../components/Comment.js';

var md = require('markdown-it')({
  highlight: function (str, language = 'js') {
    const defaultLang = str.trim()[0] === '<' ? 'html' : 'js';
    const lang = language ? language : defaultLang;
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {null;}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  },
  html: false,
  linkify: true,
  typographer: true,
  breaks: true,
  emoji: function(token, idx) {
    return '<span class="emoji emoji_"' + token[idx].markup + '></span>';
  }
});
md.use(emoji);

// https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
// Remember old renderer, if overriden, or proxy to default renderer
var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // If you are sure other plugins can't add `target` - drop check below
  const tIndex = tokens[idx].attrIndex('target');
  const rIndex = tokens[idx].attrIndex('rel');

  if (tIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']); // add new attribute
  } else {
    tokens[idx].attrs[tIndex][1] = '_blank'; // replace value of existing attr
  }
  if (rIndex < 0) {
    tokens[idx].attrPush(['rel', 'noopener noreferrer']); // add new attribute
  } else {
    tokens[idx].attrs[rIndex][1] = 'noopener noreferrer'; // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

@connect(
  state => ({
    user: state.user,
    comments: state.comments
  }),
  dispatch => ({
    ...bindActionCreators({
      addComment: addComment,
      deleteComment: deleteComment,
      fetchComments: fetchComments,
      upvote: upvote
    }, dispatch),
    dispatch: dispatch
  })
)

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 2,
      compose: false
    };
  }

  componentDidMount() {
    if(!this.props.comments.items.length) {
      this.props.fetchComments();
    }
  }

  composeMode() {
    this.setState({
      compose: !this.state.compose
    });
  }

  handleEnter(event) {
    const textarea = event.target;
    const linebreak = textarea.value.match(/\r\n|\r|\n/gi);
    const lbrows = linebreak ? linebreak.length : 0;
    this.setState({
      rows: lbrows ? lbrows + 1 : 2
    });

    const { compose } = this.state;
    if(event.key === 'Enter') {
      if(event.ctrlKey && !compose) {
        this.setState({
          compose: true
        });
        return false;
      }

      // do some magic on ```
      const lastline = textarea.value.split(/\r\n|\r|\n/ig).reverse()[0];
      const code = new RegExp(/^```(|(| )js|(| )html)$/igm);
      const matches = textarea.value.match(code) || [];
      const cursorAtEnd = textarea.selectionStart === textarea.value.length;
      if(cursorAtEnd && matches.length%2 !== 0 && code.test(lastline)) {
        event.preventDefault();
        textarea.value += '\n\n```';
        textarea.selectionStart -= 4;
        textarea.selectionEnd -= 4;
        textarea.rows += cursorAtEnd ? 2 : 1;
        this.setState({
          compose: true
        });
        return false;
      }

      // submit otherwise
      if((!event.shiftKey && !compose) || event.ctrlKey) {
        event.preventDefault();
        this.submit(textarea.form);
      }
    }
  }

  handleComment(event) {
    event.preventDefault();
    this.submit(event.target);
  }

  submit(target) {
    const textarea = target.comment;
    const { post, user } = this.props;

    // clear if there's no text
    if(!textarea.value.trim().length) {
      event.preventDefault();
      textarea.value = '';
      return false;
    }
    
    let query = {
      uid: user.uid,
      username: user.username,
      usertag: user.usertag,
      guest: user.guest,
      pid: post.pid,
      comment: textarea.value.trim()
    };
    this.props.addComment(query);
    textarea.value = '';
    this.setState({
      rows: 2,
      compose: false
    });
  }

  render() {
    const { post, user, comments, upvote, deleteComment } = this.props;
    const { rows, compose } = this.state;

    const postComments = comments.items.filter(e => e.pid === post.pid);

    let prev = [];
    const mappedComments = !postComments.length
      ? (
        <CSSTransition
          key={'comment'}
          timeout={500}
          classNames='comment'
        >
          <Comment bot={true} diff={true}
            comment={{
              username: 'Mr. Awesome',
              usertag: 'Bot',
              comment: 'Go give that first feedback! :)'
            }}
          />
        </CSSTransition>
      )
      : postComments.sort((a,b) => a.timestamp - b.timestamp).map((e) => {
        const commentHtml = {
          __html: md.render(e.comment)
        };
        const diff = !prev || prev.uid !== e.uid || prev.username !== e.username || prev.usertag !== e.usertag;
        prev = e;
        return (
          <CSSTransition
            key={'comment'+e.cid}
            timeout={250}
            classNames='comment'
          >
            <Comment
              deletePermission={user.uid === e.uid || user.mod || user.admin}
              delete={() => deleteComment(e)}
              diff={diff}
              commentHtml={commentHtml}
              comment={{...e}}
              upsPermission={!user.guest && user.uid !== e.uid && (e.voted && !e.voted.find(v => v === user.uid) || !e.voted)}
              upvote={() => upvote(e, user, 'comment')}/>
          </CSSTransition>
        );
      });

    return (
      <section id='comments'>
        { comments.fetching
          ? (
            <div className='fetching'>
              <h1><i className='fa fa-spinner fa-spin' aria-hidden='true'></i></h1>
            </div>
          )
          : (
            <TransitionGroup className='stream'>
              {mappedComments}
            </TransitionGroup>
          )}
        { post.locked
          ? null
          : (
            <form onSubmit={(e) => this.handleComment(e)}>
              <textarea
                autoComplete='off'
                autoFocus='true'
                name='comment'
                rows={rows}
                spellCheck='true'
                onKeyDown={(e) => this.handleEnter(e)}
              />
              <button type='button' onClick={() => this.composeMode()}>
                { compose
                  ? <i className='fa fa-keyboard-o' aria-hidden='true'></i>
                  : <i className='fa fa-commenting-o' aria-hidden='true'></i> }
              </button>
              <input type='submit' value='Submit'/>
            </form>
          )}
      </section>
    );
  }
}

export default Comments;