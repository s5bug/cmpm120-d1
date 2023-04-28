import 'phaser';
import LoadingScene from "./scene/loading.ts";
import CreditsScene from "./scene/credits.ts";
import CompanyScene from "./scene/company.ts";
import IntroScene from "./scene/intro.ts";
import MenuScene from "./scene/menu.ts";

const onReady: Promise<void> = new Promise(resolve => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        resolve()
    } else {
        document.addEventListener("DOMContentLoaded", () => resolve());
    }
})

class TtfFile extends Phaser.Loader.File {
    fontFamily: string
    ttfUrl: string
    fontObject: FontFace | undefined

    constructor(loader: Phaser.Loader.LoaderPlugin, family: string, url: string) {
        super(loader, { type: 'ttf', key: family, url: '' });
        this.fontFamily = family;
        this.ttfUrl = url;
    }

    load() {
        if (this.state === Phaser.Loader.FILE_POPULATED) {
            // @ts-ignore
            this.loader.nextFile(this, true);
        } else {
            this.fontObject = new FontFace(
                this.fontFamily,
                `url("${this.ttfUrl}")`
            )
            this.fontObject.load()
                .then(this.onLoad)
                // @ts-ignore
                .catch(() => this.loader.nextFile(this, false))
        }
    }

    // @ts-ignore
    onLoad(ff: FontFace) {
        document.fonts.add(ff)
        // @ts-ignore
        this.loader.nextFile(this, true);
    }
}

class TtfFilePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('ttf', this.ttfFileCallback)
    }

    ttfFileCallback(family: string, url: string) {
        // @ts-ignore
        this.addFile(new TtfFile(this, family, url))
        return this
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    plugins: {
        global: [
            { key: 'TtfFilePlugin', plugin: TtfFilePlugin, start: true }
        ]
    },
    width: 1600,
    height: 900,
    parent: 'app',
    scene: [LoadingScene, CreditsScene, CompanyScene, IntroScene, MenuScene],
}

declare global {
    interface Window { game: Phaser.Game }
}

onReady.then(() => {
    window.game = new Phaser.Game(config)
})
