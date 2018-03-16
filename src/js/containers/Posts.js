import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts, deletePost, upvote } from './../actions/actions.js';
import Post from './../components/Post.js';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

@connect(
  state => ({
    posts: state.posts,
    user: state.user,
    comments: state.comments
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchPosts: fetchPosts,
      deletePost: deletePost,
      upvote: upvote
    }, dispatch),
    dispatch: dispatch
  })
)

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sort: 'new',
      dateFilter: '0'
    };
  }

  componentDidMount() {
    const { posts } = this.props;
    if(posts.onepage || !posts.items.length) {
      this.props.fetchPosts();
    }
  }

  changeSort(e) {
    this.setState({
      sort: e.target.value
    });
  }

  changeDateFilter(e) {
    this.setState({
      dateFilter: e.target.value
    });
  }

  changeFilter(e) {
    this.setState({
      search: e.target.value
    });
  }

  filterByUid(posts) {
    if(this.props.uid) {
      return posts.filter(e => e.uid === this.props.uid);
    }
    return posts;
  }

  filterByDate(posts) {
    const { dateFilter } = this.state;
    return +dateFilter
      ? posts.filter(e => Date.now() - e.timestamp <= Number(this.state.dateFilter)*1000*60*60*24)
      : posts;
  }

  filterBySearch(posts) {
    if(this.state.search) {
      const spaceToOr = this.state.search.trim().replace(/ +/g, '|');
      const search = new RegExp(spaceToOr, 'ig');

      const getRelevance = (item) => {
        const matches = item.match(search);
        return matches ? matches.length : 0;
      };
      
      const relevant = posts.map(e => {
        e.relevance = 0;
        e.relevance = getRelevance(e.title)*3 + getRelevance(e.username)*3 + getRelevance(e.usertag)*2 + getRelevance(e.description);
        e.relevance += e.relevance > 0 ? e.ups : 0; 
        return e;
      });
      return relevant.filter(e => e.relevance > 0);
    }
    return posts;
  }

  sortPost(posts) {
    // sort with timestamp
    const sort = (arr, prop = 'timestamp', asc = false) => arr.sort((a,b) => (asc ? a[prop] - b[prop] : b[prop] - a[prop]) || b.timestamp - a.timestamp);
    switch(this.state.sort) {
      case 'new':
        return sort(posts);
      case 'best':
        return sort(posts, 'ups');
      case 'relevance':
        return sort(posts, 'relevance');
      case 'latestFeedback':
        return sort(posts, 'lastComment');
      case 'mostDiscussed':
        return sort(posts, 'commentCount');
      case 'needFeedback':
        return sort(posts, 'commentCount', true);
    }
  }

  render() {
    const { user, posts, deletePost, upvote, uid } = this.props;
    if(posts.fetching || !posts.items) {
      return (
        <section id='posts'>
          <div className='fetching'>
            <h1><i className='fa fa-spinner fa-spin' aria-hidden='true'></i></h1>
          </div>
        </section>
      );
    }

    if(posts.failedFetch) {
      return (
        <section id='posts'>
          <div className='not-found'>
            <button className='refresh' onClick={() => this.props.fetchPosts()}>
              <h1><i className='fa fa-refresh' aria-hidden='true'></i></h1>
            </button>
          </div>
        </section>
      );
    }

    const byUid = this.filterByUid(this.props.posts.items);
    const byDate = this.filterByDate(byUid);
    const bySearch = this.filterBySearch(byDate);
    const display = this.sortPost(bySearch);
    const mappedDisplay = display.map((post) => (
      <CSSTransition
        key={post.pid}
        timeout={500}
        classNames='post'
      >
        <Post
          post={post}
          owner={user.uid === post.uid}
          deletePermission={user.mod || user.admin}
          delete={deletePost}
          upsPermission={!user.guest && !post.voted.find(e => e === user.uid)}
          upvote={() => upvote(post, user, 'post')}
          userPage={Boolean(uid)}/>
      </CSSTransition>
    ));

    return (
      <section id='posts'>
        <div className='search'>
          <input type='text' placeholder='Search' onChange={(e) => this.changeFilter(e)}/>
          <label>
            <select onChange={(e) => this.changeSort(e)}>
              <option value='new'>New</option>
              <option value='best'>Best</option>
              <option value='latestFeedback'>Latest Feedback</option>
              <option value='relevance'>Relevance</option>
              <option value='mostDiscussed'>Most Discussed</option>
              <option value='needFeedback'>Need Feedback</option>
            </select>
          </label>
          <label>
            <select onChange={(e) => this.changeDateFilter(e)}>
              <option value='0'>All</option>
              <option value='365'>This Year</option>
              <option value='180'>6 Months</option>
              <option value='90'>3 Months</option>
              <option value='30'>This Month</option>
              <option value='7'>This Week</option>
              <option value='3'>3 Days</option>
              <option value='1'>Today</option>
            </select>
          </label>
        </div>
        <TransitionGroup className='posts'>
          {mappedDisplay}
        </TransitionGroup>
      </section>
    );
  }
}

export default Posts;