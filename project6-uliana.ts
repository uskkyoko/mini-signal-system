export { signal, computed, effect };

let currentListener: (() => void) | null = null;

function signal<T>(initial: T) {
  let _value = initial;
  const subscribers = new Set<() => void>();

  return {
    get value(): T {
      if (currentListener) subscribers.add(currentListener);
      return _value;
    },
    set value(newValue: T) {
      _value = newValue;
      for (const sub of [...subscribers]) sub();
    },
  };
}

function computed<T>(fn: () => T) {
  const result = signal<T>(undefined as unknown as T);

  function runner() {
    const prev = currentListener;
    currentListener = runner;
    result.value = fn();
    currentListener = prev;
  }

  runner();

  return {
    get value(): T {
      return result.value;
    },
  };
}

function effect(fn: () => void) {
  function runner() {
    const prev = currentListener;
    currentListener = runner;
    fn();
    currentListener = prev;
  }
  runner();
}
