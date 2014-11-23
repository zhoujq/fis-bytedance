今日头条前端构建工具(fisb)
==========================
fis-bytedance是一套基于 [Fis](http://fis.baidu.com) 进行封装的适用于头条前端开发方式的本地自动化辅助工具

一、安装方式
--------------------------
1、基于`nodeJS`，需先安装 [Node](http://nodejs.org) 环境

2、安装本地自动化辅助工具`fisb`
```bash
$ npm install -g fis-bytedance
```

3、查看当前`fisb`版本
```bash
$ fisb -v
```

4、安装完成


二、使用方式——本地调试
--------------------------
1、先下载基于`fisb`构建的头条前端通用代码示例
```bash
$ git clone https://github.com/zhoujq/bytedance-fedemo.git
```

2、进入`bytedance-fedemo` 目录，发布项目
```bash
$ fisb release
```

3、启动本地调试服务器用于预览发布项目
```bash
$ fisb server start
```

4、访问 http://127.0.0.1:8080/template/bytefe/page/ 查看结果


三、使用方式——远程调试
--------------------------
1、远程调试基于`Fis`远程开发调试工具[fisrcv](https://github.com/zhoujq/fis-receiver)

2、远端机器安装`fisrcv`，用于接收本地代码实时上传
```bash
$ npm install -g fis-receiver
```

2、如远程机器无root权限，可讲`fisrcv`安装到用户目录下，手动将bin目录添加到环境变量内

3、启动`fisrcv`服务
```bash
$ fisrcv 8999
```

4、修改本地项目`fis-conf.js`文件，增加`deploy`配置项
```javascript
fis.config.merge({
    deploy: {
        dev: {
            receiver: 'http://<host>:8999/receiver',
            from: '/template',
            //远端目录
            to: '/home/template/'
        }
    }
});
```

5、重新发布当前项目
```bash
$ fisb release -d dev
```

四、功能说明
--------------------------
1、支持`less`与`sass`解析

2、支持`underscore template`前端模板解析

3、支持基于`AMD`规范的模块依赖关系管理

4、支持使用`require.async`进行异步模块加载

5、支持图片自动拼接处理，无需手动`sprite`

6、支持基于`AMD`规范的模块依赖自动加载

7、其他功能与详细使用说明见 [Fis官方网站](http://fis.baidu.com)


五、目录规范
--------------------------
1、前端项目目录规范

    [website]
      | -- [common]
      |       | -- [dialog]
      |       |     | -- dialog.tmpl
      |       |     | -- dialog.less
      |       |     | -- dialog.js
      |       | -- [util]
      |       |     | -- user.js
      |       |     | -- date.js
      |       | -- [...]
      | -- [pagelet]
      |      | -- [pl_a]
      |      |      | -- pl_a.js
      |      |      | -- pl_a.less
      |      |      | -- pl_a.html
      |      | -- [...]
      | -- [page]
      |      | -- index.html
      |      | -- ...
      | -- [static]
      |      | -- [lib]
      |      |      | -- jquery.js
      |      |      | -- ...
      |      | -- [style]
      |      |      | -- reset.less
      |      |      | -- ...
      |      | -- [image]
      |      |      | -- image_a.png
      |      |      | -- ...
      | -- fis-conf.js
2、目录结构说明
>**[website]**：站点项目目录

>**[common]**：用于放置通用代码，*common*只允许被*pagelet*与*common*内其他组件进行引用；

>**[pagelet]**：用于放置页面模块代码，每个*pagelet*因包含自身所需的模板、JS与CSS，只可以被*page*所引用，且完全禁止*pagelet*内存在互相引用与嵌套关系。*pagelet*的html容器、css作用域、JS作用域都应完全一样，遵循以"pagelet-"开头，加模块功能的命名方式（例如：`pagelet-feedlist`）；

>**[page]**：用于当前站点主页面模板，*page*是由一到多个*pagelet*构成；

>**[static]**：用于存放所有的通用静态资源（类库、图片、基础CSS等）

>**fis-conf.js**：*FIS*所依赖的项目配置文件，每个站点目录应该有且只有一个*fis-conf.js*文件；

六、相关工具与文档地址
--------------------------
1、[FIS](https://github.com/fex-team/fis)
2、[fis-bytedance](https://github.com/zhoujq/fis-bytedance)
3、[fis-receiver](https://github.com/zhoujq/fis-receiver)
4、[bytedance-fedemo](https://github.com/zhoujq/bytedance-fedemo)
5、[LESS](http://www.lesscss.net/)
6、[SASS](http://www.sass-lang.com/)
7、[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
8、[underscore template](http://underscorejs.org/#template)
