import gsap from "gsap";
export default class Hummer extends PIXI.Container {
    private _hummer: PIXI.Sprite;
    private _inverse = false;
    constructor() {
        super();
        this._hummer = PIXI.Sprite.from('hummer.png');
        this.addChild(this._hummer);
        this.animate();
    }

    private animate() {
        this._inverse = !this._inverse;
        gsap.to(this._hummer, 0.5, {y: this._inverse ? 10 : -10, onComplete: this.animate.bind(this)});
    }

    destroy() {
        gsap.killTweensOf(this._hummer);
        this.removeChild(this._hummer);
        this._hummer.destroy();
    }
}