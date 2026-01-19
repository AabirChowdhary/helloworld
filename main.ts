namespace SpriteKind {
    export const coin = SpriteKind.create()
    export const beehive = SpriteKind.create()
    export const fireball = SpriteKind.create()
    export const diamond = SpriteKind.create()
    export const playerFireball = SpriteKind.create()
    export const powerUp = SpriteKind.create()
    export const UI = SpriteKind.create()
}
// SHOOT FIREBALL (direction-based + cooldown + upgrade)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(roblox) || !(canShoot)) {
        return
    }
    canShoot = false
    pause(300)
    canShoot = true
    direction = 1
    if (controller.left.isPressed()) {
        direction = -1
    }
    if (controller.right.isPressed()) {
        direction = 1
    }
    let projectileImage = fireballLevel == 1 ? img`
        . . . . . . . . 
        . . 2 2 2 2 . . 
        . 2 4 5 5 4 2 . 
        . 2 5 5 5 5 2 . 
        . 2 4 5 5 4 2 . 
        . . 2 2 2 2 . . 
        . . . . . . . . 
        . . . . . . . . 
    ` : img`
        . . . . . . . . 
        . 4 4 4 4 4 4 . 
        4 5 5 5 5 5 5 4 
        4 5 9 9 9 9 5 4 
        4 5 9 9 9 9 5 4 
        4 5 5 5 5 5 5 4 
        . 4 4 4 4 4 4 . 
        . . . . . . . . 
    `
