// TypeScript file
namespace game {
    export class Misaka extends egret.DisplayObjectContainer {

        public hp: number;
        public mp: number=10;
        private mcFactory: egret.MovieClipDataFactory;
        private mc_c: egret.MovieClip;
        public mc_a: egret.MovieClip;
        public state: string;
        //private timer: egret.Timer;
        private kb: KeyBoard;
        public vx: number = 10;
        public vy: number = 0;
        private fx: number;
        public ffx: number = 1;
        private ffy: number = 1;
        private fy: number;
        public h: number = 78;
        public w: number = 70;
        public ay: number = 2;//重力加速度
        public pre_state: string;
        private pre_fx: number;
        private sound_railgun: egret.Sound;
        private sound_coin: egret.Sound;
        public sound_o: egret.Sound;
        public sound_run: egret.Sound;
        public sound_jump: egret.Sound;
        public map: game.Map;
        public back: number = 0;
        public back_a: number = 0.6;



        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(evt: egret.Event) {
            //加载人物动画
            let data = RES.getRes("misaka_json");
            let txtr = RES.getRes("misaka_png");
            this.mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.mc_c = new egret.MovieClip(this.mcFactory.generateMovieClipData('character'));
            this.mc_a = new egret.MovieClip(this.mcFactory.generateMovieClipData('effect'));
            this.mc_a.y = -18;
            this.mc_a.x = 26;
            this.addChild(this.mc_c);

            //创建播放器
            this.sound_railgun = new egret.Sound();
            this.sound_coin = new egret.Sound();
            this.sound_o = new egret.Sound();
            this.sound_run = new egret.Sound();
            this.sound_jump = new egret.Sound();

            this.sound_railgun.load("resource/assets/railgun.mp3");
            this.sound_coin.load("resource/assets/coin.mp3");
            this.sound_o.load("resource/assets/o.mp3");
            this.sound_run.load("resource/assets/run.mp3");
            this.sound_jump.load("resource/assets/jump.mp3");

            let sound_start: egret.Sound = new egret.Sound();
            sound_start.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {
                sound_start.play(0, 1);
            }, this);
            sound_start.load("resource/assets/chushou.mp3");


            //实例化Keyboard
            this.kb = new KeyBoard();
            this.kb.addEventListener(KeyBoard.onkeyup, this.onkeyup, this);
            this.kb.addEventListener(KeyBoard.onkeydown, this.onkeydown, this);
            //初始化人物状态
            this.state = 'idle_r';
            this.fx = 0;
            this.fy = 0;
            this.scaleY = 0.8;
            this.scaleX = 0.8;
            //this.anchorOffsetY = -28;
            this.mc_c.gotoAndPlay(this.state, -1);
            //this.mc_c.skewY=180;
            //this.mc_c.skewX=180;


        }
        private onkeydown(evt) {

            // console.log('按下' + evt.data);
            //空中动作
            if (this.kb.isContain(evt.data, KeyBoard.W) && this.state != 'jump_l' && this.state != 'jump_r') {
                if (this.kb.isContain(evt.data, KeyBoard.A) && this.kb.isContain(evt.data, KeyBoard.D)) {
                    if (this.fx > 0)
                        this.changeState('jump_r');
                    else if (this.fx < 0)
                        this.changeState('jump_l');
                    this.fx = 0;
                } else if (this.kb.isContain(evt.data, KeyBoard.D)) {
                    this.fx = 1;
                    this.changeState('jump_r');
                } else if (this.kb.isContain(evt.data, KeyBoard.A)) {
                    this.fx = -1;
                    this.changeState('jump_l');
                }
                else {
                    if (this.state == 'idle_l')
                        this.changeState('jump_l');
                    else
                        this.changeState('jump_r');
                }
                this.sound_jump.play(0,1).volume=0.5;
            }
            //地面动作
            if (this.vy == 0 && this.state != 'attack_l' && this.state != 'attack_r') {
                //攻击
                if (this.mp>20&&this.kb.isContain(evt.data, KeyBoard.A) && this.kb.isContain(evt.data, KeyBoard.J)) {
                    this.changeState('attack_l');

                }
                else if (this.mp>20&&this.kb.isContain(evt.data, KeyBoard.D) && this.kb.isContain(evt.data, KeyBoard.J)) {
                    this.changeState('attack_r');
                }
                else if (this.mp>20&&this.kb.isContain(evt.data, KeyBoard.J)) {
                    if (this.state == 'idle_l') this.changeState('attack_l');
                    else this.changeState('attack_r');
                } else if (this.state != 'attack_l' && this.state != 'attack_r') {
                    if (this.kb.isContain(evt.data, KeyBoard.A) && this.kb.isContain(evt.data, KeyBoard.D)) {
                        if (this.fx > 0)
                            this.changeState('idle_r');
                        else if (this.fx < 0)
                            this.changeState('idle_l');
                        this.fx = 0;
                    } else if (this.kb.isContain(evt.data, KeyBoard.D)) {
                        this.fx = 1;
                        this.changeState('run_r');
                    } else if (this.kb.isContain(evt.data, KeyBoard.A)) {
                        this.fx = -1;
                        this.changeState('run_l');
                    }
                }

            }


        }

