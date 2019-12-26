/*
 * Copyright 2017 dmb.star-net.cn
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var interceptor = require('../../../commons/trace/method_interceptor.js')
var PinpointTraceMetaData = require('../../../utils/constants.js').PinpointTraceMetaData
var ServiceTypeConstants = require('./egg_constants.js').ServiceTypeConstants
var traceContextFactory = require('../../../commons/trace/trace_context.js').traceContextFactory

var wrap = function (eggjs) {
  return eggjs
}


module.exports = wrap
