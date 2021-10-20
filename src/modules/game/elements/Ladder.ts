import gsap from 'gsap';

export default class Ladder extends PIXI.Container {
    private _oldLadder: PIXI.Sprite;
    private _currentLadder: PIXI.Sprite;
    private _index = 0;
    private _positions = [[833, 120], [833 + 77, 120 - 92], [833 + 65, 120 - 88], [833 + 75, 120 - 98]]
    constructor() {
        super();

        this._oldLadder = PIXI.Sprite.from(`ladder_${this._index}.png`);
        this._oldLadder.position.set(this._positions[this._index][0], this._positions[this._index][1]);
        this.addChild(this._oldLadder);
        this._currentLadder = new PIXI.Sprite();
        this.addChild(this._currentLadder);
    }

    setLadder(_index: number) {
        this._index = _index;
        this._currentLadder.texture = PIXI.Texture.from(`ladder_${this._index}.png`);
        this._currentLadder.position.set(this._positions[this._index][0], this._positions[this._index][1] - 80);
        this._currentLadder.alpha = 0;
        gsap.to(this._currentLadder, 0.5, {y: this._positions[this._index][1], alpha: 1});
        gsap.to(this._oldLadder, 0.5, {alpha: 0, onComplete: () => {
            const temp = this._currentLadder;
            this._currentLadder = this._oldLadder;
            this._oldLadder = temp;
        }});

    }

}