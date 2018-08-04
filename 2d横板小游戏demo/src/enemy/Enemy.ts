// TypeScript file
namespace enemy{
    export  class Enemy extends egret.DisplayObjectContainer{

        public hp=18;
        public h;
        public w;
        private v:number = 2;
        private mcFactory: egret.MovieClipDataFactory;
        private mc_c: egret.MovieClip;
        private mc_a: egret.MovieClip;
        public enemy_name: string;
        private state:string;
        private dir:number = 1;
        public tmxTileMap: tiled.TMXTilemap;
        public tmxLayer: tiled.TMXLayer;

        public constructor(str:string,h:number,w:number,tmxLayer:tiled.TMXLayer) {
            super();
            this.enemy_name = str;
            this.h=h;
            this.w=w;
            this.tmxLayer=tmxLayer;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(evt:egret.Event){
           // this.tmxLayer = this.tmxTileMap.getLayers[0];
            let data = RES.getRes('enemies_json');
            let txtr = RES.getRes('enemies_png');
            this.mcFactory = new egret.MovieClipDataFactory(data,txtr);
            this.mc_c = new egret.MovieClip(this.mcFactory.generateMovieClipData(this.enemy_name));
            this.addChild(this.mc_c);
            this.mc_c.gotoAndPlay('idle',-1);
            this.state='walk'
            this.dir=-1;
        }

        public updata(){
            //走路
            this.roadTest();
            this.x += this.v*this.dir;
            if(this.v<2) this.v+=0.2;
        }

        

        private changeState(){
            if(this.state=='walk'){
                if(this.dir<0) this.mc_c.anchorOffsetX+=this.w;
                else this.mc_c.anchorOffsetX-=this.w;
                this.dir*=-1;
                this.mc_c.skewY=(this.mc_c.skewY+180)%360;
            }
        }
        public attacked() {
            this.v = -1;
        }
        public _die(){
           // if(this.dir==-1)
            this.mc_c.gotoAndPlay('die',1);
            this.mc_c.addEventListener(egret.Event.COMPLETE,function(){
                this.parent.removeChild(this);

            },this);
        }
        private roadTest(){
            if(this.dir==-1){
                
                let x = this.x-20;
                let y = this.y+this.h+10;
                let tile:tiled.TMXTile = this.tmxLayer.getTile(x,y);
                if(tile==null) this.changeState();

                y = this.y+this.h/2;
                tile = this.tmxLayer.getTile(x,y);;
                if(tile!=null) this.changeState();

            }else{
                let x = this.x+this.w+20;
                let y = this.y+this.h+10;
                let tile:tiled.TMXTile = this.tmxLayer.getTile(x,y);
                if(tile==null) this.changeState();
                y = this.y+this.h/2;
                tile = this.tmxLayer.getTile(x,y);;
                if(tile!=null) this.changeState();
            }
        }
        
    }
}