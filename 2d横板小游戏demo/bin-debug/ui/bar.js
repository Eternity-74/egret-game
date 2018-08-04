var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var ui;
(function (ui) {
    var bar = (function (_super) {
        __extends(bar, _super);
        function bar(txtr1, txtr2) {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.bar1 = new egret.Bitmap();
            _this.bar2 = new egret.Bitmap();
            _this.bar1.texture = txtr1;
            _this.bar2.texture = txtr2;
            return _this;
        }
        bar.prototype.onAddToStage = function (evt) {
            this.addChild(this.bar1);
            this.addChild(this.bar2);
            this.mask_shp = new egret.Rectangle(0, 0, 0, 200);
        };
        bar.prototype.updata = function (n1, n2) {
            this.mask_shp.width = this.bar1.width * n1 / n2;
            this.bar2.mask = this.mask_shp;
            console.log(this.bar2.mask.width + '========' + this.bar2.mask);
        };
        return bar;
    }(egret.DisplayObjectContainer));
    ui.bar = bar;
    __reflect(bar.prototype, "ui.bar");
})(ui || (ui = {}));
