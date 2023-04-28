import 'phaser';

const logo_appear_in_stamp = 0;
const logo_appear_out_stamp = 1000;
const logotype_appear_in_stamp = 2000;
const logotype_appear_out_stamp = 3000;
const all_disappear_in_stamp = 5000;
const all_disappear_out_stamp = 6000;

export default class CompanyScene extends Phaser.Scene {
    constructor() {
        super('company');
    }

    create() {
        const screen_width = this.game.config.width as number;
        const screen_height = this.game.config.height as number;

        let anotherWeek = this.add.sprite(
            screen_width / 2,
            screen_height / 2,
            'anotherweek'
        )
        anotherWeek.scale = 0.5
        anotherWeek.alpha = 0.0

        this.tweens.chain({
            targets: anotherWeek,
            tweens: [
                {
                    delay: logo_appear_in_stamp,
                    alpha: 1.0,
                    duration: (logo_appear_out_stamp - logo_appear_in_stamp),
                    ease: Phaser.Math.Easing.Expo.In
                },
                {
                    delay: (all_disappear_in_stamp - logo_appear_out_stamp),
                    alpha: 0.0,
                    duration: (all_disappear_out_stamp - all_disappear_in_stamp),
                    ease: Phaser.Math.Easing.Expo.Out
                }
            ]
        })

        let flished = this.add.sprite(
            0,
            0,
            'flished'
        )
        flished.setOrigin(0, 0.5)
        let fisjEnterprises = this.add.sprite(
            0,
            0,
            'fisjenterprises'
        )
        fisjEnterprises.setOrigin(1, 0.5)

        const margin = 16
        let logotypeSize = margin + (flished.width + fisjEnterprises.width)
        let sideDistance = (screen_width - logotypeSize - margin) / 2

        const bottom_distance = 64
        let centerY = screen_height - (bottom_distance + (flished.height / 2))
        flished.setPosition(sideDistance, centerY)
        fisjEnterprises.setPosition(screen_width - sideDistance, centerY)

        flished.alpha = 0.0
        fisjEnterprises.alpha = 0.0

        this.tweens.chain({
            targets: [flished, fisjEnterprises],
            tweens: [
                {
                    delay: logotype_appear_in_stamp,
                    alpha: 1.0,
                    duration: (logotype_appear_out_stamp - logotype_appear_in_stamp),
                    ease: Phaser.Math.Easing.Expo.In
                },
                {
                    delay: (all_disappear_in_stamp - logotype_appear_out_stamp),
                    alpha: 0.0,
                    duration: (all_disappear_out_stamp - all_disappear_in_stamp),
                    ease: Phaser.Math.Easing.Expo.Out,
                    onComplete: () => this.scene.start('intro')
                }
            ]
        })
    }
}
