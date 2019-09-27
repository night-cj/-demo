const nodeShell = require('./util/nodeShell');
const config = require('./util/config');
const ora = require('ora');
const inquirer = require('inquirer');

inquirer.prompt([{
  //提问类型
  type: 'input',
  //key
  name: 'branch',
  //问题（提示信息）
  message: '请输入要更新源项目分支',
  //默认值
  default: 'all',
  //输入校验
  // validate: (val) => {
  //   return Boolean(val);
  // }
}]).then(answers=>{
  const { branch } = answers;
  update(branch === 'all' ? '' : branch);
});

function update(branch) {
  let spinner = ora('正在更新\n');
  spinner.start();
  shellExec('git remote -v', {}, (stdout)=>{
    if (/upstream/.test(stdout)) {
      shellExec('git remote remove upstream');
    }
  });
  shellExec(`git remote add upstream ${config.sourceProjectUrl}`);
  shellExec(`git fetch upstream ${branch}`);
  spinner.stop();
  console.log('更新完成');
  process.exit(0);
}

function shellExec(str, option, fn) {
  nodeShell(str, Object.assign({}, config.shellOption, option), fn, ()=>{
    process.exit(0);
  });
}
