import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a notification object with the provided options.
 *
 * @param {Object} options - The options for the notification.
 * @param {string} options.title - The title of the notification.
 * @param {string} options.type - The type of the notification. Must be one of: 'success', 'info', 'warning', 'error'.
 * @param {string} options.message - The message of the notification.
 * @param {string} options.authorId - The author ID of the notification.
 * @param {Object} [options.log] - The optional log configuration for the notification.
 * @param {string} [options.log.scope='global'] - The scope of the log. Default is 'global'.
 * @param {string} [options.log.action='unknown'] - The action associated with the log. Default is 'unknown'.
 * @returns {Object} The created notification object.
 * @throws {Error} If the options are invalid or missing required fields.
 */
export const newNotification = (options) => {
  const types = [
    'success',
    'info',
    'warning',
    'error'
  ]

  if (!options) {
    throw new Error('Invalid notification options');
  }

  if (!options.title) {
    throw new Error('Invalid notification title');
  }

  if (!types.includes(options.type) || !options.type) {
    throw new Error('Invalid notification type');
  }

  if (!options.message) {
    throw new Error('Invalid notification message');
  }

  if (!options.authorId) {
    throw new Error('Invalid notification meta, authorId is required');
  }

  return {
    id: uuidv4(),
    show: true,
    message: options.message,
    title: options.title,
    type: options.type,
    created: new Date(),
    duration: 5000,
    authorId: options.authorId,
    log: {
      scope: options?.log?.scope || 'global',
      action: options?.log?.action || 'unknown',
    }
  };
}