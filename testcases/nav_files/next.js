(function(e,y){var b={ajax:function(l,i){var z=new XMLHttpRequest();z.onreadystatechange=function(){if(z.readyState===4){if(z.status>=200&&z.status<300||z.status===304){i(z.responseText)}}};z.open(l.method||"GET",l.url);z.send(l.data||null)},store:{get:function(l){var i=e.localStorage[l];if(i){return JSON.parse(i)}},set:function(i,l){e.localStorage[i]=JSON.stringify(l)}},isDateEqual:function(l,i){return l.toDateString()===i.toDateString()}};function h(i,z,l){i.value=z[0];this.input=i;this.words=z;this.time=l||5;this.curr=0;this.start()}h.prototype.start=function(){if(!this.state){var i=this;this.interval=setInterval(function(){i.change()},this.time*1000);this.state=true}};h.prototype.stop=function(){if(this.state){this.input.value="";clearInterval(this.interval);this.state=false}};h.prototype.change=function(){var i=this.curr++;var l=this.words;this.input.value=l[i%l.length]};h.prototype.update=function(i){this.words=i};function n(i){this.el=i}n.prototype.show=function(){this.el.style.display="block"};n.prototype.hide=function(){this.el.style.display="none"};n.prototype.update=function(D){var B="";for(var A=0;A<D.length;A++){var l=D[A];var z=__jumpUrl+encodeURIComponent(l.url)+"&title="+encodeURIComponent(l.name)+"&dstname=search&type=hotword";B+=C(z,l.name)}this.el.innerHTML=B+"<a>关闭</a>";function C(i,E){return'<a href="'+i+'">'+E+"</a>"}};function d(l){this.el=l;var i=this.gallery=l.getElementsByClassName("gallery")[0];this.img=i.getElementsByTagName("img")[0];this.imgTitle=i.getElementsByTagName("p")[0];this.content=l.getElementsByClassName("contents")[0];this.src=l.getAttribute("data-src").trim();this.type=l.getAttribute("data-jump-type")}d.prototype.update=function(){var i=this;b.ajax({url:this.src},function(A){var F;try{F=JSON.parse(A)}catch(B){}if(F&&F.error_code==0){var C=F.results;var H=C[0];if(H.type===7&&H.thumbnail_pic&&H.thumbnail_pic!==undefined){i.gallery.style.display="block";i.gallery.href=__jumpUrl+encodeURIComponent(H.link)+"&title="+encodeURIComponent(H.title)+"&dstname=ezine&type="+i.type;i.img.src=H.thumbnail_pic;i.imgTitle.textContent=H.title;C.shift()}var E="";for(var D=0;D<C.length;D++){var G=C[D];var I="hot";if(G.img_count>=3){I="img"}else{if(Date.now()-G.created_at<=3*3600*1000){I="new"}}var z=__jumpUrl+encodeURIComponent(G.link)+"&title="+encodeURIComponent(G.title)+"&dstname=ezine&type="+i.type;E+=l(z,I,G.title)}i.content.innerHTML=E}});function l(z,A,B){return'<a href="'+z+'" class='+A+">"+B+"</a>"}};function c(l,i){this.el=l;this.name=i;this.init()}c.prototype.init=function(){var l=b.store.get(this.name);if(l){this.index=+l}else{this.index=0}this.select(this.index);var i=this;this.el.addEventListener("click",function(){i.add()},false)};c.prototype.add=function(){if(!this.added){b.store.set(this.name,++this.index);this.added=true}};c.prototype.select=function(l){var A=this.el.getElementsByTagName("a");for(var z=0;z<A.length;z++){if(z===l%A.length){A[z].style.display="block"}else{A[z].style.display="none"}}};var a=y.getElementsByClassName("ezine");for(var s=0;s<a.length;s++){var v=new d(a[s]);v.update()}var g=y.querySelector(".search");if(g){var x=g.querySelector('input[type="text"]');var m=g.querySelector('input[type="submit"]');var j=g.getElementsByClassName("suggestion")[0];var f=j.getAttribute("data-src").trim();var t=[];var o=j.getElementsByTagName("a");for(var s=0,q=o.length-1;s<q;s++){t.push(o[s].textContent.trim())}var r=new n(j);var k=new h(x,t);b.ajax({url:f},function(B){var z;try{z=JSON.parse(B)}catch(A){}if(z&&z.status==1){var C=z.data;r.update(C);var D=[];for(var l=0;l<C.length;l++){D.push(C[l].name.trim())}k.update(D)}});y.body.addEventListener("click",function(){r.hide();k.start()},false);x.addEventListener("click",function(i){i.stopPropagation()},false);x.addEventListener("focus",function(){k.stop();r.show()},false);x.addEventListener("input",function(){if(this.value.length>0){r.hide()}else{r.show()}},false);g.addEventListener("submit",function(C){C.preventDefault();var B=this.getElementsByClassName("word")[0];if(B.value.length>0){var z=this.action+"&"+encodeURIComponent(B.name)+"="+encodeURIComponent(B.value);var l=1;var D=k.words;for(var A=0;A<D.length;A++){if(B.value==D[A]){l=0;break}}z=__jumpUrl+encodeURIComponent(z)+"&title="+encodeURIComponent(B.value)+"&userinput="+l+"&dstname=search&type=searchBtn";y.location.href=z}},false)}var u=y.getElementsByClassName("opa-slider");if(u.length>0){var w=b.store.get("userVisitStat");if(w&&b.isDateEqual(new Date(w.date),new Date())){w.count=+w.count;if(w.count===2){w.count=0}w.count++}else{w={date:+new Date(),count:0}}w.date=+new Date();b.store.set("userVisitStat",w);for(var s=0;s<u.length;s++){var p=new c(u[s],"Opa_Slider_"+s);if(w.count>=2){p.add()}}}})(window,window.document);