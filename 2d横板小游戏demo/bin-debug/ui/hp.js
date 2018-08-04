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
    var hp = (function (_super) {
        __extends(hp, _super);
        function hp() {
            var _this = this;
            var txtr1 = RES.getRes('mp1_png');
            var txtr2 = RES.getRes('mp0_png');
            _this = _super.call(this, txtr1, txtr2) || this;
            _this.x = 50;
            _this.y = 100;
            return _this;
        }
        return hp;
    }(ui.bar));
    ui.hp = hp;
    __reflect(hp.prototype, "ui.hp");
})(ui || (ui = {}));
