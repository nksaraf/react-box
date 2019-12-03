const [state, setState] = React.useState("a");

<Box
  variants={{ a: { left: 0 }, b: { left: 100 } }}
  cursor="pointer"
  position="relative"
  onTap={() => setState(state => (state == "a" ? "b" : "a"))}
  animate={state}
>
  Hello World!
</Box>
