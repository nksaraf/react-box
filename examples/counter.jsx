const [counter, setCounter] = React.useState(0);
const incrementCounter = () => setCounter(counter => counter + 1);

<Box cursor="pointer" onTap={incrementCounter}>
  Hello World! You are at step {counter}. Tap/Click to move ahead.
</Box>