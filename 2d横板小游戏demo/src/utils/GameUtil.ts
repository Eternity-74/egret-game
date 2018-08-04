// TypeScript file
namespace utils{
    export class GameUtil{
        public static hitTest(obj1,obj2):boolean
        {
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            let p1 = obj1.localToGlobal(obj1.x,obj1.y);
            let p2 = obj2.localToGlobal(obj2.x,obj2.y);
            rect1.height=100;
            rect1.width=320;
            rect1.x = p1.x+300;
            rect1.y = p1.y+100;
            rect2.x = p2.x;
            rect2.y = p2.y;
            console.log(rect1+' and '+rect2);
            return rect1.intersects(rect2);
        }
    }
}