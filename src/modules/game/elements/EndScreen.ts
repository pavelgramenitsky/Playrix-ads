import gsap, {Elastic} from "gsap/all";
import config from "../../../config";

export default class EndScreen extends PIXI.Container {
    private _back = new PIXI.Graphics();
    private _panel: PIXI.Sprite;

    constructor() {
        super();
        this._back = new PIXI.Graphics();
        this._back.beginFill(0, 0.7);
        this._back.drawRect(0, 0, config.WIDTH, config.HEIGHT);
        this.addChild(this._back);

        this._panel = PIXI.Sprite.from('end_message.png');
        this._panel.position.set(config.WIDTH / 2 -this._panel.width / 2, 53)
        this.addChild(this._panel);

        this.visible = false;
    }

    show() {
        if (this.visible) {
            return;
        }
        this.visible = true;
        this._back.alpha = 0;
        gsap.to(this._back, 1, {alpha : 1});
        const pos = {x: this._panel.x, y: this._panel.y};
        this._panel.scale.set(0.01);
        this._panel.x = config.WIDTH / 2 -this._panel.width / 2;
        this._panel.y = config.HEIGHT / 2 - this._panel.height / 2;

        gsap.to(this._panel.scale, 1.5, {x: 1, y: 1, ease: Elastic.easeOut});
        gsap.to(this._panel, 1.5, {x: pos.x, y: pos.y, ease: Elastic.easeOut});
    }
}