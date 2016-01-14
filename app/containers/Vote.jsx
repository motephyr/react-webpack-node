import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import * as topics from 'actions/topics';
import styles from 'scss/components/_vote';

const cx = classNames.bind(styles);

@connect(state =>({
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
}))
export default class Vote extends Component {

  onIncrement(id, index) {
    this.props.dispatch(topics.incrementCount(id, index));
  }

  onDecrement(id, index) {
    this.props.dispatch(topics.decrementCount(id, index));
  }

  onDestroy(id, index) {
    this.props.dispatch(topics.destroyTopic(id, index));
  }

  onEntryChange(text) {
    this.props.dispatch(topics.typing(text));
  }

  onEntrySave(text) {
    this.props.dispatch(topics.createTopic(text));
  }


  render() {
    return (
      <div className={cx('vote')}>
        <EntryBox topic={this.props.newTopic}
          onEntryChange={::this.onEntryChange}
          onEntrySave={::this.onEntrySave} />
        <MainSection topics={this.props.topics}
          onIncrement={::this.onIncrement}
          onDecrement={::this.onDecrement}
          onDestroy={::this.onDestroy} />
        <Scoreboard topics={this.props.topics} />
      </div>
    );
  }
}
