// TypeScript file
namespace ui{
    export class hp extends bar{
        public constructor() {
            let txtr1 = RES.getRes('mp1_png');
            let txtr2 = RES.getRes('mp0_png');
            super(txtr1,txtr2);
            this.x = 50;
            this.y = 100;
            
        }
    }
}