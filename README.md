今日头条前端构建工具(fisb)
==========================
fis-bytedance是一套基于 [Fis](http://fis.baidu.com) 进行封装的适用于头条前端开发方式的自动化开发辅助工具

一、安装方式
--------------------------
1、基于nodeJS环境，需先安装 [Node](http://nodejs.org) 环境

2、执行 `npm install -g fis-bytedance` 安装fisb

3、使用 `fisb -v` 命令，查看当前fis版本

4、安装完成


二、使用方式
--------------------------
1、先下载基于fisb构建的头条前端通用代码示例

    git clone https://github.com/zhoujq/bytedance-fedemo.git

2、进入`bytedance-fedemo` 目录，使用 `fisb release` 发布项目

3、执行 `fisb server start` ，启动一个本地调试服务器用于预览 `fisb release` 产出的项目

4、访问 http://127.0.0.1:8080/template/bytefe/page/ 查看结果


三、功能说明
--------------------------
1、支持less与sass解析
2、支持underscore template前端模板解析
3、支持基于AMD规范的模块依赖关系管理
4、支持使用require.async进行异步模块加载
5、支持图片自动拼接处理，无需手动sprite
6、支持基于AMD规范的模块依赖自动加载
7、其他功能与详细使用说明见 [Fis官方网站](http://fis.baidu.com)


四、规范与说明
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

