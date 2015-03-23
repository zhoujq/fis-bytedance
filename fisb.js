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
        lint: {
            js: 'jshint'
        },
        parser : {
            //utc：underscore自带模板语言
            tmpl: 'utc',
            //css方言
            less: 'less'
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
        lint: {
            jshint: {
                undef: true,
                unused: 'vars',
                curly: true,
                eqeqeq: true,
                forin: false,
                latedef: 'nofunc',
                newcap: false,
                noarg: true,
                nonew: true,
                trailing: true,
                maxparams: 4,
                maxdepth: 4,
                maxlen: 100,
                maxstatements: 25,
                boss: true,
                expr: true,
                laxcomma: true,
                laxbreak: true,
                sub: true,
                lastsemic: true,
                eqnull: true,
                multistr: false,
                browser: true,
                jquery: true,
                node: true,
                maxerr: 10,
                ignored: [
                    'static/**.js',
                    /\.tmpl$/i
                ],
                globals: {
                    '_': false,
                    'require': false,
                    '__inline': false,
                    '__uri': false,
                    'listener': false,
                    'module': false,
                    'Pagelet': false,
                    'define': false
                }
            }
        }
    },
    roadmap : {
        ext : {
            //输出为css文件
            less : 'css'
        },
        path : [{
                //前端模板
                reg : '**.tmpl',
                //当做类js文件处理，可以识别__inline, __uri等资源定位标识
                isJsLike : true,
                release : false
            }, {
                reg : /(\/_.*|\.inline\.less|readme.txt|build\..*)$/,
                release : false
            }, {
                reg : /^\/(pagelet|common|static)\/.*\.(less|css)$/,
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
                reg : /^\/(pagelet|common|static)\/.*\.(less|css)$/,
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