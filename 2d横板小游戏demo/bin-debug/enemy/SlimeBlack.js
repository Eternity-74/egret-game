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
var enemy;
(function (enemy) {
    var SlimeBlack = (function (_super) {
        __extends(SlimeBlack, _super);
        function SlimeBlack(tmxLayer) {
            var _this = _super.call(this, 'SlimeBlack', 70, 70, tmxLayer) || this;
            _this.scaleX = 0.5;
            _this.scaleY = 0.5;
            return _this;
        }
        return SlimeBlack;
    }(enemy.Enemy));
    enemy.SlimeBlack = SlimeBlack;
    __reflect(SlimeBlack.prototype, "enemy.SlimeBlack");
})(enemy || (enemy = {}));
