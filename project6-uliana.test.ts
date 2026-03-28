import { signal, computed, effect } from "./project6-uliana";

function assert(description: string, condition: boolean) {
  console.log(condition ? "PASS" : "FAIL", description);
}

//1
const count = signal(0);
assert("signal has correct initial value", count.value === 0);
count.value = 42;
assert("signal updates when written", count.value === 42);

//2
const base = signal(3);
const triple = computed(() => base.value * 3);
assert("computed has correct initial value", triple.value === 9);
base.value = 5;
assert("computed updates when signal changes", triple.value === 15);

//3
const name = signal("Ada");
const log: string[] = [];

effect(() => {
  log.push(name.value);
});

name.value = "Grace";
name.value = "Leon";

assert("effect ran on creation", log[0] === "Ada");
assert("effect re-ran on first change", log[1] === "Grace");
assert("effect re-ran on second change", log[2] === "Leon");