        private onkeyup(evt) {
            //console.log('松开' + evt.data);
            if (this.state != 'attack_l' && this.state != 'attack_r') {
                if (this.vy == 0) {
                    if (this.kb.isContain(evt.data, KeyBoard.A) && this.kb.isContain(evt.data, KeyBoard.D)) {
                        this.fx = 0;
                    } else if (this.kb.isContain(evt.data, KeyBoard.D)) {
                        this.fx = 1;
                        this.changeState('run_r');
                    } else if (this.kb.isContain(evt.data, KeyBoard.A)) {
                        this.fx = -1;
                        this.changeState('run_l');
                    } else {
                        if (this.fx > 0)
                            this.changeState('idle_r');
                        else if (this.fx < 0)
                            this.changeState('idle_l');
                        this.fx = 0;
                    }
                }
                else {
                    if (this.kb.isContain(evt.data, KeyBoard.A) && this.kb.isContain(evt.data, KeyBoard.D)) {
                        this.fx = 0;
                    } else if (this.kb.isContain(evt.data, KeyBoard.D)) {
                        this.fx = 1;
                        //this.changeState('run_r');
                    } else if (this.kb.isContain(evt.data, KeyBoard.A)) {
                        this.fx = -1;
                        // this.changeState('run_l');
                    } else {

                        this.fx = 0;
                    }
                }
            } else {
                if (this.kb.isContain(evt.data, KeyBoard.A) && this.kb.isContain(evt.data, KeyBoard.D)) {
                    this.pre_fx = 0;
                    if (this.state == 'attack_l')
                        this.pre_state = 'idle_l';
                    else
                        this.pre_state = 'idle_r';
                }
                else if (this.kb.isContain(evt.data, KeyBoard.D)) {
                    this.pre_fx = 1;
                    this.pre_state = 'run_r';
                }
                else if (this.kb.isContain(evt.data, KeyBoard.A)) {
                    this.pre_fx = -1;
                    this.pre_state = 'run_l';
                }
                else {
                    this.pre_fx = 0;
                    if (this.state == 'attack_l')
                        this.pre_state = 'idle_l';
                    else
                        this.pre_state = 'idle_r';
                }

            }


        }
        private attackComplete(evt: egret.Event) {
            //console.log('okokokoksss');
            this.removeChild(this.mc_a);
            this.mc_c.removeEventListener(egret.Event.COMPLETE, this.attackComplete, this);
            this.fx = this.pre_fx;
            this.changeState(this.pre_state);
            this.mc_c.anchorOffsetX = 0;

            this.mc_a.y = -18;
            this.mc_a.x = 26;


        }
        public updata() {
            //console.log('ksks' + this.vy + 'ddd' + this.ay);
            if(this.back_a>0&&this.back<0){
                this.x+=this.back;
                this.back+=this.back_a;
            }
            else if(this.back_a<0&&this.back>0){
                this.x+=this.back;
                this.back+=this.back_a;
            }

            this.x += this.vx * this.fx * this.ffx;
            if (this.vy < 10)
                this.vy += this.ay;

            this.y += this.vy;

            this.ffx = 1;
            this.ffy = 1;
        }

        public changeState(str: string) {
            this.pre_state = this.state;
            this.pre_fx = this.fx;
            //console.log(this.state);
            if (this.state != str) {
                this.state = str;
                this.mc_c.gotoAndPlay(this.state, -1);
            }

            switch (str) {
                case 'jump_l':
                case 'jump_r':
                    this.vy = -15;
                    break;
                case 'run_l':
                    break;
                case 'run_r':
                    break;
                case 'attack_l':
                    this.fx = 0;
                    this.mc_c.anchorOffsetX = 44;
                    this.sound_coin.play(0, 1);
                    this.mc_c.gotoAndPlay('attack_l', 1);
                    this.mc_c.addEventListener(egret.Event.COMPLETE, this.attackComplete, this);
                    this.mc_c.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onok1, this);
                    this.mp-=20;
                    break;
                case 'attack_r':
                    this.fx = 0;
                    this.sound_coin.play(0, 1);
                    this.mc_c.gotoAndPlay('attack_r', 1);
                    this.mc_c.addEventListener(egret.Event.COMPLETE, this.attackComplete, this);
                    this.mc_c.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onok1, this);
                    this.mp-=20;
                    break;

            }

        }
        private onok1(evt) {
            this.mc_a.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onok1, this);
            if (evt.frameLabel == '@ok1') {
                this.sound_railgun.play(0, 1);
                this.mc_a.x = -500;
                this.mc_a.gotoAndPlay('railgun_l', 3);
                this.addChild(this.mc_a);
                this.map.attackTest(-1);
            } else {
                this.sound_railgun.play(0, 1);
                this.mc_a.gotoAndPlay('railgun_r', 3);
                this.addChild(this.mc_a);
                this.map.attackTest(1);
            }
        }


    }
}