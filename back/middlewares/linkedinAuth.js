
const axios = require('axios');

function linkedinAuthenticate(req, res, next) {
  const {
    LINKEDIN_CALLBACK
  } = process.env;

  const qargs = `response_type=code&client_id=78n7g5c7zn0ols&redirect_uri=${LINKEDIN_CALLBACK}&state=aksjdlajsd&scope=r_liteprofile%20r_emailaddress`;
  res.redirect(`https://www.linkedin.com/oauth/v2/authorization?${qargs}`)
}

function linkedinTokenAquisition(req, res, next) {
  const {
    LINKEDIN_KEY,
    LINKEDIN_SECRET,
    LINKEDIN_CALLBACK
  } = process.env;
  if (req.query.code) {
    const { code } = req.query;
    //  https://docs.microsoft.com/es-es/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS
    const args=`grant_type=authorization_code&code=${code}&client_id=${LINKEDIN_KEY}&client_secret=${LINKEDIN_SECRET}&redirect_uri=${LINKEDIN_CALLBACK}`
    axios.post(`https://www.linkedin.com/oauth/v2/accessToken?${args}`).then(result => {
      axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${result.data.access_token}`
        }
      }).then(response => {
        req.user = response.data;
        next();
      })

    }).catch(error => console.log(error))
  } else {
    res.status(401).json({
      message: 'Authentication failed'
    })
  }
}

module.exports = {
  linkedinAuthenticate,
  linkedinTokenAquisition
}
