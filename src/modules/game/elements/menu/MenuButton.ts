import gsap from "gsap/all";

export default class MenuButton extends PIXI.Container {
    private _id: number;
    private _front: PIXI.Sprite;
    private _back: PIXI.Sprite;
    private _select = false;

    constructor(id: number, icon: string) {
        super();

        this._id = id;
        this._back = PIXI.Sprite.from('btn_back.png');
        this.addChild(this._back);

        this._front = PIXI.Sprite.from('btn_select.png');
        this._front.alpha = 0;
        this._front.position.set(9, 5);
        this.addChild(this._front);

        const ico = PIXI.Sprite.from(icon);
        ico.x = this._back.x + this._back.width / 2 - ico.width / 2;
        ico.y = this._back.y + (this._back.height - ico.height) / 2;
        this.addChild(ico);
    }

    get select(): boolean {
        return this._select;
    }

    set select(value: boolean) {
        this._select = value;
        gsap.killTweensOf(this._front);
        gsap.to(this._front, 0.3, {alpha: value ? 1 : 0});
    }

    get id(): number {
        return this._id;
    }
}