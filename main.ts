namespace SpriteKind {
    export const coin = SpriteKind.create()
    export const beehive = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (roblox.vy == 0) {
        roblox.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.beehive, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    bee = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    bee,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . f 1 1 1 f 1 1 1 f . . . . 
        . . . f 1 1 1 f 1 1 1 f . . . . 
        . . . f 1 1 1 1 1 1 1 f . . . . 
        . . . . . 1 1 f 1 1 . . . . . . 
        . . . f f f f f f f f f . . . . 
        . . f 5 5 5 5 f 5 5 5 5 f . . . 
        . . f f 5 5 5 f 5 5 5 f f . . . 
        . . f f 5 5 5 f 5 5 5 f f . . . 
        . . f 5 5 5 5 f 5 5 5 5 f . . . 
        . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . f f f f f f f f f . . . . 
        . . . 5 5 5 5 f 5 5 5 5 . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . 5 5 5 5 f 5 5 5 5 . . . . 
        . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . f f f f f f f f f f f . . . 
        . . f 1 1 1 1 f 1 1 1 1 f . . . 
        . . f 1 1 1 1 f 1 1 1 1 f . . . 
        . . f 1 1 1 1 1 1 1 1 1 f . . . 
        . . f 1 1 1 1 f 1 1 1 1 f . . . 
        . . f f f f f f f f f f f . . . 
        . . . f f f f f f f f f . . . . 
        . . . 5 5 5 5 f 5 5 5 5 . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . f 5 5 5 f 5 5 5 f . . . . 
        . . . 5 5 5 5 f 5 5 5 5 . . . . 
        . . . f f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    250,
    true
    )
    bee.setPosition(roblox.x + 80, roblox.y + 80)
    bee.follow(roblox)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(bee)
})
let bee: Sprite = null
let beehive: Sprite = null
let coin: Sprite = null
let roblox: Sprite = null
scene.setBackgroundColor(9)
roblox = sprites.create(img`
    . . . f f f f f f f f . . . . . 
    . . . f f 6 6 6 6 f f . . . . . 
    . . f f 6 6 6 6 6 6 f . . . . . 
    . . f f 6 f 6 6 f 6 f b b . . . 
    . . f 6 6 6 6 6 6 6 6 f b b . . 
    . . . 6 6 6 6 6 6 f 6 6 6 b b . 
    . . . 6 6 f f f f 6 6 . 6 6 b . 
    . . . 6 6 6 6 6 6 6 6 . . 6 6 . 
    . . . 6 6 6 6 6 6 6 6 . . . . . 
    . . . d d d . . d d d . . . . . 
    . . . d d d . . d d d . . . . . 
    . . . d d d . . d d d . . . . . 
    . . . d d d . . d d d . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(roblox, 100, 0)
tiles.setCurrentTilemap(tilemap`level6`)
roblox.ay = 350
scene.cameraFollowSprite(roblox)
for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
    coin = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . 5 4 4 4 4 4 4 4 5 . . . . 
        . . 5 4 4 4 4 4 4 4 4 4 5 . . . 
        . 5 4 4 4 4 5 5 5 4 4 4 4 5 . . 
        . 5 4 5 4 4 4 4 4 4 4 4 4 5 . . 
        . 5 4 5 4 4 4 4 4 4 4 4 4 5 . . 
        . 5 4 5 4 4 4 4 4 4 4 4 4 5 . . 
        . 5 4 5 4 4 4 4 4 4 4 4 4 5 . . 
        . 5 4 4 4 4 4 4 4 4 4 4 4 5 . . 
        . 5 4 4 4 5 5 5 5 5 4 4 4 5 . . 
        . . 5 4 4 4 4 4 4 4 4 4 5 . . . 
        . . . 5 4 4 4 4 4 4 4 5 . . . . 
        . . . . 5 5 5 5 5 5 5 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.coin)
    animation.runImageAnimation(
    coin,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . f 5 . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . f 5 5 5 5 5 5 5 f . . . . 
        . . f 5 5 4 4 4 4 4 5 5 f . . . 
        . . f 5 5 5 5 5 5 5 5 5 f . . . 
        . . f 5 4 5 5 5 5 5 5 5 f . . . 
        . . f 5 4 5 5 5 5 5 5 5 f . . . 
        . . f 5 4 5 5 5 5 5 5 5 f . . . 
        . . f 5 4 5 5 5 5 5 5 5 f . . . 
        . . f 5 5 5 4 4 5 5 5 5 f . . . 
        . . . f 5 5 5 5 5 5 5 f . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f 5 5 5 5 5 f . . . . . 
        . . . f 5 5 4 4 4 5 5 f . . . . 
        . . . f 5 5 5 5 5 5 5 f . . . . 
        . . . f 5 4 5 5 5 5 5 f . . . . 
        . . . f 5 4 5 5 5 5 5 f . . . . 
        . . . f 5 4 5 5 5 5 5 f . . . . 
        . . . f 5 4 5 5 5 5 5 f . . . . 
        . . . f 5 5 4 4 5 5 5 f . . . . 
        . . . . f 5 5 5 5 5 f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . f 5 5 4 5 f . . . . . 
        . . . . . f 5 5 5 5 f . . . . . 
        . . . . . f 5 4 5 5 f . . . . . 
        . . . . . f 5 4 5 5 f . . . . . 
        . . . . . f 5 4 5 5 f . . . . . 
        . . . . . f 5 4 5 5 f . . . . . 
        . . . . . f 5 5 5 5 f . . . . . 
        . . . . . . f 5 5 f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    true
    )
    tiles.placeOnTile(coin, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        beehive = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . 5 5 5 . . . . . . . 
            . . . . . 5 5 5 5 5 . . . . . . 
            . . . . 5 5 5 5 5 5 5 . . . . . 
            . . . . 5 5 5 5 5 5 5 . . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . . 5 5 5 5 5 5 5 5 5 . . . . 
            . . 5 5 5 5 4 4 4 5 5 5 5 . . . 
            . . 5 5 5 5 4 . 4 5 5 5 5 . . . 
            . . 5 5 5 4 . . . 4 5 5 5 . . . 
            . . 5 5 5 4 . . . 4 5 5 5 . . . 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 . . 
            `, SpriteKind.beehive)
        tiles.placeOnTile(beehive, value)
        music.play(music.stringPlayable("F G A G E F G E ", 120), music.PlaybackMode.LoopingInBackground)
        tiles.setTileAt(value, assets.tile`transparency16`)
        music.play(music.stringPlayable("G E C A F E D F ", 120), music.PlaybackMode.LoopingInBackground)
        info.setLife(3)
    }
}
game.onUpdate(function () {
    roblox.setImage(img`
        . . . f f f f f f f f . . . . . 
        . . . f f 6 6 6 6 f f . . . . . 
        . . f f 6 6 6 6 6 6 f . . . . . 
        . . f f 6 f 6 6 f 6 f b b . . . 
        . . f 6 6 6 6 6 6 6 6 f b b . . 
        . . . 6 6 6 6 6 6 f 6 6 6 b b . 
        . . . 6 6 f f f f 6 6 . 6 6 b . 
        . . . 6 6 6 6 6 6 6 6 . . 6 6 . 
        . . . 6 6 6 6 6 6 6 6 . . . . . 
        . . . d d d . . d d d . . . . . 
        . . . d d d . . d d d . . . . . 
        . . . d d d . . d d d . . . . . 
        . . . d d d . . d d d . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    if (roblox.vx < 0) {
        roblox.image.flipX()
    }
})
