const nodeShell = require('./util/nodeShell');
const config = require('./util/config');
const fs = require('fs');
const dayjs = require('dayjs');
const {checkCommit} = require('./util/common');
const currentVersion = require('../package.json').version;
const inquirer = require('inquirer');

let isClear = checkCommit();
inquirer
  .prompt([
    {
      //提问类型
      type: 'input',
      //key
      name: 'version',
      //问题（提示信息）
      message: '请输入要更新的版本号',
      //默认值
      default: currentVersion,
      //输入校验
      validate: val => {
        if (/^(\d+.\d+.\d+)(-beta.\d+)?$/.test(val)) {
          return true;
        }
        return false;
      }
    }
  ])
  .then(answers => {
    update(answers.version);
  });

function update(version) {
  saveCache();
  shellExec('git log --grep=\\[release\\] --pretty=oneline', {}, stdout => {
    new RegExp(`([a-zA-Z0-9]{40}) \\[release\\] ${version}\\n?([a-zA-Z0-9]{40})?`, 'g').exec(stdout);
    let endCommit = RegExp.$1;
    let startCommit = RegExp.$2;
    if (!endCommit) {
      console.log('没有找到此版本');
      precess.exit(1);
    }
    if (!startCommit) {
      shellExec(`git rev-list --max-parents=0 HEAD`, {}, stdout => {
        startCommit = stdout;
      });
    }
    shellExec(`git log --pretty=oneline ${startCommit.substr(0, 6)}...${endCommit.substr(0, 6)}`, {}, stdout => {
      let filterList = stdout
        .split('\n')
        .filter(str => config.usedCommitReg.test(str.substr(41)))
        .map(str => str.replace(/[a-zA-Z0-9]{40}/, '-'));
      let mdData = `### ${version}\n\n*${dayjs(new Date()).format('YYYY.MM.DD')}*\n\n` + filterList.join('\n');
      insertChangeLog(version, mdData);
    });
    // console.log(index);
    // let reg = new RegExp(`\\[release\\] ${version}`);
    // let log_cache = stdout.substr(reg.exec(stdout).index + 10 + version.length);
    // log_cache = log_cache.substr(0, /\[release\]/.exec(log_cache).index);
    // let allMessageList = log_cache.split('\n').filter(str=>/^    /.test(str)).map(str=>str.replace(/ */, ''));
    // let filterList = allMessageList.filter(str=>/^[a-zA-Z0-9 .]+(:|：)/.test(str));
    // let mdData = `### ${version}\n\n*${dayjs(new Date()).format('YYYY.MM.DD')}*\n\n` + filterList.map(str=>'- '+ str).join('\n');
    //
    // let changeLog = fs.readFileSync(config.changeLogName, 'utf-8');
    // let mdVersion = new RegExp(`### ${version}`).exec(changeLog);
    // if (mdVersion) {
    //   let versionlist = changeLog.match(/### (\d+.\d+.\d+)(-beta.\d+)?/g);
    //   let listIndex = versionlist.findIndex(str=>new RegExp(`### ${version}`).test(str));
    //   let startIndex = mdVersion.index;
    //   let endIndex = new RegExp(versionlist[listIndex + 1]).exec(changeLog).index;
    //   changeLog = changeLog.slice(0, startIndex) + mdData + '\n\n' + changeLog.slice(endIndex);
    //   console.log(startIndex);
    //   console.log(versionlist);
    // } else {
    //   let match = /## 更新日志/.exec(changeLog);
    //   let start = match ? match.index + match[0].length : 0;
    //   changeLog = changeLog.slice(0, start) + '\n\n'+ mdData + changeLog.slice(start);
    // }
  });
  shellExec('git add -A');
  shellExec('git commit -m "mod: 更新日志"');
  shellExec(`git push ${config.origin} HEAD`);
  getCache();
}

function insertChangeLog(version, mdData) {
  let changeLog = fs.readFileSync(config.changeLogName, 'utf-8');
  let mdVersion = new RegExp(`### ${version}`).exec(changeLog);
  if (mdVersion) {
    let versionlist = changeLog.match(/### (\d+.\d+.\d+)(-beta.\d+)?/g);
    let listIndex = versionlist.findIndex(str => new RegExp(`### ${version}`).test(str));
    let startIndex = mdVersion.index;
    let endIndex = new RegExp(versionlist[listIndex + 1]).exec(changeLog).index;
    changeLog = changeLog.slice(0, startIndex) + mdData + '\n\n' + changeLog.slice(endIndex);
    // console.log(startIndex);
    // console.log(versionlist);
  } else {
    let match = /## 更新日志/.exec(changeLog);
    let start = match ? match.index + match[0].length : 0;
    changeLog = changeLog.slice(0, start) + '\n\n' + mdData + changeLog.slice(start);
  }
  fs.writeFileSync(config.changeLogName, changeLog);
}

function saveCache() {
  if (!isClear) {
    shellExec(`git stash`);
  }
}

function getCache() {
  if (!isClear) {
    shellExec(`git stash pop`);
  }
}

function shellExec(str, option, fn) {
  nodeShell(str, Object.assign({}, config.shellOption, option), fn, () => {
    reset();
    process.exit(0);
  });
}

function reset() {
  shellExec(`git reset --hard`);
  getCache();
}
