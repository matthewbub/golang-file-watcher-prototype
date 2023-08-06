import { supabase } from '../connections';

/**
 * Logger class to log events to the database.
 * @class
 */
class Logger {
  /**
   * Logger constructor.
   * @constructor
   * @param {string} logType - The type of the log event.
   */
  constructor(logType) {
    this.logType = logType;
  }

  /**
   * Log event to the database.
   * @private
   * @async
   * @param {Object} param0 - The log event details.
   * @param {string} param0.log_message - The message describing the log event.
   * @param {string} param0.log_status - The status of the log event ('success', 'error', or 'info').
   * @param {(Object|string)} param0.data - The data related to the log event.
   * @throws {Error} If there is an error inserting the log event to the database.
   * @returns {Promise<void>} Returns a Promise that resolves when the log event is inserted into the database.
   */
  async logEvent({ log_message, log_status, data }) {
    await supabase.from('logs').insert([{
      log_type: this.logType,
      log_message,
      log_status,
      data
    }]);
  }

  /**
   * Log a success event.
   * @async
   * @param {Object} param0 - The success event details.
   * @param {string} param0.log_message - The message describing the success event.
   * @param {(Object|string)} param0.data - The data related to the success event.
   * @returns {Promise<void>} Returns a Promise that resolves when the success event is logged.
   */
  async success({ log_message, data }) {
    return this.logEvent({ log_message, log_status: 'success', data });
  }

  /**
   * Log an error event.
   * @async
   * @param {Object} param0 - The error event details.
   * @param {string} param0.log_message - The message describing the error event.
   * @param {(Object|string)} param0.data - The data related to the error event.
   * @returns {Promise<void>} Returns a Promise that resolves when the error event is logged.
   */
  async error({ log_message, data }) {
    return this.logEvent({ log_message, log_status: 'error', data });
  }

  /**
   * Log an informational event.
   * @async
   * @param {Object} param0 - The informational event details.
   * @param {string} param0.log_message - The message describing the informational event.
   * @param {(Object|string)} param0.data - The data related to the informational event.
   * @returns {Promise<void>} Returns a Promise that resolves when the informational event is logged.
   */
  async info({ log_message, data }) {
    return this.logEvent({ log_message, log_status: 'info', data });
  }
}

export default Logger;
