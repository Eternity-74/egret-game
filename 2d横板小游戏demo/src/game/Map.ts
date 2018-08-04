// TypeScript file
namespace game {
    export class Map extends egret.DisplayObjectContainer {

        private url: string;
        private request: egret.HttpRequest;
        private tmxTileMap: tiled.TMXTilemap;
        private tmxLayer: tiled.TMXLayer;
        private misaka: game.Misaka;
        private f: boolean = false;
        private f2: boolean = false;
        private enemies_list: Array<enemy.Enemy>;
        private tmxObjectGroup: tiled.TMXObjectGroup;
        private hpbar:ui.hp;
        private _bg:egret.Bitmap;

        public constructor(misaka: game.Misaka) {
            super();
            this.misaka = misaka;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(evt: egret.Event) {
            this.url = "resource/assets/yubangamemap.tmx";
            /*初始化请求*/
            this.request = new egret.HttpRequest();
            /*监听资源加载完成事件*/
            this.request.once(egret.Event.COMPLETE, this.onMapComplete, this);
            /*发送请求*/
            this.request.open(this.url, egret.HttpMethod.GET);
            this.request.send();
            
        }

        private onMapComplete(event: egret.Event) {
            var data: any = egret.XML.parse(event.currentTarget.response);
            /*初始化地图*/
            this.tmxTileMap = new tiled.TMXTilemap(3200, 640, data, this.url);
            this.tmxTileMap.render();
            /*将地图添加到显示列表*/
            this.addChild(this.tmxTileMap);
            this.tmxTileMap.touchEnabled = true;

            //this.tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ok, this);
            this.tmxTileMap.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, this.onAllImageComplete, this);
            
            //添加UI
            this.hpbar = new ui.hp();
            this.addChild(this.hpbar);

            this._bg = new egret.Bitmap();
            this._bg.texture = RES.getRes('bg_png');
            this._bg.scaleX = 1.6;
            this._bg.scaleY = 0.75;
            this.stage.addChildAt(this._bg,0);
    }

        private createEnemy() {
            this.enemies_list = new Array<enemy.Enemy>();
            let len: number = this.tmxObjectGroup.getObjectCount();
            //console.log(len);
            for (let i = 0; i < len; i++) {
                let obj: any = this.tmxObjectGroup.getObjectByIndex(i);
                if (obj != null && obj.id > 5 && obj.id != 16) {
                    let en: enemy.Enemy = new enemy.SlimeBlack(this.tmxLayer);
                    // en.tmxTileMap = this.tmxTileMap;
                    //en.tmxLayer = this.tmxLayer;



                    this.enemies_list.push(en);
                    en.x = obj.x - en.w / 2;
                    en.y = obj.y - en.h;
                    this.addChild(en);
                    //console.log(en.tmxLayer);
                }
            }
            this.f2 = true;

        }

        private onAllImageComplete(evt: tiled.TMXImageLoadEvent) {
            let arr: Array<tiled.TMXObjectGroup> = this.tmxTileMap.getObjects();
            //console.log(arr);
            //arr[0].draw();
            this.tmxObjectGroup = arr[0];
            let obj: any = arr[0].getObjectById(5);
            //console.log(obj);
            if (obj != null) {
                this.misaka.x = obj.x;
                this.misaka.y = obj.y - this.misaka.h;
                //console.log("ok");
                this.addChild(this.misaka);
            }
            this.tmxLayer = this.tmxTileMap.getLayers()[0];

            //创建敌人
            this.createEnemy()
            this.f = true;
            //console.log(this.tmxLayer + '23sssss3');
        }

