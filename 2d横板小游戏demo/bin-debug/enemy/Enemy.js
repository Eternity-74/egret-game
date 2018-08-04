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
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(str, h, w, tmxLayer) {
            var _this = _super.call(this) || this;
            _this.hp = 18;
            _this.v = 2;
            _this.dir = 1;
            _this.enemy_name = str;
            _this.h = h;
            _this.w = w;
            _this.tmxLayer = tmxLayer;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Enemy.prototype.onAddToStage = function (evt) {
            // this.tmxLayer = this.tmxTileMap.getLayers[0];
            var data = RES.getRes('enemies_json');
            var txtr = RES.getRes('enemies_png');
            this.mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.mc_c = new egret.MovieClip(this.mcFactory.generateMovieClipData(this.enemy_name));
            this.addChild(this.mc_c);
            this.mc_c.gotoAndPlay('idle', -1);
            this.state = 'walk';
            this.dir = -1;
        };
        Enemy.prototype.updata = function () {
            //走路
            this.roadTest();
            this.x += this.v * this.dir;
            if (this.v < 2)
                this.v += 0.2;
        };
        Enemy.prototype.changeState = function () {
            if (this.state == 'walk') {
                if (this.dir < 0)
                    this.mc_c.anchorOffsetX += this.w;
                else
                    this.mc_c.anchorOffsetX -= this.w;
                this.dir *= -1;
                this.mc_c.skewY = (this.mc_c.skewY + 180) % 360;
            }
        };
        Enemy.prototype.attacked = function () {
            this.v = -1;
        };
        Enemy.prototype._die = function () {
            // if(this.dir==-1)
            this.mc_c.gotoAndPlay('die', 1);
            this.mc_c.addEventListener(egret.Event.COMPLETE, function () {
                this.parent.removeChild(this);
            }, this);
        };
        Enemy.prototype.roadTest = function () {
            if (this.dir == -1) {
                var x = this.x - 20;
                var y = this.y + this.h + 10;
                var tile = this.tmxLayer.getTile(x, y);
                if (tile == null)
                    this.changeState();
                y = this.y + this.h / 2;
                tile = this.tmxLayer.getTile(x, y);
                ;
                if (tile != null)
                    this.changeState();
            }
            else {
                var x = this.x + this.w + 20;
                var y = this.y + this.h + 10;
                var tile = this.tmxLayer.getTile(x, y);
                if (tile == null)
                    this.changeState();
                y = this.y + this.h / 2;
                tile = this.tmxLayer.getTile(x, y);
                ;
                if (tile != null)
                    this.changeState();
            }
        };
        return Enemy;
    }(egret.DisplayObjectContainer));
    enemy.Enemy = Enemy;
    __reflect(Enemy.prototype, "enemy.Enemy");
})(enemy || (enemy = {}));
