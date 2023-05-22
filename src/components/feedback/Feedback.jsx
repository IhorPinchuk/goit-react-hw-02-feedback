import React, { Component } from 'react';
import Section from './section/Section';
import FeedbackOptions from './feedbackOptions/FeedbackOptions';
import Statistics from './statistics/Statistics';
import { Notification } from './notification/Notification';

export default class Feedback extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    btns: ['Good', 'Neutral', 'Bad'],
  };

  handleFeadbackIncrement = e => {
    if (e === 'Good') {
      this.setState(prevState => ({
        good: prevState.good + 1,
      }));
    } else if (e === 'Neutral') {
      this.setState(prevState => ({
        neutral: prevState.neutral + 1,
      }));
    } else {
      this.setState(prevState => ({
        bad: prevState.bad + 1,
      }));
    }
  };

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    if (this.countTotalFeedback() === 0) {
      return 0;
    }
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  render() {
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state.btns}
            onLeaveFeedback={this.handleFeadbackIncrement}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() !== 0 ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}