        public updata() {
            if(this.misaka.x<10) this.misaka.x = 10;
            if(this.misaka.x>3000) this.misaka.x = 3000;
            if(this.misaka.mp<100)
            this.misaka.mp+=0.3;
            console.log(this,this.hpbar);
            this.hpbar.updata(this.misaka.mp,100)
            let w = this.stage.stageWidth / 2;
            if (this.misaka.y > this.stage.stageHeight) { this.misaka.y = 0; this.misaka.x = 100; this.x = 0 }
            //屏幕滚动
            if (this.misaka.x - this.x > w && this.misaka.x < 3200 - w) {
                this.x = -(this.misaka.x - w) * 0.7;
                this.hpbar.x = this.misaka.x -w+50;

            }
            if (this.f) {
                this.hitTest(this.misaka);
            }
            //敌人状态更新
            if (this.f && this.f2) {
                let len = this.enemies_list.length;
                for (let i = 0; i < len; i++) {
                    let en: enemy.Enemy = this.enemies_list[i];
                    // console.log(en.tmxLayer+'kkkkkk'+en.enemy_name)
                   // console.log(i);
                    //console.log(this.enemies_list);
                    en.updata();
                    if(en.hp<0){
                        en._die();
                        this.enemies_list.splice(i,1);
                        
                       // console.log('删掉了'+i);
                        i--;
                        len--;
                    }
                }
            }
            //敌人碰撞检测
            if(this.f&&this.f2)
            this.enemyHitTest();


        }
        //敌人碰撞检测
        private enemyHitTest(){
            let len = this.enemies_list.length;
            for (let i = 0; i < len; i++) {
                
                let en: enemy.Enemy = this.enemies_list[i];
                
                var rect1: egret.Rectangle = this.misaka.getBounds();
                var rect2: egret.Rectangle = en.getBounds();
                rect1.x = this.misaka.x+20;
                rect1.y = this.misaka.y;
                rect1.width=5;
                
                rect2.x = en.x;
                rect2.y = en.y+en.h/2;
                rect2.width = en.w/2;
                rect2.height = en.h/2;
                
                if(rect1.intersects(rect2)){
                    console.log('被怪物揍了TAT');
                    //this.misaka.sound_o.play(0,1);
                    this.misaka.hp-=10;
                    if(this.misaka.x<en.x) {this.misaka.back=-4;this.misaka.back_a=0.6}
                    else {this.misaka.back=4;this.misaka.back_a=-0.6}
                }
                
            }
        }
        //电磁炮攻击检测
        public attackTest(dir: number) {
            //console.log('放炮了哦~~');
            let len = this.enemies_list.length;
            for (let i = 0; i < len; i++) {
                //console.log(this.misaka.x)
                let en: enemy.Enemy = this.enemies_list[i];
                
                var rect1: egret.Rectangle = new egret.Rectangle;
                var rect2: egret.Rectangle = en.getBounds();
                rect1.width = 300;
                rect1.height = 20;
                rect2.width = en.w/2;
                if(this.misaka.state=='attack_r')rect1.x = this.misaka.x;
                else rect1.x = this.misaka.x-320;
                
                rect1.y = this.misaka.y+50;
                rect2.x = en.x-20;
                rect2.y = en.y;
                //console.log(rect1 + ' and ' + rect2);
                if(rect1.intersects(rect2)){
                    //console.log('击中了！！！');
                    en.hp-=10;
                    en.attacked();
                }
                
            }

        }
        private hitTest(obj) {
            //是否接地
            let x = obj.x + obj.w / 2;
            let y = obj.y + obj.h + 5;
            let tile = this.tmxLayer.getTile(x, y)
            if (tile != null) {
                // console.log(tile.tileY + 'sss' + obj.y);

                obj.y = tile.tileY * 32 - obj.h;
                //如果有向下的速度
                //console.log(obj.vy + '+' + obj.state);

                if (obj.vy > 0) {
                    obj.ay = 0;
                    obj.vy = 0;
                    if (obj.fx == 0) {
                        if (obj.state == 'jump_r') obj.changeState('idle_r');
                        else obj.changeState('idle_l');
                    }
                    else if (obj.fx == 1) obj.changeState('run_r');
                    else obj.changeState('run_l');
                    // obj.fx = 0;
                }

            } else {
                obj.ay = 2;
            }
            //右边是否有墙
            x = obj.x + obj.w;
            y = obj.y + obj.h / 2;
            tile = this.tmxLayer.getTile(x, y);
            if (tile != null && ((obj.state == 'run_r') || (obj.state == 'jump_r'))) {
                // console.log(obj.state);
                //this.misaka.x = x-4;
                obj.ffx = 0;
            }
            //左边
            x = obj.x;
            y = obj.y + obj.h / 2;
            tile = this.tmxLayer.getTile(x, y);
            if (tile != null && ((obj.state == 'run_l') || (obj.state == 'jump_l'))) {
                // console.log(obj.state);
                obj.ffx = 0;
            }
            //上边
            x = obj.x + obj.w / 2;
            y = obj.y - 5;
            tile = this.tmxLayer.getTile(x, y);
            if (tile != null && ((obj.state == 'jump_r') || (obj.state == 'jump_l'))) {
                // console.log(obj.state);
                obj.vy = 0;
            }






        }
    }
}