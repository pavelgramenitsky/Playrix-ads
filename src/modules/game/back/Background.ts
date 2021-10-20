import gsap from 'gsap';

export default class Background extends PIXI.Container {
    constructor() {
        super();

        const back = PIXI.Sprite.from('back.jpg');
        this.addChild(back);

        const globe = PIXI.Sprite.from('globe.png');
        globe.position.set(88, 110);
        this.addChild(globe);

        const table = PIXI.Sprite.from('table.png');
        table.position.set(202, 196);
        this.addChild(table);

        const sofa = PIXI.Sprite.from('sofa.png');
        sofa.position.set(128, 324);
        this.addChild(sofa);

        const plant_0 = PIXI.Sprite.from('plant.png');
        plant_0.position.set(456, 0);
        this.addChild(plant_0);

        const plant_1 = PIXI.Sprite.from('plant.png');
        plant_1.position.set(1136, 164);
        this.addChild(plant_1);

        const austin = PIXI.Sprite.from('austin.png');
        austin.position.set(696, 114);
        this.addChild(austin);
    }
}