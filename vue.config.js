
module.exports = {
    chainWebpack:config=>{
        //开发者模式
        config.when(process.env.NODE_ENV==='development',
        config=>{
            config.entry('app').clear().add('./src/main-dev.js')
            config.plugin('html').tap(args=>{
                args[0].isProd = false
                return args;
            })
        })

        config.when(process.env.NODE_ENV==='production',
        config=>{
            config.entry('app').clear().add('./src/main-prod.js')

            config.set('externals',{
                vue:'vue',
                'vue-router':'vueRouter',
                axios:'axios',
            })

            config.plugin('html').tap(args=>{
                args[0].isProd = true;
                return args
            })
        })
    },
    css: {
      extract: false
    }
  };