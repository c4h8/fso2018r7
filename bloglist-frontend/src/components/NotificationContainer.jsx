import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const NotificationContainer = ({ notifications }) => (
  <div>
    {notifications.map(notification =>
      <div key={notification.id} style={notification.style}>
        {notification.message}
      </div>
    )}
  </div>
);

NotificationContainer.propTypes = ({
  notifications: PropTypes.arrayOf(Object)
});

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps)(NotificationContainer);
