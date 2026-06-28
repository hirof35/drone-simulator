import type { DroneState } from './drone';
import { updateDrone } from './drone';
const canvas = document.getElementById('stage') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// ドローンの初期状態
const drone: DroneState = { x: 300, y: 350, vx: 0, vy: 0, angle: 0 };
const keys: Record<string, boolean> = {};

// キーボードイベントの登録
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

// ループ処理
function loop() {
  // 物理演算の更新
  updateDrone(drone, keys);

  // 画面のクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ドローンの描画
  ctx.save();
  ctx.translate(drone.x, drone.y);
  ctx.rotate(drone.angle);

  // 機体の中心
  ctx.fillStyle = '#00ffcc';
  ctx.fillRect(-20, -5, 40, 10);
  // 左プロペラ
  ctx.fillStyle = '#ff3366';
  ctx.fillRect(-25, -12, 10, 4);
  // 右プロペラ
  ctx.fillRect(15, -12, 10, 4);

  ctx.restore();

  requestAnimationFrame(loop);
}

// ゲームスタート
loop();