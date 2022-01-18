
// JSDoc

/**
 * Query if a user exists or not.
 * @param {string} email value for the email
 * @param {string} password value for the password
 * @returns {Promise<Object|null>} user or null
 */
async function queryUser(email, password) {
  if (email === 'admin@aol.com' && password === 'HolaMundo123') {
    return {
      name: 'admin',
      roles: ['admin']
    }
  } else {
    null
  }
}

module.exports = {
  queryUser
}
