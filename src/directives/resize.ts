export declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);

  disconnect: () => void;

  observe: (target: Element, options?: ResizeObserverObserveOptions) => void;

  unobserve: (target: Element) => void;
}

export interface ResizeObserverObserveOptions {
  box?: 'content-box' | 'border-box';
}

export type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) => void;

export interface ResizeObserverEntry {
  readonly borderBoxSize: ResizeObserverEntryBoxSize;
  readonly contentBoxSize: ResizeObserverEntryBoxSize;
  readonly contentRect: DOMRectReadOnly;
  readonly target: Element;
}

interface ResizeObserverEntryBoxSize {
  blockSize: number;
  inlineSize: number;
}

const observe = (el: Element) => {
  const resizeObserver = new ResizeObserver(
    (entries: ResizeObserverEntry[]): void => {
      const [entry] = entries;
      const { width, height } = entry.contentRect;
      const event = new CustomEvent('resize', {
        detail: {
          height,
          width,
        },
      });
      el.dispatchEvent(event);
    },
  );
  resizeObserver.observe(el);
};

const Resize = {
  beforeMount(el: Element) {
    observe(el);
  },
};

export default Resize;
