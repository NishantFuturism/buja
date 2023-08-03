/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable react/no-access-state-in-setstate */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../../utils/history';
import { alertService, alertType } from './services';
const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool
};
const defaultProps = {
  id: 'default-alert',
  fade: true
};
class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: []
    };
  }
  componentDidMount() {
    // subscribe to new alert notifications
    this.subscription = alertService.onAlert(this.props.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          const alerts = this.state.alerts.filter(x => x.keepAfterRouteChange);
          // remove 'keepAfterRouteChange' flag on the rest
          alerts.forEach(x => delete x.keepAfterRouteChange);
          this.setState({ alerts });
          return;
        }
        // add alert to array
        this.setState({ alerts: [...this.state.alerts, alert] });
        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });
    // clear alerts on location change
    this.historyUnlisten = history.listen(() => {
      alertService.clear(this.props.id);
    });
  }
  componentWillUnmount() {
    // unsubscribe & unlisten to avoid memory leaks
    this.subscription.unsubscribe();
    this.historyUnlisten();
  }
  removeAlert(alert) {
    if (this.props.fade) {
      // fade out alert
      const alertWithFade = { ...alert, fade: true };
      this.setState({ alerts: this.state.alerts.map(x => x === alert ? alertWithFade : x) });
      // remove alert after faded out
      setTimeout(() => {
        this.setState({ alerts: this.state.alerts.filter(x => x !== alertWithFade) })
      }, 250);
    } else {
      // remove alert
      this.setState({ alerts: this.state.alerts.filter(x => x !== alert) })
    }
  }
  cssClasses(alert) {
    if (!alert) return;
    const classes = ['alert', 'alert-dismissable'];
    const alertTypeClass = {
      [alertType.success]: 'alert alert-success',
      [alertType.error]: 'alert alert-danger',
      [alertType.info]: 'alert alert-info',
      [alertType.warning]: 'alert alert-warning'
    }
    classes.push(alertTypeClass[alert.type]);
    if (alert.fade) {
      classes.push('fade');
    }
    return classes.join(' ');
  }
  render() {
    const { alerts } = this.state;
    if (!alerts.length) return null;
    return (
      <div className="m-3">
        {alerts.map((alert, index) =>
          <div key={index} className={this.cssClasses(alert)}>
            <Link className="close" onClick={() => this.removeAlert(alert)}>&times;</Link>
            <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          </div>
        )}
      </div>
    );
  }
}
Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };
