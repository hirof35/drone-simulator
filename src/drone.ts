export interface DroneState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    angle: number;
  }
  
  export function updateDrone(drone: DroneState, keys: Record<string, boolean>) {
    const GRAVITY = 0.08;
    const THRUST_ACCEL = 0.18;
    const TILT_SPEED = 0.04;
    const DAMPING = 0.98;
  
    if (keys['ArrowLeft'] || keys['a']) drone.angle -= TILT_SPEED;
    if (keys['ArrowRight'] || keys['d']) drone.angle += TILT_SPEED;
  
    if (keys['ArrowUp'] || keys['w']) {
      drone.vx += Math.sin(drone.angle) * THRUST_ACCEL;
      drone.vy += -Math.cos(drone.angle) * THRUST_ACCEL;
    }
  
    drone.vy += GRAVITY;
    drone.vx *= DAMPING;
    drone.vy *= DAMPING;
  
    drone.x += drone.vx;
    drone.y += drone.vy;
  
    // 地面（高さ400px）と壁の簡単な衝突判定
    if (drone.y > 380) { drone.y = 380; drone.vy = 0; drone.vx *= 0.9; }
    if (drone.x < 10) { drone.x = 10; drone.vx = 0; }
    if (drone.x > 590) { drone.x = 590; drone.vx = 0; }
  }