import {
  ComponentObjectPropsOptions,
  computed,
} from 'vue';

export function useModelWrapper(
  props: ComponentObjectPropsOptions,
  emit: Function,
  name = 'modelValue',
) {
  return computed({
    get: () => props[name],
    set: (value) => emit(`update:${name}`, value),
  });
}

export default {
  useModelWrapper,
};
