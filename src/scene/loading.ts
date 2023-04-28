import 'phaser';

import AnotherWeekImage from '../assets/anotherweek.png';
import FisjEnterprisesImage from '../assets/fisjenterprises.png';
import FlishedImage from '../assets/flished.png';

import ImpactFont from '../assets/Impact-Regular.ttf';

import CreditsText from '../assets/credits.txt';

import AmongusSound from '../assets/amongus.wav';
import OneSound from '../assets/one.wav';

const bar_width = 400;
const bar_height = 50;

export default class LoadingScene extends Phaser.Scene {
    // @ts-ignore
    progressBox: Phaser.GameObjects.Rectangle
    // @ts-ignore
    progressBar: Phaser.GameObjects.Rectangle

    constructor() {
        super('loading');
    }

    preload() {
        const screen_width = this.game.config.width as number;
        const screen_height = this.game.config.height as number;

        this.progressBar = this.add.rectangle(
            (screen_width - bar_width) / 2,
            screen_height / 2,
            0,
            bar_height
        )
        this.progressBar.setOrigin(0, 0.5)
        this.progressBar.isStroked = false;
        this.progressBar.setFillStyle(0xAAAAAA)

        this.progressBox = this.add.rectangle(
            screen_width / 2,
            screen_height / 2,
            bar_width,
            bar_height
        )
        this.progressBox.isFilled = false;
        this.progressBox.setStrokeStyle(8, 0xFFFFFF)

        this.load.on("progress", (value: number) => {
            this.progressBar.width = bar_width * value
        })
        this.load.on("fileprogress", (file: Phaser.Loader.File) => {
            file;
        })
        this.load.on("complete", () => {
            this.progressBar.width = bar_width
        })

        this.load.image('anotherweek', AnotherWeekImage)
        this.load.image('fisjenterprises', FisjEnterprisesImage)
        this.load.image('flished', FlishedImage)

        // @ts-ignore
        this.load.ttf('impact', ImpactFont)

        this.load.text('credits', CreditsText)

        this.load.audio('amongus', AmongusSound)
        this.load.audio('one', OneSound)
    }

    create() {
        this.scene.start('credits')
    }
}
