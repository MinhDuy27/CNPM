const Sentry = require('@sentry/node')
const {ProfilingIntegration} = require('@sentry/profiling-node');
const { validationError,internalError,authorizeError,notfoundError } = require('./app-error');
Sentry.init({
    dsn: 'https://86c2acaa448fe5f8afc46132a02f1852@o4506046310252544.ingest.sentry.io/4506228875132928',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
 
      new ProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });
  module.exports = (app)=>{
    app.use((error,req,res,next)=>{
      let reportError = true;
      [validationError,internalError,authorizeError,notfoundError].forEach((typeErorr)=>{
        if(error instanceof typeErorr)
          reportError = false
      })
      if(reportError == true) Sentry.captureException(error);
      res.status(error.status || 500);
      res.json({
        error:{
              message: error.message
            }
        })
    });  
  }
