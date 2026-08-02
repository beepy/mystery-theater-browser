import { onMounted, onUnmounted } from 'vue';

export function useCaptureKey(
  handler: (e: KeyboardEvent) => void,
  down = true,
  up = true
) {
  onMounted(() => {
    if (up) {
      document.addEventListener('keyup', handler);
    }
    if (down) {
      document.addEventListener('keydown', handler);
    }
  });
  onUnmounted(() => {
    if (up) {
      document.removeEventListener('keyup', handler);
    }
    if (down) {
      document.removeEventListener('keydown', handler);
    }
  });
}
