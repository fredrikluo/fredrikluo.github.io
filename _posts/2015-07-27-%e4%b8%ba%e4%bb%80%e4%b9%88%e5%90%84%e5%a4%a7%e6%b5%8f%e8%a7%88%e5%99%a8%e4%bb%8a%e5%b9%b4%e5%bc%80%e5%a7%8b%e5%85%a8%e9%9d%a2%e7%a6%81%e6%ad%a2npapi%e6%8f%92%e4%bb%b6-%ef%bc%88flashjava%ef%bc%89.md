---
title: 为什么各大浏览器今年开始全面禁止/淘汰NPAPI插件
author: fredrik.luo
layout: post
permalink: /2015-8-27
categories:
  - 知乎问答
excerpt_separator: <!--more--> 
---
Google 最近正式给出了时间表： 2015年一月份开始，除了非常流行的NPAPI插件，其他一律屏蔽。 2015年四月份开始，所有的NPAPI插件默人都是关闭的，用户需要在高级设定中手动打开。2015年九月份，所有基于NPAPI的插件无法使用.

其实 Google 早在2013的时候，就已经发了一个公告，说是Chrome浏览器会逐步的去掉对NPAPI插件的支持. 不过这个事情很快就过去了。NPAPI这种江湖黑话实在是太不亲民，这个东西到底有个啥卵用，广大人民群众也并不清楚.

<http://blog.chromium.org/2013/09/saying-goodbye-to-our-old-friend-npapi.html>

<span style="font-size: 12pt;"><em>呃，这个东西其实还是蛮重要，因为大家喜闻乐见的Flash, 就是NPAPI插件。</em></span>  
<img src="/wp-content/uploads/2015/07/2015728113343-e1438054503779.png" alt="2015728113343" class="alignnone size-full wp-image-223" width="400px" />

<!--more-->
而其他浏览器厂商，比如Opera，火狐，也纷纷表态会逐渐淘汰NPAPI.

<img class="alignnone  wp-image-177" src="/wp-content/uploads/2015/07/Screen-Shot-2015-07-28-at-12.25.36-AM.png" alt="Screen Shot 2015-07-28 at 12.25.36 AM" width="827" height="134" />

<span style="font-size: 12pt;"><em>Opera: 我早就说了啊</em></span>

<a href="/wp-content/uploads/2015/07/Screen-Shot-2015-07-28-at-12.27.29-AM.png"><img class="alignnone  wp-image-178" src="/wp-content/uploads/2015/07/Screen-Shot-2015-07-28-at-12.27.29-AM.png" alt="Screen Shot 2015-07-28 at 12.27.29 AM" width="824" height="90" /></a>

<span style="font-size: 12pt;"><em>火狐 :我还是会支持的，只是大家要一起来淘汰这个技术.</em></span>

呃，不过其实我连啥是NPAPI都还没告诉你&#8230;

NPAPI全称叫 Netscape plugin API， 听到这个名字是不是有时光倒流的感觉， 你没有看错，就是那个当年被微软一棒子打死了好多年的 Netscape 浏览器发明的一种扩展浏览器的方式。

是不是觉得好拗口？ 没办法，我们要从浏览器插件本身开始说起。

HTML 作为在浏览器里面承载展现内容的规范， 设计起来其实非常困难。 太简单没法用，太复杂了浏览器厂商实现起来又有困难。 一开始的时候HTML只是设计用于承载图片，文字一类的主流内容。不过浏览器厂商很快就不满意了，因为除了图片文字以外，很多小众内容，浏览器用户实际上是有需求的。 比如，PDF文档，以及视频，音频。

为了解决这些问题而去要求 W3C 把相应的内容加入到 HTML 标准里面是很不现实的，标准的制定非常繁复，周期也非常长，小众内容到底有没有必要加入 HTML 规范这种哲学问题一旦讨论起来谁都不知道啥时候能结尾， 于是 Netscape 发明了插件这样一个机制， 这样如果有一些内容不被 HTML 直接支持，用户又确实有需要，那么这部分内容就可以用插件来处理。 这个好东西出来以后，其他浏览器厂商马上纷纷跟进。

<span style="font-size: 11pt;"><em>所以，插件本身对互联网的发展，是有重大贡献的， 没有插件，很多新的内容，比如视频，比如向量游戏(Flash), 可能早就胎死腹中了。</em></span>

W3C 非常识相的很快就把插件机制纳入到 HTML4 标准里面。 W3C 毕竟不是一个强力部门，虽然有些气节，但说到底它更像各大浏览器厂商背后妥协的产物。

不过按照W3C的哲学，插件毕竟只是对 HTML 的一个补充。而一旦某些插件提供的小众内容由于市场/技术原因变为主流，那么 W3C 就会马上将其纳入到 HTML 规范中去，让浏览器原生就支持。

<video> 标签就是一个典型的例子。 2007 年的时候，鉴于 youtube 已经火得一塌糊涂，网路视频依然已经变成主流内容，W3C 马上就开始讨论是否引入 video 标签，以便把视频支持提高到浏览器原生这个水平。

<span style="font-size: 11pt;"><em>这个提案是Opera提出来的哦， 这里小自豪一下，我还记得 Håkon Wium Lie 在Opera 员工大会上面兴致勃勃地讨论这个标签的场景。</em></span>

*这个提案现在还在这里，大家有兴趣可以看看:*  
*http://people.opera.com/howcome/2007/video/*

看到这里，大家应该看懂插件在浏览器这个领域的作用了吧。

