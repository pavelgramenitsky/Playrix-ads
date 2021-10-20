import gsap from 'gsap/all';
import { Container } from 'pixi.js';
import config from '../../config';
import { gsapTimer } from '../../helpers';
import Background from './back/Background';
import BtnContinue from './elements/BtnContinue';
import EndScreen from './elements/EndScreen';
import Hummer from './elements/Hummer';
import Ladder from './elements/Ladder';
import MenuLadder from './elements/MenuLadder';


export default class GameStage extends Container {
    
    private _ladder: Ladder;
    private _hummer: Hummer;
    private _menu: MenuLadder;
    private _end: EndScreen;

    constructor() {
        super();

        const back = new Background();
        this.addChild(back);

       this._ladder = new Ladder();
       this.addChild(this._ladder);

       const flower = PIXI.Sprite.from('flower.png');
       flower.position.set(1122, 438);
       this.addChild(flower);

       this._hummer = new Hummer();
       this._hummer.position.set(1088, 258);
       this._hummer.interactive = true;
       this._hummer.buttonMode = true;
       this._hummer.on('pointerdown', this.onClickHummer.bind(this));
       this.addChild(this._hummer);
       this._hummer.visible = false;
       gsapTimer({fast: 2, normal: 2}, () => {
           this._hummer.visible = true;
           this._hummer.alpha = 0;
           gsap.to(this._hummer, 0.5, { alpha : 1});
       })

       this._menu = new MenuLadder();
       this._menu.position.set(842, 6);
       this._menu.on('Menu.Select', this.onSelectMenu.bind(this));
       this._menu.on('Menu.Complete', this.onCompleteMenu.bind(this));
       this.addChild(this._menu);

       this._end = new EndScreen();
       this.addChild(this._end);

       const logo = PIXI.Sprite.from('logo.png');
       logo.position.set(30, -logo.height);
       this.addChild(logo);
       gsap.to(logo, 0.5, {x: 30, y: 4});

       const btnContinue = new BtnContinue();
       btnContinue.x = config.WIDTH / 2;
       btnContinue.y = 500 + btnContinue.height / 2;
       btnContinue.interactive = true;
       btnContinue.buttonMode = true;
       btnContinue.on('pointerdown', () => {
        window.open('https://apps.apple.com/ru/app/homescapes/id1195621598','_blank');

       });
       this.addChild(btnContinue);

    }

    private onClickHummer(): void {
        this.removeChild(this._hummer);
        this._hummer.destroy();
        this._menu.show();
    }

    private onSelectMenu(event:Event) {
        this._ladder.setLadder(event['id'] + 1);
    }

    private onCompleteMenu() {
        this._end.show();
    }
}