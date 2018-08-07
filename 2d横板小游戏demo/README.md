# 2d横板小游戏demo



##### 用到的第三方库：

##### 1、keyboard

引入这个库才能用键盘事件，不过好像库本身的onkeyup事件仅在按键列表长度不为0（松开时还按了其他键）才会发送，把keyboard.js中的
``` javascript
if (self.inputs.length > 0) {
    self.dispatchEventWith(KeyBoard.onkeyup, true, self.inputs, true);
}
```

的if判断去掉就行了。

##### 2、tiled

tiledmap 用到的库，在`TMXTileMap`取`object`对象时要等其`draw() `方法调用完之后，不然会取到 undefined,可以监听 `tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE` 事件，在回调函数中取就没问题了。
