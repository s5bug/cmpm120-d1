import 'phaser';

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    create() {
        const screen_width = this.game.config.width as number;
        const screen_height = this.game.config.height as number;

        let heading = "Credits"
        let body = this.cache.text.get('credits')

        let headingText = this.add.text(
            16,
            16,
            heading,
            {
                fontSize: 48
            }
        )

        let bodyText = this.add.text(
            headingText.x,
            headingText.y + headingText.displayHeight + 16,
            body,
        )
        bodyText;

        let nextSlideProgress = this.add.rectangle(
            16,
            screen_height - 16,
            screen_width - 32,
            1,
            0x00FF00
        )
        nextSlideProgress.setOrigin(0, 1)

        this.tweens.add({
            targets: nextSlideProgress,
            width: 0,
            duration: 5000,
            onComplete: () => this.scene.start('company')
        })

        this.input.on('pointerdown', () => this.scene.start('company'))
    }
}
