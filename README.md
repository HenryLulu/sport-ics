# 赛程日历生成工具

把球队赛程导入到日历事件中（基于ics文件，各平台日历通用标准）

## 开始

### 获取代码

clone或者点击下方链接下载

https://github.com/HenryLulu/sport-ics/archive/master.zip

### 环境

node (macos自带)，windows 百度一下

### 安装依赖

```
npm install
```

### 配置主队

修改 package.json - scripts - start，不配置的话会导出全部


```
"start": "node index.js 巴塞罗那 巴黎圣日耳曼"
```

### 执行生成 ics 文件

```
npm run start
```
生成的文件在 output 下

### 导入日历

如果你是 Mac + iOS， 恭喜你，直接点开 class.ics 就可以导入 Mac， 然后等待 iCloud 同步就可以。

如果想单独导入 iOS，可以用邮件将 ics 发送到你的 iOS 可以收到的邮箱里，在邮箱内打开就可以。
