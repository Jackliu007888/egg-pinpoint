const PinpointTraceMetaData = require('../agent/utils/constants.js').PinpointTraceMetaData
const traceContextFactory = require('../agent/commons/trace/trace_context.js').traceContextFactory
const interceptor = require('../agent/commons/trace/method_interceptor.js')

const serviceType = 5432

module.exports = (option, app) => {
  return async function(ctx, next) {
    const {
      request,
      response,
      request: {
        method
      }} = ctx
    let traceContext = request[PinpointTraceMetaData.TRACE_CONTEXT]
    if (traceContext === undefined) {
      traceContext = traceContextFactory()
    } else {
      traceContext.resetNamespaceTransaction(traceContext)
    }
    // if (!traceContext) {
      
    // }

    const recordApi = `eggjs.Route.${method.toLowerCase()}`
    if (traceContext.hasInit()) {
      var spanEventRecorder = traceContext.continueTraceObject()
      spanEventRecorder.recordServiceType(serviceType)
      spanEventRecorder.recordApi(recordApi)
      spanEventRecorder.recordRpcName(request.originalUrl)
    } else {
      var spanRecorder = traceContext.newTraceObject()
      spanRecorder.recordServiceType(serviceType)
      spanRecorder.recordApi(recordApi)
      spanRecorder.recordRpcName(request.originalUrl)
    }
    
    await next()
    try {
      if (response.status !== 200) {
        throw new Error(response.status + ' ' + response.message)
      }
    } catch (error) {
      traceContext.recordException(error)
    }
    traceContext.endTraceObject()
  }
}
