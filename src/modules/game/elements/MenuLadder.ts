import gsap from "gsap/all";
import MenuButton from "./menu/MenuButton";

export default class MenuLadder extends PIXI.Container {
    private _buttons: MenuButton[] = [];
    private _btn_ok: PIXI.Sprite;
    constructor() {
        super();
        for (let i = 0; i < 3; i++) {
            const btn = new MenuButton(i, `ladder_ico_${i}.png`);
            btn.interactive = true;
            btn.buttonMode = true;
            btn.x = i * (btn.width + 5);
            btn.select = false;
            btn.on('pointerdown', this.onButton.bind(this));
            this.addChild(btn);
            
            this._buttons.push(btn);
        }

        this._btn_ok = PIXI.Sprite.from('btn_ok.png');
        this._btn_ok.interactive = true;
        this._btn_ok.buttonMode = true;
        this._btn_ok.on('pointerdown', this.onClickOk.bind(this));
        this._btn_ok.visible = false;
        this.addChild(this._btn_ok);

        this.visible = false;
    }

    show() {
        this.visible = true;
        this._buttons.map((b, index) => {
            b.y = -20;
            b.alpha = 0;
            gsap.to(b, 0.5, {alpha: 1, y: 0, delay: index * 0.1});
        });
    }

    private onButton(event: PIXI.interaction.InteractionEvent) {
        const btn = <MenuButton>event.currentTarget;
        if (btn.select) {
            return;
        }

        this._buttons.map((b) => {
            b.select = b.id === btn.id; 
        });
        this._btn_ok.visible = true;
        this._btn_ok.alpha = 0;
        this._btn_ok.x = btn.x + btn.width / 2 - this._btn_ok.width / 2;
        this._btn_ok.y = btn.y + btn.height + 10;
        gsap.to(this._btn_ok, 0.5, {alpha: 1 , y: btn.y + btn.height - 20});
        this.emit('Menu.Select', {id: btn.id});
    }

    private onClickOk() {
        this._btn_ok.interactive = false;
        gsap.to(this._btn_ok, 0.3, {alpha : 0});
        this._buttons.map((b, index) => {
            b.interactive = false;
            gsap.to(b, 0.5, {alpha: 0, y: b.y - 20, delay: index * 0.1});
        });
        this.emit('Menu.Complete');
    }
}