import 'phaser';

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    create() {
        let heading = "Credits"
        let body = this.cache.text.get('credits')

        let headingText = this.add.text(
            16,
            16,
            heading,
            {
                fontSize: 96
            }
        )

        let bodyText = this.add.text(
            headingText.x,
            headingText.y + headingText.height + 16,
            body,
        )

        this.add.text(
            bodyText.x,
            bodyText.y + bodyText.height + 16,
            "Click to continue",
            {
                fontSize: 48,
                color: "#00FF00"
            }
        )

        this.input.on('pointerdown', () => this.scene.start('company'))
    }
}
