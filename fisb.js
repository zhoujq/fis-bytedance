var fis = module.exports = require('fis');

fis.cli.name = 'fisb';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    projectname: '',
    statics: '/resource',
    templates: '/template',
    modules : {
        // 自动css sprites插件
        spriter: 'csssprites',
        parser : {
            //utc：underscore自带模板语言
            tmpl: 'utc',
            //css方言
            less: 'less',
            scss: 'sass',
            sass: 'sass'
        },
        postprocessor : {
            js : 'jswrapper, require-async'
        },
        postpackager : ['simple', 'autoload']
    },
    settings : {
        postprocessor : {
            jswrapper : {
                type : 'amd'
            }
        },
        postpackager : {
            //用于配合amd规范进行require文件的自动合并
            autoload: {
                //使用静态资源地图，便于支持require.async进行异步组件加载
                useSiteMap: true,
                //资源资源地图放置位置
                subpath : 'static/pkg/asyncmap.js',
                //自动加载script依赖的占位标识符
                scriptTag: '<!-- SCIRPT_AUTOLOAD -->',
                //自动加载css依赖的占位标识符
                styleTag: '<!-- STYLE_AUTOLOAD -->',
                //资源表占位标识符
                resourceMapTag: '<!-- MAP_AUTOLOAD -->'
            },
            //用于进行零散文件依据pack配置进行打包替换
            simple: {
                //不开启自动的零散资源合并
                //所有资源严格进行手动整合
                autoCombine: false
            }
        },
        spriter: {
            csssprites: {
                margin: 30
            }
        },
    },
    roadmap : {
        ext : {
            //输出为css文件
            less : 'css',
            scss: 'css',
            sass: 'css'
        },
        path : [{
                //前端模板
                reg : '**.tmpl',
                //当做类js文件处理，可以识别__inline, __uri等资源定位标识
                isJsLike : true,
                release : false
            }, {
                reg : /(\/_.*|\.inline\.less|\.inline\.scss|\.inline\.sass|readme.txt|build\..*)$/,
                release : false
            }, {
                reg : /^\/(pagelet|common|static)\/.*\.(less|css|sass|scss)$/,
                useSprite : true,
                release: '${statics}/${projectname}/$&'
            }, {
                reg : /^\/(pagelet|common)\/.*\.js$/,
                isMod : true,
                release: '${statics}/${projectname}/$&'
            }, {
                reg : /^\/(pagelet|page)\/(.*)\.html$/,
                release : '${templates}/${projectname}/$&'
            }, {
                reg : /^\/(pagelet|common|static)\/.*\.(less|css|sass|scss)$/,
                useSprite : true,
                release: '${statics}/${projectname}/$&'
            }, {
                reg : '/static/**.html',
                release: '${statics}/${projectname}/$&'
            }, {
                reg : /^\/(pagelet|common|static)\/.*\/.*$/,
                release: '${statics}/${projectname}/$&'
            }
        ]
    }
});