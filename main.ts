function Turn_left () {
    wuKong.setAllMotor(0, -80)
}
function Turn_right () {
    wuKong.setAllMotor(-80, 0)
}
function Go_forward () {
    wuKong.setAllMotor(-100, -100)
}
input.onButtonPressed(Button.A, function () {
    if (isGoing) {
        Stop()
    } else {
        Go()
    }
})
function StopMoving () {
    wuKong.setAllMotor(0, 0)
}
function Go () {
    isGoing = true
    basic.showLeds(`
        . # . . .
        . # # . .
        . # # # .
        . # # . .
        . # . . .
        `)
}
function Stop () {
    isGoing = false
    basic.showLeds(`
        . . . . .
        # # . # #
        # # . # #
        # # . # #
        . . . . .
        `)
}
let isGoing = false
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
Stop()
basic.forever(function () {
    if (isGoing) {
        if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P2) == 0) {
            Go_forward()
        } else if (pins.digitalReadPin(DigitalPin.P1) == 0 && pins.digitalReadPin(DigitalPin.P2) == 1) {
            Turn_right()
        } else if (pins.digitalReadPin(DigitalPin.P1) == 1 && pins.digitalReadPin(DigitalPin.P2) == 0) {
            Turn_left()
        }
    } else {
        StopMoving()
    }
})