let speed = fireballLevel == 1 ? 150 : 250
fb = sprites.createProjectileFromSprite(projectileImage, roblox, speed * direction, 0)
    fb.setKind(SpriteKind.playerFireball)
    fb.startEffect(effects.fire)
})
// Jump
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (roblox && roblox.vy == 0) {
        roblox.vy = -150
    }
})
// Lose tile
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    game.gameOver(false)
})
// Coin pickup
sprites.onOverlap(SpriteKind.Player, SpriteKind.coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
})
// Next level tile
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    current_level += 1
    startLevel()
})
// Player fireball destroys beehives
sprites.onOverlap(SpriteKind.playerFireball, SpriteKind.beehive, function (proj, hive) {
    sprites.destroy(hive, effects.ashes, 200)
    sprites.destroy(proj)
})
// RESET GAME (Menu button)
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    game.reset()
})
// Life zero
info.onLifeZero(function () {
    game.setGameOverEffect(false, effects.dissolve)
    game.gameOver(false)
})
// Spawn power-up
function spawnPowerUp () {
    for (let tile of tiles.getTilesByType(assets.tile`myTile10`)) {
        p = sprites.create(img`
            . . . . . . . . 
            . . 9 9 9 9 . . 
            . 9 9 5 5 9 9 . 
            9 5 5 5 5 5 5 9 
            9 5 5 5 5 5 5 9 
            . 9 9 5 5 9 9 . 
            . . 9 9 9 9 . . 
            . . . . . . . . 
            `, SpriteKind.powerUp)
        tiles.placeOnTile(p, tile)
        tiles.setTileAt(tile, assets.tile`transparency16`)
    }
}
// Beehive overlap → spawn bee
sprites.onOverlap(SpriteKind.Player, SpriteKind.beehive, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    bee = sprites.create(img`
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
        `, SpriteKind.Enemy)
    bee.setPosition(roblox.x + 80, roblox.y + 80)
    bee.follow(roblox)
})
// Enemy fireball hit
sprites.onOverlap(SpriteKind.Player, SpriteKind.fireball, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    sprites.destroy(otherSprite)
})
// Player fireball destroys enemies
sprites.onOverlap(SpriteKind.playerFireball, SpriteKind.Enemy, function (proj, enemy) {
    sprites.destroy(enemy, effects.disintegrate, 200)
    sprites.destroy(proj)
})
// Main level setup
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.coin)
    sprites.destroyAllSpritesOfKind(SpriteKind.beehive)
    sprites.destroyAllSpritesOfKind(SpriteKind.fireball)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.powerUp)
    // Create player
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
    roblox.ay = 350
    scene.cameraFollowSprite(roblox)
    // Create fireball indicator once
    if (!(fireballIndicator)) {
        fireballIndicator = sprites.create(img`
            . . 2 2 2 2 . . 
            . 2 4 5 5 4 2 . 
            2 5 5 5 5 5 5 2 
            2 5 5 5 5 5 5 2 
            . 2 4 5 5 4 2 . 
            . . 2 2 2 2 . . 
            . . . . . . . . 
            . . . . . . . . 
            `, SpriteKind.UI)
        fireballIndicator.setFlag(SpriteFlag.RelativeToCamera, true)
        fireballIndicator.setPosition(20, 20)
    }
    // Choose tilemap
    if (current_level == 0) {
        tiles.setCurrentTilemap(tilemap`level6`)
    } else if (current_level == 1) {
        tiles.setCurrentTilemap(tilemap`level0`)
    } else {
        game.setGameOverEffect(true, effects.confetti)
        game.gameOver(true)
        return
    }
    // Place player
    for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    tiles.placeOnRandomTile(roblox, assets.tile`myTile8`)
    // Spawn coins
    for (let value2 of tiles.getTilesByType(assets.tile`myTile6`)) {
        coin2 = sprites.create(img`
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
        tiles.placeOnTile(coin2, value2)
        tiles.setTileAt(value2, assets.tile`transparency16`)
    }
    // Spawn beehives
    for (let value3 of tiles.getTilesByType(assets.tile`myTile7`)) {
        beehive2 = sprites.create(img`
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
        tiles.placeOnTile(beehive2, value3)
        tiles.setTileAt(value3, assets.tile`transparency16`)
    }
    // Spawn enemy fireballs
    for (let value4 of tiles.getTilesByType(assets.tile`myTile9`)) {
        fireball2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . 5 . . . . . . . . 5 . . 5 . 
            . . . . 2 . 4 4 . . . . . . . . 
            . 5 . . . . . . . 4 . 4 . . . . 
            . . . 4 . . 4 4 4 . . . . 2 . 5 
            . . . . . 4 4 2 4 4 . 5 . . . . 
            . 2 . . 4 4 2 2 2 4 4 . . 4 . . 
            4 . . 4 4 2 5 5 5 2 4 4 . . 2 . 
            4 4 . 4 4 2 5 2 5 2 4 4 . . . . 
            . . . 4 4 2 5 5 5 2 4 4 . 4 . . 
            5 . . 4 4 2 2 2 2 2 4 4 . . . . 
            2 2 . . 4 4 4 2 4 4 4 . . . . . 
            . . . . . 4 4 4 4 4 . 5 . 4 . . 
            . . 4 . . . . . . . . . . . . . 
            5 . . . 4 . . 4 . . 4 . . 5 . . 
            . . 5 . . . . . . 5 . . 5 5 . 5 
            `, SpriteKind.fireball)
        tiles.placeOnTile(fireball2, value4)
        tiles.setTileAt(value4, assets.tile`transparency16`)
        animation.runMovementAnimation(
        fireball2,
        animation.animationPresets(animation.bobbing),
        5000,
        true
        )
        fireball2.startEffect(effects.fire)
    }
    // Spawn power-up
    spawnPowerUp()
}
// Power-up collection
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerUp, function (player2, p) {
    sprites.destroy(p, effects.hearts, 200)
    fireballLevel = 2
    music.powerUp.play()
    fireballIndicator.setImage(img`
        . 4 4 4 4 4 4 . 
        4 5 5 5 5 5 5 4 
        4 5 9 9 9 9 5 4 
        4 5 9 9 9 9 5 4 
        4 5 5 5 5 5 5 4 
        . 4 4 4 4 4 4 . 
        . . . . . . . . 
        . . . . . . . . 
        `)
})
// Bee hit
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(bee)
    info.changeLifeBy(-1)
})
let fireball2: Sprite = null
let beehive2: Sprite = null
let coin2: Sprite = null
let fireballIndicator: Sprite = null
let bee: Sprite = null
let p: Sprite = null
let current_level = 0
let fb: Sprite = null
let direction = 0
let roblox: Sprite = null
let fireballLevel = 0
let canShoot = false
canShoot = true
fireballLevel = 1
// Background, life, music, start
scene.setBackgroundColor(9)
info.setLife(3)
music.play(music.stringPlayable("F G A G E F G E ", 120), music.PlaybackMode.LoopingInBackground)
startLevel()
