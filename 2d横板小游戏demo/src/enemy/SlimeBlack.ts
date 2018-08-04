// TypeScript file
namespace enemy{
    export class SlimeBlack extends enemy.Enemy{
        public constructor(tmxLayer) {
            super('SlimeBlack',70,70,tmxLayer);
            this.scaleX = 0.5;
            this.scaleY = 0.5;
        }

    }
}