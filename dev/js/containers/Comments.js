import React, { Component } from 'react'; // eslint-disable-line
import hljs from 'highlight.js';
import emoji from 'markdown-it-emoji';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addComment, fetchComments, deleteComment } from './../actions/actions.js';
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
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  emoji: function(token, idx) {
    return '<span class="emoji emoji_"' + token[idx].markup + '></span>';
  }
});

md.use(emoji);

@connect(
  state => ({
    user: state.user,
    comments: state.comments
  }),
  dispatch => ({
    ...bindActionCreators({
      addComment: addComment,
      deleteComment: deleteComment,
      fetchComments: fetchComments
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

    // clear if there's no text
    if(!textarea.value.trim().length) {
      event.preventDefault();
      textarea.value = '';
      return false;
    }

    const inputs = ['uid', 'username', 'usertag', 'guest', 'pid', 'comment'];
    let query = {};
    inputs.forEach(e => {
      query = { ...query, [e]: target[e].value };
    });
    this.props.addComment(query);
    textarea.value = '';
    this.setState({
      rows: 2,
      compose: false
    });
  }

  render() {
    const { post, user, comments } = this.props;
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
      : postComments.map((e) => {
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
            delete={this.props.deleteComment}
          >
            <Comment
              owner={user.uid === e.uid}
              diff={diff}
              commentHtml={commentHtml}
              comment={{...e}}/>
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
              <input type='hidden' name='uid' value={user.uid}/>
              <input type='hidden' name='username' value={user.username}/>
              <input type='hidden' name='usertag' value={user.usertag}/>
              <input type='hidden' name='guest' value={user.guest}/>
              <input type='hidden' name='pid' value={post.pid}/>
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