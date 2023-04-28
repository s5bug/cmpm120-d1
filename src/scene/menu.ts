import 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    create() {
        const screen_width = this.game.config.width as number;
        const screen_height = this.game.config.height as number;

        let tradeOffer = this.add.sprite(32, screen_height, 'tradeoffer')
        tradeOffer.setOrigin(0.0, 0.0)

        this.tweens.add({
            targets: tradeOffer,
            y: screen_height - tradeOffer.height,
            ease: Phaser.Math.Easing.Elastic.Out,
            duration: 1000
        })

        let fitnessgramText = this.add.text(
            screen_width,
            32,
            this.cache.text.get('fitnessgram'),
            {
                fontSize: 36,
                fontFamily: 'sans-serif',
                align: 'justify'
            }
        )
        fitnessgramText.setWordWrapWidth((screen_width / 2) - 32)

        this.tweens.add({
            targets: fitnessgramText,
            x: screen_width / 2,
            duration: 1000
        })

        let polyrhythmSound = this.sound.add('polyrhythm', { volume: 0.0 })
        polyrhythmSound.loop = true
        this.tweens.add({
            targets: polyrhythmSound,
            volume: { from: 0.0, to: 1.0 },
            duration: 500.0,
            ease: Phaser.Math.Easing.Expo.In,
            onStart: () => polyrhythmSound.play()
        })
    }
}
