// 请勿全局混入该模块
// 将子组件实例保存在父组件childComponents属性中

export default {
  data() {
    return {
      childComponents: {}
    }
  },
  mounted() {
    this.initChildComponents();
  },
  methods: {
    initChildComponents() {
      let childComponents = this.$children.reduce((children, com)=>{
        com.childComponents && Object.keys(com.childComponents).forEach(tagName=>{
          handleChildren(children, tagName, com.childComponents[tagName]);
        });
        return children;
      }, {});
      this.childComponents = this.$children.reduce((children, com)=>{
        let componentTag = handleTagName(com.$options._componentTag);
        handleChildren(children, componentTag, com);
        return children;
      }, childComponents);
    }
  }
}

// 处理tagName
function handleTagName(tagName) {
  return tagName.split('-').map((str, index)=>{
    if (index !== 0) {
      str = str.substring(0,1).toUpperCase() + str.substring(1);
    }
    return str;
  }).join('')
}

// 处理children的key,使相同key的实例不会相互覆盖
function handleChildren(children, tagName, com) {
  let _tagName = tagName;
  let num = 1;
  while (children[_tagName]) {
    _tagName = tagName + num;
    num++;
  }
  children[_tagName] = com;
}
