//只在发布阶段生效的babel的插件数组
const prodPlugins = []
if(process.env.NODE_ENV==='production'){
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    //发布产品时的插件
    ...prodPlugins,
    "@babel/plugin-syntax-dynamic-import"
  ]
}
