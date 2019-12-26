
global.projectModulePaths = module.parent ? module.parent.paths : []

const Agent = require('./app/agent/commons/agent.js')
const Configuration = require('./app/agent/conf/read_config.js')

class AppBootHook {
  constructor(app) {
    this.app = app
    this.app.config.coreMiddleware.unshift('pinpoint')

      
    //get agent conf 
    global.eggLogger = this.app.logger
    global.pinpointConfig = this.app.config.pinpoint || {}
    const conf =  new Configuration()
    const defaultAgent = new Agent(conf)
    global.PinpointNodejsAgent = defaultAgent


    //start agent socket client 
    defaultAgent.startTcpClient()
    defaultAgent.startUdpClient()

    //start send agentInfo
    defaultAgent.sendAgentInfo()

    //start hack load and load plugins
    defaultAgent.hackModuleLoad()

    //start to send api info
    defaultAgent.sendApiInfo()

    //start trace manager
    defaultAgent.startTraceManager()

    //load sampler
    defaultAgent.loadSampler()

    //start agent stat collector
    //
    defaultAgent.startAgentStatCollector()
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
  
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用

  }

  async didReady() {
    // 应用已经启动完毕
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

  }
}

module.exports = AppBootHook