import React, { Component } from 'react'; // eslint-disable-line
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

@connect(
  state => ({
    notif: state.notif
  })
)

class Notif extends Component {
  constructor(props) {
    super(props);
    this.remove = null;
    this.limit = 3;
  }

  componentWillReceiveProps(next) {
    if(next.notif.items.length > this.limit) {
      this.dispatchRemove();
      clearTimeout(this.remove);
    }
    if(next.notif.remove) {
      this.removePopUp();
    }
  }

  dispatchRemove() {
    this.props.dispatch({ type: 'REMOVE_NOTIF' });
  }

  removePopUp() {
    this.remove = setTimeout(() => {this.dispatchRemove();}, this.props.notif.timeout || 3000);
  }


  render() {
    const { items } = this.props.notif;

    if(!items.length) {
      return null;
    }

    const duration = 500;

    const limitedItems = [...items].slice(0,this.limit).reverse();
    const mappedItems = limitedItems.map(e => (
      <CSSTransition
        key={e.timestamp + e.msg}
        timeout={duration}
        classNames='notif-msg'
      >
        <p className={'n-msg ' + e.msgClass}>{e.msg}</p>
      </CSSTransition>
    ));

    return (
      <section id='notification'>
        <TransitionGroup className='notif'>
          {mappedItems}
        </TransitionGroup>
      </section>
    );
  }
}

export default Notif;