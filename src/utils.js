import moment from 'moment';

export function isSameDay(currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = moment(currentMessage.createdAt * 1000);
  const diffCreatedAt = moment(diffMessage.createdAt * 1000);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(currentMessage = {}, diffMessage = {}) {
  if (currentMessage.type == 'statement' || diffMessage.type == 'statement') {
    return false
  }
  return !!(diffMessage.user && currentMessage.user && diffMessage.user._id === currentMessage.user._id);
}
