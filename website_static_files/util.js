function clamp(number, max, min) {
    return Math.max(Math.min(number, max), min)
}

function calculateDesiredMotion(axes) {
    var turn = axes[0].toFixed(3);
    var forward = -1 * axes[1].toFixed(3);
    var strafe = axes[2].toFixed(3);
    var vertical = -1 * axes[3].toFixed(3);
    return {
        thrustVector: [strafe, forward, vertical], // vector in the form [x,y,z]
        turnRate: turn,
    }
}