**浏览器承载的内容 ＝ HTML (主流内容)＋ 插件(小众内容）**

而W3C会时刻监视这个等式，动态调整HTML支持的内容以维持这个等式的动态平衡。

现在你知道为什么HTML5会加入video, audio 标签了吧。其实严格意义上讲也包括 svg, canvas一类的标签。

而NPAPI 就是浏览器插件架构的一种，事实上， NPAPI 插件架构是个非常好的架构， 一共就40几个API,  相对于另外一种浏览器插件架构: ActiveX来说，简直就是业界良心。

**这里只有一个问题，它的发明时间是 1995 年，而在那个时候手机还可以砸死人，学校的电脑房要穿鞋套才能进。**

那个时代所有类似的API设计者几乎都很自然的忽略掉了安全性问题。那个时候无论是网络环境还是商业环境相比现在都简单很多。

我们来看看NPAPI插件和浏览器的关系是什么, 同时对比下和同样执行网络下载代码的 Javascript 引擎的位置，

<img src="/wp-content/uploads/2015/07/Screen-Shot-2015-07-28-at-1.25.21-AM.png" alt="Screen Shot 2015-07-28 at 1.25.21 AM" width="579" height="324" class="alignnone size-full wp-image-202" />

看懂了吧， 你以为是NPAPI是插件是吗？其实它和浏览器是平级运行的，它甚至可以打开网页，给你安一个木马，然后随手帮你关掉杀毒软件。什么，你说NPAPI不就40几个API嘛， 少年，你想多了，NPAPI不限制插件自由访问系统所有的API.

而 Javascript 引擎的限制就多得多，事实上，Chromium系列的浏览器 Javascript 引擎均是运行在沙盒之中，一举一动都是被严密监视着的，敢有异常? 浏览器分分钟杀死你。

除了安全性以外，插件们还质量参差不齐，一旦崩溃浏览器就得跟着一起崩掉。 于是各个浏览器又一把鼻涕一遍泪的把插件们放到另外一个进程中运行，惹不起你们我们还躲不起嘛。其他的耗电量，图形效率，脚本效率一类的我就不多讲了，讲多了都是泪。

不过如果只是安全，那你把插件放到沙箱里面隔离起来不就行了嘛。

是的，谷歌当年也是这样想的，于是他们发明了 PPAPI， 然后在业界里面振臂一呼，大家来看，我的这个新API好啊，插件用起来更安全，有沙箱哦。

这个是业界伙伴们的态度:

<div>
  <a href="/wp-content/uploads/2015/07/Screen-Shot-2015-07-26-at-10.57.48-PM.png"><img class="alignnone size-full wp-image-180" src="/wp-content/uploads/2015/07/Screen-Shot-2015-07-26-at-10.57.48-PM.png" alt="Screen Shot 2015-07-26 at 10.57.48 PM" width="576" height="213" /></a>
</div>

<div>
  <em>Java: 我最近听说Chrome不支持我们了，大家请换浏览器，就这样</em>。
</div>

<div>
  <a href="/wp-content/uploads/2015/07/Screen-Shot-2015-07-28-at-12.40.36-AM.png"><img class="alignnone size-full wp-image-181" src="/wp-content/uploads/2015/07/Screen-Shot-2015-07-28-at-12.40.36-AM.png" alt="Screen Shot 2015-07-28 at 12.40.36 AM" width="682" height="121" /></a>
</div>

<div>
</div>

*火狐: 我们对 PPAPI(pepper) 一点兴趣都木有。*  
*(而且坑爹的是， Google 的PPAPI链接居然指的是Mozilla 的这个页面。不知道是不是存心恶心Mozilla).*

如果你是个程序猿又有一颗好奇的心，表示无法理解PPAPI为何如此不受待见，你可以去这里看看PPAPI的文档 ，在这里

<https://code.google.com/p/ppapi/>

你一定会发现问题，其实不管你是不是程序猿你都会发现问题。因为，这个PPAPI官方文档链接里面，几乎木有文档。。

不过Adobe认怂了。 事实上Adobe很早就开始发布PPAI的版本。

<div>
  <img class="alignnone size-full wp-image-182" src="/wp-content/uploads/2015/07/Screen-Shot-2015-07-26-at-10.57.04-PM.png" alt="Screen Shot 2015-07-26 at 10.57.04 PM" width="399" height="409" />
</div>

所以如果你这几天再看到插件无法运行的对话框，如果上面写的是Flash, 你只需要去下载一个最新的ppai的flash 插件，或者下载一个新版的Chrome.  因为目前Chrome已经开始内置PPAPI版的Flash。

其他的，就看厂商们如何跟进吧.

所以，少年，不要害怕，Flash还在的.

PS: 如果你看到的是这个框：

<div>
  <a href="/wp-content/uploads/2015/07/flash-warning.jpg"><img class="alignnone size-large wp-image-175" src="/wp-content/uploads/2015/07/flash-warning-1024x60.jpg" alt="flash-warning" width="640" height="38" /></a>
</div>

其实背后的原因还会更复杂一些。 这个是因为前期炒得沸沸扬扬得Hacking team被黑的事件中  
[Hacking team hacked][3]  
一些非常严重的Flash漏洞被泄漏出来了，于是Chrome把低版本的Flash全部禁止了。

解决的方法也一样:下载一个最新的ppai的 flash 插件，或者下载一个新版的 Chrome 就好. 

<div class="pvc_clear">
</div>

<p id="pvc_stats_174" class="pvc_stats " element-id="174">
  <img src="/wp-content/plugins/page-views-count/ajax-loader.gif" border=0 />
</p>

<div class="pvc_clear">
</div>

 [3]: http://www.csoonline.com/article/2943968/data-breach/hacking-team-hacked-attackers-claim-400gb-in-dumped-data.html
