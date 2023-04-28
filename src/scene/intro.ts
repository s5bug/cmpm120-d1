import 'phaser';

const pentagon_appear_in_stamp = 0;
const pentagon_appear_out_stamp = 1000;
const amongus_appear_in_stamp = 2000;
const amongus_appear_out_stamp = 4000;
const one_appear_in_stamp = 6000;
const one_appear_out_stamp = 6250;
const all_disappear_in_stamp = 9000;
const all_disappear_out_stamp = 10000;

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('intro');
    }

    create() {
        const screen_width = this.game.config.width as number;
        const screen_height = this.game.config.height as number;

        let amongusSound = this.sound.add('amongus')
        let oneSound = this.sound.add('one')

        let pentagon = this.add.polygon(
            0,
            0,
            [
                [0, -200],
                [-100, -80],
                [-60, 100],
                [60, 100],
                [100, -80],
            ],
            0xFF0000
        )
        pentagon.setOrigin(0, 0)
        pentagon.setPosition(296, screen_height / 2)
        pentagon.alpha = 0.0

        this.tweens.chain({
            targets: pentagon,
            tweens: [
                {
                    delay: pentagon_appear_in_stamp,
                    alpha: 1.0,
                    ease: Phaser.Math.Easing.Expo.In,
                    duration: (pentagon_appear_out_stamp - pentagon_appear_in_stamp)
                },
                {
                    delay: (all_disappear_in_stamp - pentagon_appear_out_stamp),
                    alpha: 0.0,
                    ease: Phaser.Math.Easing.Expo.Out,
                    duration: (all_disappear_out_stamp - all_disappear_in_stamp)
                }
            ]
        })

        let amongusText = this.add.text(
            0,
            0,
            "AMONG US",
            {
                fontSize: 96,
                fontFamily: "Impact",
                color: "#FFFFFF"
            }
        )
        amongusText.setOrigin(0.5, 0.5)
        amongusText.x = screen_width / 2
        amongusText.y = -amongusText.height

        this.tweens.chain({
            targets: amongusText,
            tweens: [
                {
                    delay: amongus_appear_in_stamp,
                    y: 96 + (amongusText.height / 2),
                    duration: (amongus_appear_out_stamp - amongus_appear_in_stamp),
                    onStart: () => amongusSound.play()
                },
                {
                    delay: (all_disappear_in_stamp - amongus_appear_out_stamp),
                    alpha: 0.0,
                    ease: Phaser.Math.Easing.Expo.Out,
                    duration: (all_disappear_out_stamp - all_disappear_in_stamp)
                }
            ]
        })

        let ellipse = this.add.ellipse(0, 0, 150, 75, 0xAABBFF)
        ellipse.setOrigin(0.5, 0.5)
        ellipse.x = 348
        ellipse.y = -ellipse.height

        this.tweens.chain({
            targets: ellipse,
            tweens: [
                {
                    delay: amongus_appear_in_stamp,
                    y: (screen_height / 2) - 80,
                    duration: (amongus_appear_out_stamp - amongus_appear_in_stamp)
                },
                {
                    delay: (all_disappear_in_stamp - amongus_appear_out_stamp),
                    alpha: 0.0,
                    ease: Phaser.Math.Easing.Expo.Out,
                    duration: (all_disappear_out_stamp - all_disappear_in_stamp)
                }
            ]
        })

        let oneText = this.add.text(
            0,
            0,
            "ONE",
            {
                fontSize: 144,
                fontFamily: "serif",
                color: "#FFFFFF"
            }
        )
        oneText.setOrigin(0.5, 0.5)
        oneText.x = screen_width / 2
        oneText.y = (screen_height - (oneText.height / 2)) - 96
        oneText.scale = 0.0
        oneText.angle = -180
        oneText.postFX.addGlow(0x00FFFF, 8, 1)

        this.tweens.chain({
            targets: oneText,
            tweens: [
                {
                    delay: one_appear_in_stamp,
                    scale: 1.0,
                    angle: 0.0,
                    duration: (one_appear_out_stamp - one_appear_in_stamp),
                    onStart: () => oneSound.play()
                },
                {
                    delay: (all_disappear_in_stamp - one_appear_out_stamp),
                    alpha: 0.0,
                    ease: Phaser.Math.Easing.Expo.Out,
                    duration: (all_disappear_out_stamp - all_disappear_in_stamp),
                    onComplete: () => this.scene.start('menu')
                }
            ]
        })
    }
}
