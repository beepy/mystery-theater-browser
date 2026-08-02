import { ref, onMounted } from 'vue';

export function useIsMac() {
  const isMac = ref(undefined as boolean | undefined);

  onMounted(() => {
    isMac.value = navigator.userAgent.includes('Mac');
  });
  return { isMac };
}
