var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var utils;
(function (utils) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        GameUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            var p1 = obj1.localToGlobal(obj1.x, obj1.y);
            var p2 = obj2.localToGlobal(obj2.x, obj2.y);
            rect1.height = 100;
            rect1.width = 320;
            rect1.x = p1.x + 300;
            rect1.y = p1.y + 100;
            rect2.x = p2.x;
            rect2.y = p2.y;
            console.log(rect1 + ' and ' + rect2);
            return rect1.intersects(rect2);
        };
        return GameUtil;
    }());
    utils.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "utils.GameUtil");
})(utils || (utils = {}));
