import gsap from "gsap";
export default class BtnContinue extends PIXI.Container {
    private _cont = new PIXI.Container();
    private _inverse = false;

    constructor() {
        super();
        this.addChild(this._cont);
        const btn = PIXI.Sprite.from('btn_continue.png');
        btn.x = -btn.width / 2;
        btn.y = -btn.height / 2;
        this._cont.addChild(btn);
        this.animate();
    }

    private animate() {
        this._inverse = !this._inverse;
        gsap.to(this._cont.scale, 0.3, {
            x: this._inverse ? 0.8 : 1,
            y: this._inverse ? 0.8 : 1,
            onComplete: this.animate.bind(this)
        });
    }
}