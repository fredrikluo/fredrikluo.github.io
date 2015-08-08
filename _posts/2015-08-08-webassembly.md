---
title: WebAssembly 是个啥
author: fredrik.luo
layout: post
permalink: /2015-08-08-webasm
categories:
  - 知乎问答
excerpt_separator: <!--more--> 
---
这个注定是一个长回答，像我这种不喜欢写字的人，看到这种问题，一般都会在回答和不回答之间纠结一个星期。 

下面要讲的，其实是一个悲伤的故事:

###Javascript，也叫Ecma script, 是这家伙用了 10 天时间赶出来的... ###

<img src="/wp-content/uploads/2015/08/ja.jpg" />

>*所以，各位程序猿们，如果你觉得老板 10 天要你们上线一个 App 是一个丧心病狂的事情，那么可以多想想这位哥。
Youtube 上有位哥的采访，你可以听听大神当年的故事。
<a href="https://www.youtube.com/watch?v=IPxQ9kEaF8c"> The interview </a>*

<!--more-->


当然，码农和大神的区别在于：遇到这种事情，10 天以后码农死掉了，而大神上线了。
只是但凡这种极速上线的事情，都会留下一堆的坑，大神和码农的的区别，也就是水洼和天坑的区别。 

这个是坑列表： 

* Javascript 从最开始设计，就是一种解释型语言，因为大神觉得让 Javascript 的目标用户－ “非专业编程人员和设计师”，了解什么是编译器是一件很残忍的事情。
* 类型自然也是没有的，因为学习类型就要学习 CPU 工作原理， 学习 CPU 工作原理就要学习组成原理， 大神觉得，让 “非专业编程人和设计师” 去了解 1 和 1.0 一个是 CPU 上处理， 一个是 FPU 上面处理这种显而易见的现象是一件很残忍的事情。
* 对象模型是惊人的奇葩，那是因为不想设计得和 Java 一样强大, Netscape 当初想法是主要工作都是 Java 来完成，只有轻量级的简单操作留给 Java script, 做为一种胶水语言( glue langurage). 现在知道为什么叫 Java script了吧？ 一个是Java, 一个是和Java 配合的 Script (脚本）。 之前还叫过Live script, 因为脚本和 Java 互动的技术叫 Live connect.
* 对于泛型， 缺省参数，操作符重载， 异常 等等这些黑科技， 大神的回答通通是：

<img src="/wp-content/uploads/2015/08/mm.jpg" />

好吧，异常后来加上去了。 

如果故事到此为止，其实不算一个悲伤故事，大神 10 天时间完成预定目的，东西也发布了，市场反应也不错。 

但是问题是，市场反应实在是太好了，好得 Javascript 一路窜红，红得各大浏览器厂商纷纷支持， 成为浏览器里面事实上的官方语言。 在这个过程中， 还顺手干掉了 VB script, 

于是这个当初为 “非专业编程人员和设计师” 的解释型语言现在居然变成互联网上面最重要的语言之一，被用来做各种之前想也不敢想的东西，甚至还有人不顾死活的拿他来做WebOS. 

###于是这个时候，之前所有的小水洼都变成了天坑。之后很长段时间 JS 领域的发展史，都可以说是填坑史.###

其中最大的一个坑，就是性能。 

###性能填坑阶段一###

Javascript 一开始就是解释性语言，解释性语言的一大特点就是慢， 而网页应用越来越复杂，如果点个按钮要等几秒钟，那淘宝的秒杀就要变成10秒杀了。这个当然不能忍。 

于是聪明的人类想到一个办法，虽然你是解释型语言，但是我可以偷偷的编译你啊。 这个也不需要让这帮 “非专业编程人员和设计师” 们知道， 我只要在程序运行前的一刹那，编译即将运行的代码就好。你看我机不机智。 

于是 Google 在 2009 年在 V8 中引入了 JIT 技术 (Just in time compiling 江湖人称即时编译)。 有了这个buff, Javascript 瞬间提升了 20 － 40 倍的速度。直接导致一大波大型网页应用的出现。从此 Javascript 一骑绝尘， 飞黄腾。。呃， 好像哪里不对嘛？

人类的性能的期望是无穷无尽的，JIT 的带来的性能提升很快就榨干了。实际上 JIT 有以下问题： 

* JIT 基于运行期分析编译，而 Javascript 是一个没有类型的语言，于是， 大部分时间，JIT 编译器其实是在猜测 Javascript 中的类型，举个例子：

<img src="/wp-content/uploads/2015/08/js1.png" />

JIT 看到这里， 觉得好开心， 马上把 add 编译成 

<img src="/wp-content/uploads/2015/08/js2.png" />

可是你随后又干了这样一个事情 

<img src="/wp-content/uploads/2015/08/js3.png" />

JIT 编译器的表情肯定是 

<img src="/wp-content/uploads/2015/08/mb.png" />

怎么办， 已经编译成机器码了啊。
这种情况下，JIT 编译器只能推倒重来。JIT 带来的性能提升，有时候还没有这个重编的开销大。

* 有很多的情况下面， JIT 编译器都无法生成代码，比如异常， 比如 for in , 这个基本上是实现难度引起的，具体可以参考: <a href="https://github.com/petkaantonov/bluebird/wiki/Optimization-killers">Optimization killers · petkaantonov/bluebird Wiki · GitHub</a>

* 事实上，大部分时间 JIT 都不会生成优化代码，有字节码的，直接字节码，没有字节码的，粗粗编译下就结了，因为 JIT 自己也需要时间，除非是一个函数被使用过很多遍，否则不会被编译成机器码，因为编译花的时间可能比直接跑字节码还多。

于是，整体上 Javascript JIT 提高的性能到达的天花板还是不高的，虽然是提高了 20 - 50倍，那只是因为之前解释执行实在是太慢了。。 

###性能填坑阶段二###

既然 JIT 遇到的问题是类型不确定问题和有一些语言功能，比如异常，for in ， JIT 起来很麻烦， 我可不可以搞个方法让用户不去用这些功能，同时让他们把用的类型都标注出来啊。 

按照这个思路， 催生了两种实现路径：

* 一种是 Typescript, Dart, JSX 为代表的，基本思想是， 我搞个其他的语言，这个语言是强类型的，所以程序猿们需要指定类型，然后我把它编译成 Javacript 不就行了嘛。强类型的语言编译成弱类型还不容易，什么，不知道怎么编？ 把类型去掉就行了嘛。

* 另一种是火狐的 Asm.js 为代表的， 做一个 javascript 子集， 同时试图利用标注的方法，加上变量类型， 如果觉得好难理解，这就是个典型的例子：
加上一堆没有什么卵用提示 x 其实是个 int， 然后有一个能够识别这些符号的JS引擎，你就可以不用猜类型了哦， 事实上，由于有了类型，连传统的 AOT 都成为了可能 (Ahead of time, 不懂的话，想象一下，就是和 C/C++ 那种编译方式就好了）。

如果你没有注意到，第二种的速度提升潜力比第一种要大非常多。因为第一种，无论如何，也是就是让JIT (即时编译) 快一点, 第二种那可直接就编译了啊 (AOT). 

这个是 Asm.js 相对于 JIT 和原生的性能对比

<img src="/wp-content/uploads/2015/08/perfa.png" />

同时大家有没后注意到，这个不是原生代码哦， 性能堪比原生代码， 安全性和传统 Javascript 完全一样。 (尼玛，你让插件们怎么活）。

Web Assembly 就是第二种方式，说到底，Mozilla, Google, Microsoft, and Apple 觉得 Asm.js 这个方法有前途，想标准化一下，大家都能用。

有了大佬们的支持，Web Assembly 比 asm.js 要激进很多。 Web Assembly 连标注 Js 这种事情都懒得做了，不是要 AOT 吗？ 我直接给字节码好不好？（后来改成 AST 树）。对于不支持 Web Assembly 的浏览器， 会有一段 Javascript 把 Web Assembly 重新翻译为 Javascript 运行， 这个技术叫 polyfill, HTML5 刚出来的时候很常用的一个技术。

使用 AST 的原因是因为 AST 比字节码更容易压缩，也更容易翻译。 

不了解 AST 可以看下面这张图， 说明 Javascript 引擎的执行过程。 Javascript 先编译为 AST， 然后到 Bytecode. AST 的抽象程度比 Bytecode 要高一级。 

<img src="/wp-content/uploads/2015/08/ast.png" />

总结来说， Web Assembly 的工作方式如下： 

<img src="/wp-content/uploads/2015/08/weba.png" />

好处是：

* 大幅度提高 Javascript 的性能，希望能把性能这个坑填完，同时也不损失安全性。Webapp 和 原生 App 的性能差距变得很小。
* 基本之前需要插件来提高速度这种技术已经没有必要了， 网页应用的移植性会变得更好。
* 感谢@easing 提醒， WebAssembly 其实允许任何语言编译到它制定的AST tree， 这样子，各位就可以开开脑洞了， 因为，你可以用C/C++写网页了。。

PS: 这个技术我大 Opera 居然没有参与，今天去申请了进入这个 W3C 讨论组，有消息再放给大家。 

更新：
哥已成功潜入 Webassembly 成员组，代表我大 Opera. 哇哈哈哈哈哈哈
On August 6, 2015, 8:09 UTC, fredrik luo became a participant in the
WebAssembly Community Group. This person was nominated by Lars Erik
Bolstad.
