module.exports = {
  test: process.argv.includes('-t'), //开发脚本时使用
  origin: 'origin',
  npmPublishUrl: 'http://192.168.0.236:8081/repository/djcpsnpm-host/',
  isNeedNpmPublish: process.argv.includes('-p'),
  sourceProjectUrl: 'http://192.168.0.169/djWebCenter/djweb.git',
  isDirectRelease: process.argv.includes('-d'),
  shellOption: {
    codeMsg: true
  },
  changeLogName: 'CHANGELOG.zh-CN.md',
  usedCommitReg: /^(?!add|opt|mod|oth|del|fix)[a-zA-Z0-9]+(:|：)/
};
