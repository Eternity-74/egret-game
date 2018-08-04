// TypeScript file
namespace ui {
    export class bar extends egret.DisplayObjectContainer {

        public bar1:egret.Bitmap;
        public bar2:egret.Bitmap;
        private mask_shp;
        
        public constructor(txtr1,txtr2) {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.bar1 = new egret.Bitmap();
            this.bar2 = new egret.Bitmap();
            this.bar1.texture = txtr1;
            this.bar2.texture = txtr2;
            
            
        }

        private onAddToStage(evt:egret.Event) {
            
            this.addChild(this.bar1);
            this.addChild(this.bar2);
            
            
            this.mask_shp = new egret.Rectangle(0,0,0,200);
        }

        public updata(n1:number,n2:number){
            this.mask_shp.width = this.bar1.width*n1/n2;
            this.bar2.mask = this.mask_shp; 
            console.log(this.bar2.mask.width+'========'+this.bar2.mask)
        }
    }
}