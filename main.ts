controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (roblox.vy == 0) {
        roblox.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    game.gameOver(true)
})
let roblox: Sprite = null
scene.setBackgroundColor(9)
roblox = sprites.create(img`
    . . . . . . 6 6 6 . . . . . . . 
    . . . . 6 6 f 6 f 6 6 . . . . . 
    . . . 6 6 6 6 f 6 6 6 6 . . . . 
    6 6 6 6 6 f f 6 f f 6 6 6 6 6 . 
    6 6 6 6 6 6 f f f 6 6 6 6 6 6 6 
    6 . 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
    6 . 6 6 6 6 6 6 6 6 6 6 6 . 6 6 
    . . 6 6 6 6 6 6 6 6 6 6 6 . . . 
    . . d d . . . . . . . d d . . . 
    . . d d . . . . . . . d d . . . 
    . . d d . . . . . . . d d . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(roblox, 100, 0)
tiles.setCurrentTilemap(tilemap`level6`)
roblox.ay = 350
scene.cameraFollowSprite(roblox)
