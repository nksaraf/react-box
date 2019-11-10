// import { CSSProperties } from 'react';
// import { DetailedHTMLFactory } from 'react';
// import { Easing as Easing_2 } from '@popmotion/easing';
// import { FunctionComponent } from 'react';
// import { HTMLAttributes } from 'react';
// import * as React from 'react';
// import { ReactElement } from 'react';
// import { ReactHTML } from 'react';
// import { ReactNode } from 'react';
// import { Ref } from 'react';
// import { RefObject } from 'react';

declare type Easing_2 = (v: number) => number;

declare type SpringProps = {
    from?: number;
    to?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    velocity?: number;
    restSpeed?: number;
    restDelta?: number;
};

declare type SpringInterface = {
    stop: () => void;
};

/**
 * The `AnimatePresence` component enables the use of the `exit` prop to animate components
 * when they're removed from the component tree.
 *
 * When adding/removing more than a single child component, every component
 * **must** be given a unique `key` prop.
 *
 * You can propagate exit animations throughout a tree by using variants.
 *
 * @library
 *
 * You can use any component(s) within `AnimatePresence`, but the first `Frame` in each should
 * have an `exit` property defined.
 *
 * ```jsx
 * import { Frame, AnimatePresence } from 'framer'
 *
 * // As items are added and removed from `items`
 * export function Items({ items }) {
 *   return (
 *     <AnimatePresence>
 *       {items.map(item => (
 *         <Frame
 *           key={item.id}
 *           initial={{ opacity: 0 }}
 *           animate={{ opacity: 1 }}
 *           exit={{ opacity: 0 }}
 *         />
 *       ))}
 *     </AnimatePresence>
 *   )
 * }
 * ```
 *
 * @motion
 *
 * You can use any component(s) within `AnimatePresence`, but the first `motion` component in each should
 * have an `exit` property defined.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * @public
 */
declare const AnimatePresence: React.FunctionComponent<AnimatePresenceProps>;

/**
 * @public
 */
declare interface AnimatePresenceProps {
    /**
     * By passing `initial={false}`, `AnimatePresence` will disable any initial animations on children
     * that are present when the component is first rendered.
     *
     * @library
     *
     * ```jsx
     * <AnimatePresence initial={false}>
     *   {isVisible && (
     *     <Frame
     *       key="modal"
     *       initial={{ opacity: 0 }}
     *       animate={{ opacity: 1 }}
     *       exit={{ opacity: 0 }}
     *     />
     *   )}
     * </AnimatePresence>
     * ```
     *
     * @motion
     *
     * ```jsx
     * <AnimatePresence initial={false}>
     *   {isVisible && (
     *     <motion.div
     *       key="modal"
     *       initial={{ opacity: 0 }}
     *       animate={{ opacity: 1 }}
     *       exit={{ opacity: 0 }}
     *     />
     *   )}
     * </AnimatePresence>
     * ```
     *
     * @public
     */
    initial?: boolean;
    /**
     * When a component is removed, there's no longer a chance to update its props. So if a component's `exit`
     * prop is defined as a dynamic variant and you want to pass a new `custom` prop, you can do so via `AnimatePresence`.
     * This will ensure all leaving components animate using the latest data.
     *
     * @public
     */
    custom?: any;
    /**
     * Fires when all exiting nodes have completed animating out.
     *
     * @public
     */
    onExitComplete?: () => void;
    /**
     * `AnimatePresence` locally re-renders its children once exit animations are
     * complete. This means that if surrounding or parent components are also set to `positionTransition`,
     * they aren't informed of updates to the layout when they happen asynchronous to a render.
     *
     * This prop allows `AnimatePresence` to trigger re-renders at a higher level, so more
     * components can be made aware of the layout change and animate accordingly.
     *
     * In this example, the both the parent and sibling will animate to their new layout
     * once the div within `AnimatePresence` has finished animating:
     *
     * ```jsx
     * const MyComponent = ({ isVisible }) => {
     *   const forceUpdate = useForceUpdate() // Forces a set state or something
     *
     *   return (
     *     <motion.div positionTransition>
     *       <AnimatePresence _syncLayout={forceUpdate}>
     *         <motion.div positionTransition exit={{ opacity: 0 }} />
     *       </AnimatePresence>
     *       <motion.div positionTransition />
     *     </motion.div>
     *   )
     * }
     * ```
     *
     * In the final implementation `syncLayout` might be better as a component
     * that provides this function to children via context, or some other method
     * that obfuscates
     *
     * This isn't generally a problem for most use-cases but this capability will be useful
     * for advanced uses but also more so for phase 2 of `sizeTransition`, as we'd gain the power
     * to declaratively relayout entire parts of the page using only performant transforms.
     *
     * @internal
     */
    _syncLayout?: () => void;
    /**
     * If set to `true`, `AnimatePresence` will only render one component at a time. The exiting component
     * will finished its exit animation before the entering component is rendered.
     *
     * @library
     *
     * ```jsx
     * function MyComponent({ currentItem }) {
     *   return (
     *     <AnimatePresence exitBeforeEnter>
     *       <Frame key={currentItem} exit={{ opacity: 0 }} />
     *     </AnimatePresence>
     *   )
     * }
     * ```
     *
     * @motion
     *
     * ```jsx
     * const MyComponent = ({ currentItem }) => (
     *   <AnimatePresence exitBeforeEnter>
     *     <motion.div key={currentItem} exit={{ opacity: 0 }} />
     *   </AnimatePresence>
     * )
     * ```
     *
     * @beta
     */
    exitBeforeEnter?: boolean;
}

/**
 * Control animations on one or more components.
 *
 * @public
 */
declare class AnimationControls {
    /**
     * Track whether the host component has mounted.
     *
     * @internal
     */
    private hasMounted;
    /**
     * A default `Transition` to set on linked components.
     *
     * @internal
     */
    private defaultTransition;
    /**
     * Pending animations that are started before a component is mounted.
     *
     * @internal
     */
    private pendingAnimations;
    /**
     * A collection of linked component animation controls.
     *
     * @internal
     */
    private componentControls;
    /**
     * A map of variants that can be later referenced via `start(variantLabel)`
     *
     * @internal
     */
    private variants;
    /**
     * Set variants on this and all child components.
     *
     * @param variants - The variants to set
     *
     * @internal
     */
    setVariants(variants: Variants): void;
    /**
     * Set a default transition on this and all child components
     *
     * @param transition - The default transition to set
     *
     * @internal
     */
    setDefaultTransition(transition: Transition): void;
    /**
     * Subscribes a component's animation controls to this.
     *
     * @param controls - The controls to subscribe
     * @returns An unsubscribe function.
     *
     * @internal
     */
    subscribe(controls: ValueAnimationControls): () => boolean;
    /**
     * Starts an animation on all linked components.
     *
     * @remarks
     *
     * ```jsx
     * controls.start("variantLabel")
     * controls.start({
     *   x: 0,
     *   transition: { duration: 1 }
     * })
     * ```
     *
     * @param definition - Properties or variant label to animate to
     * @param transition - Optional `transtion` to apply to a variant
     * @returns - A `Promise` that resolves when all animations have completed.
     *
     * @public
     */
    start(definition: AnimationDefinition, transitionOverride?: Transition): Promise<any>;
    /**
     * Instantly set to a set of properties or a variant.
     *
     * ```jsx
     * // With properties
     * controls.set({ opacity: 0 })
     *
     * // With variants
     * controls.set("hidden")
     * ```
     *
     * @internalremarks
     * We could perform a similar trick to `.start` where this can be called before mount
     * and we maintain a list of of pending actions that get applied on mount. But the
     * expectation of `set` is that it happens synchronously and this would be difficult
     * to do before any children have even attached themselves. It's also poor practise
     * and we should discourage render-synchronous `.start` calls rather than lean into this.
     *
     * @public
     */
    set(definition: VariantLabels | TargetAndTransition): void;
    /**
     * Stops animations on all linked components.
     *
     * ```jsx
     * controls.stop()
     * ```
     *
     * @public
     */
    stop(): void;
    /**
     * Initialises the animation controls.
     *
     * @internal
     */
    mount(): void;
    /**
     * Stops all child animations when the host component unmounts.
     *
     * @internal
     */
    unmount(): void;
}

/**
 * @internal
 */
declare const animationControls: () => AnimationControls;

declare type AnimationDefinition = VariantLabels | TargetAndTransition | TargetResolver;

declare type AnimationOptions = {
    delay?: number;
    priority?: number;
    transitionOverride?: Transition;
};

/**
 * @public
 */
declare interface AnimationProps {
    /**
     * Values to animate to, variant label(s), or `AnimationControls`.
     *
     * @library
     *
     * ```jsx
     * // As values
     * <Frame animate={{ opacity: 1 }} />
     *
     * // As variant
     * <Frame animate="visible" variants={variants} />
     *
     * // Multiple variants
     * <Frame animate={["visible", "active"]} variants={variants} />
     *
     * // AnimationControls
     * <Frame animate={animation} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * // As values
     * <motion.div animate={{ opacity: 1 }} />
     *
     * // As variant
     * <motion.div animate="visible" variants={variants} />
     *
     * // Multiple variants
     * <motion.div animate={["visible", "active"]} variants={variants} />
     *
     * // AnimationControls
     * <motion.div animate={animation} />
     * ```
     */
    animate?: AnimationControls | TargetAndTransition | VariantLabels;
    /**
     * A target to animate to when this component is removed from the tree.
     *
     * This component **must** be the first animatable child of an `AnimatePresence` to enable this exit animation.
     *
     * This limitation exists because React doesn't allow components to defer unmounting until after
     * an animation is complete. Once this limitation is fixed, the `AnimatePresence` component will be unnecessary.
     *
     * @library
     *
     * ```jsx
     * import { Frame, AnimatePresence } from 'framer'
     *
     * export function MyComponent(props) {
     *   return (
     *     <AnimatePresence>
     *        {props.isVisible && (
     *          <Frame
     *            initial={{ opacity: 0 }}
     *            animate={{ opacity: 1 }}
     *            exit={{ opacity: 0 }}
     *          />
     *        )}
     *     </AnimatePresence>
     *   )
     * }
     * ```
     *
     * @motion
     *
     * ```jsx
     * import { AnimatePresence, motion } from 'framer-motion'
     *
     * export const MyComponent = ({ isVisible }) => {
     *   return (
     *     <AnimatePresence>
     *        {isVisible && (
     *          <motion.div
     *            initial={{ opacity: 0 }}
     *            animate={{ opacity: 1 }}
     *            exit={{ opacity: 0 }}
     *          />
     *        )}
     *     </AnimatePresence>
     *   )
     * }
     * ```
     */
    exit?: TargetAndTransition | VariantLabels;
    /**
     * Variants allow you to define animation states and organise them by name. They allow
     * you to control animations throughout a component tree by switching a single `animate` prop.
     *
     * Using `transition` options like `delayChildren` and `staggerChildren`, you can orchestrate
     * when children animations play relative to their parent.
     *
     * @library
     *
     * After passing variants to one or more `Frame`'s `variants` prop, these variants
     * can be used in place of values on the `animate`, `initial`, `whileTap` and `whileHover` props.
     *
     * ```jsx
     * const variants = {
     *   active: {
     *     backgroundColor: "#f00"
     *   },
     *   inactive: {
     *     backgroundColor: "#fff",
     *     transition: { duration: 2 }
     *   }
     * }
     *
     * <Frame variants={variants} animate="active" />
     * ```
     *
     * @motion
     *
     * After passing variants to one or more `motion` component's `variants` prop, these variants
     * can be used in place of values on the `animate`, `initial`, `whileTap` and `whileHover` props.
     *
     * ```jsx
     * const variants = {
     *   active: {
     *       backgroundColor: "#f00"
     *   },
     *   inactive: {
     *     backgroundColor: "#fff",
     *     transition: { duration: 2 }
     *   }
     * }
     *
     * <motion.div variants={variants} animate="active" />
     * ```
     */
    variants?: Variants;
    /**
     * Default transition. If no `transition` is defined in `animate`, it will use the transition defined here.
     *
     * @library
     *
     * ```jsx
     * const spring = {
     *   type: "spring",
     *   damping: 10,
     *   stiffness: 100
     * }
     *
     * <Frame transition={spring} animate={{ scale: 1.2 }} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * const spring = {
     *   type: "spring",
     *   damping: 10,
     *   stiffness: 100
     * }
     *
     * <motion.div transition={spring} animate={{ scale: 1.2 }} />
     * ```
     */
    transition?: Transition;
    /**
     * @library
     *
     * When a `Frame` is the child of a `Stack`, the `Stack` is responsible for its layout. This makes it harder
     * for us to know when a `Frame`'s position changes within the `Stack` and make it animate to its new position.
     *
     * By adding `positionTransition` to a `Frame`, it'll automatically animate to its new position in the `Stack`,
     * whether the `Stack` layout has changed or the `Frame` has changed its order within it.
     *
     * It can either be set as a `Transition`, or just `true` to use the default layout transition.
     *
     * ```jsx
     * function MyComponent({ distribution = "space-around" }) {
     *   const spring = {
     *     type: "spring",
     *     damping: 10,
     *     stiffness: 100
     *   }
     *
     *   return (
     *     <Stack distribution={distribution}>
     *       <Frame layoutTransition={spring} />
     *     </Stack>
     *   )
     * }
     * ```
     *
     * @motion
     *
     * If `positionTransition` is defined on a `motion` component, it will automatically animate any changes to its layout
     * using a performant `x`/`y` transform.
     *
     * `positionTransition` can either be set as a `Transition`, or just `true` to use the default position transition, which is a snappy spring.
     *
     * It can also be set as a function that will resolve when the component has changed layout. This function
     * should return either a `Transition`, or `true`. For advanced use-cases where you want the component
     * to visually stay in its previous position, this function can also return `false`. This function will receive
     * the `delta` of the changed layout.
     *
     * ```jsx
     * const spring = {
     *   type: "spring",
     *   damping: 10,
     *   stiffness: 100
     * }
     *
     * // This component will animate position when `isVisible` is toggled.
     * const MyComponent = ({ isOpen }) => {
     *   return (
     *     <motion.div positionTransition={spring} style={{ left: isOpen ? 0 : 100 }} />
     *   )
     * }
     *
     * // This component will animate items to their new position if its place in `items` changes order.
     * const MyComponent = ({ items }) => {
     *   return items.map((item) => (
     *     <motion.div key={item.id} positionTransition={spring} />
     *   ))
     * }
     * ```
     *
     * @public
     */
    positionTransition?: Transition | boolean | ResolveLayoutTransition;
    /**
     * @library
     *
     * When a `Frame` is the child of a `Stack`, the `Stack` is responsible for its layout. This makes it
     * difficult for to know when the layout changes and smoothly animate components to their new positions.
     *
     * By adding `layoutTransition` to a child `Frame`, it'll automatically animate to its new position
     * when it moves in the `Stack`, whether the `Stack` layout has changed, or the `Frame` has changed order within it.
     *
     * It can either be set as a `Transition`, or just `true` to use the default layout transition.
     *
     * Animating size with `scale` can introduce visual distortion to the component's children. If unwanted,
     * the `useInvertedScale` function can be used to undo this distortion.
     *
     * ```jsx
     * function MyComponent({ distribution = "space-around" }) {
     *   const spring = {
     *     type: "spring",
     *     damping: 10,
     *     stiffness: 100
     *   }
     *
     *   return (
     *     <Stack distribution={distribution}>
     *       <Frame layoutTransition={spring} />
     *     </Stack>
     *   )
     * }
     * ```
     *
     * @motion
     *
     * If `layoutTransition` is defined on a `motion` component, the component will automatically
     * animate any changes to its position **and** size.
     *
     * It will do so using performant transforms. So if a `motion` component changes position, it'll animate
     * to its new position using `x` and `y`. If it changes size, it'll animate using `scaleX` and `scaleY`.
     *
     * Animating size with `scale` can introduce visual distortion to the component's children. If unwanted,
     * the `useInvertedScale` function can be used to undo this distortion.
     *
     * `layoutTransition` can either be set as a `Transition`, or just `true` to use the default layout transition,
     * which is a smooth `0.8` second ease.
     *
     * It can also be set as a function that will resolve when the component has changed layout. This function
     * should return either a `Transition`, or `true`. For advanced use-cases where you want the component
     * to visually stay in its previous position, this function can also return `false`. This function will receive
     * the `delta` of the changed layout.
     *
     * ```jsx
     * const spring = {
     *   type: "spring",
     *   damping: 10,
     *   stiffness: 100
     * }
     *
     * // This component will animate between sizes when `isVisible` is toggled.
     * const MyComponent = ({ isVisible }) => {
     *   return (
     *     <motion.div layoutTransition={spring}>
     *       {isVisible && <Content />}
     *     </motion.div>
     *   )
     * }
     * ```
     *
     * @beta
     */
    layoutTransition?: Transition | boolean | ResolveLayoutTransition;
}

declare type Config<T> = {
    transformer?: Transformer<T>;
    parent?: MotionValue<T>;
};

declare interface ControlsProp {
    controls?: ValueAnimationControls;
}

/**
 * @internal
 */
declare const createMotionComponent: <P extends {}>({ getValueControlsConfig, loadFunctionalityComponents, renderComponent, }: MotionComponentConfig) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P & MotionProps> & React.RefAttributes<Element>>;

declare type CSSPropertiesWithoutTransitionOrSingleTransforms = Omit<React.CSSProperties, "transition" | "rotate" | "scale" | "perspective">;

declare interface CustomStyles {
    /**
     * Framer Library custom prop types. These are not actually supported in Motion - preferably
     * we'd have a way of external consumers injecting supported styles into this library.
     */
    size?: string | number;
    radius?: string | number;
    shadow?: string;
    image?: string;
}

/**
 * @public
 */
declare interface CustomValueType {
    mix: (from: any, to: any) => (p: number) => number | string;
    toValue: () => number | string;
}

declare type Cycle = (i?: number) => void;

declare type CycleState<T> = [T, Cycle];

/**
 * @public
 */
declare interface DraggableProps extends DragHandlers {
    /**
     * Enable dragging for this element. Set to `false` by default.
     * Set `true` to drag in both directions.
     * Set `"x"` or `"y"` to only drag in a specific direction.
     *
     * @library
     *
     * ```jsx
     * <Frame drag="x" />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div drag="x" />
     * ```
     */
    drag?: boolean | "x" | "y";
    /**
     * If `true`, this will lock dragging to the initially-detected direction. Defaults to `false`.
     *
     * @library
     *
     * ```jsx
     * <Frame drag={true} dragDirectionLock={true} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div drag dragDirectionLock />
     * ```
     */
    dragDirectionLock?: boolean;
    /**
     * Allows drag gesture propagation to child components. Set to `false` by
     * default.
     *
     * @library
     *
     * ```jsx
     * <Frame drag="x" dragPropagation={true} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div drag="x" dragPropagation />
     * ```
     */
    dragPropagation?: boolean;
    /**
     * An object of optional `top`, `left`, `right`, `bottom` pixel values,
     * beyond which dragging is constrained.
     *
     * Another component can be used as drag constraints by creating a `ref` with React's `useRef`.hook.
     * This `ref` should be passed to that component's `ref` prop and to this component's `dragConstraints` prop.
     *
     * @library
     *
     * ```jsx
     * // In pixels
     * <Frame
     *   drag="x"
     *   dragConstraints={{ left: 0, right: 300 }}
     * />
     *
     * // As a ref to another component
     * function MyComponent() {
     *   const constraintsRef = useRef(null)
     *
     *   return (
     *      <Frame ref={constraintsRef} width={400} height={400}>
     *          <Frame drag dragConstraints={constraintsRef} />
     *      </Frame>
     *   )
     * }
     * ```
     *
     * @motion
     *
     * ```jsx
     * // In pixels
     * <motion.div
     *   drag="x"
     *   dragConstraints={{ left: 0, right: 300 }}
     * />
     *
     * // As a ref to another component
     * const MyComponent = () => {
     *   const constraintsRef = useRef(null)
     *
     *   return (
     *      <motion.div ref={constraintsRef}>
     *          <motion.div drag dragConstraints={constraintsRef} />
     *      </motion.div>
     *   )
     * }
     * ```
     */
    dragConstraints?: false | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    } | React.RefObject<Element>;
    /**
     * The degree of movement allowed outside constraints. 0 = no movement, 1 =
     * full movement. Set to `0.5` by default.
     *
     * @library
     *
     * ```jsx
     * <Frame
     *   drag={true}
     *   dragConstraints={{ left: 0, right: 300 }}
     *   dragElastic={0.2}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragConstraints={{ left: 0, right: 300 }}
     *   dragElastic={0.2}
     * />
     * ```
     */
    dragElastic?: boolean | number;
    /**
     * Apply momentum from the pan gesture to the component when dragging
     * finishes. Set to `true` by default.
     *
     * @library
     *
     * ```jsx
     * <Frame
     *   drag={true}
     *   dragConstraints={{ left: 0, right: 300 }}
     *   dragMomentum={false}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragConstraints={{ left: 0, right: 300 }}
     *   dragMomentum={false}
     * />
     * ```
     */
    dragMomentum?: boolean;
    /**
     * Allows you to change dragging inertia parameters.
     * When releasing a draggable Frame, an animation with type `inertia` starts. The animation is based on your dragging velocity. This property allows you to customize it.
     * See {@link https://framer.com/api/animation/#inertia | Inertia} for all properties you can use.
     *
     * @library
     *
     * ```jsx
     * <Frame
     *   drag={true}
     *   dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
     * />
     * ```
     */
    dragTransition?: InertiaOptions;
    /**
     * @internalremarks
     *
     * _dragValueX, _dragValueY and _dragTransitionControls are a way of allowing this
     * component to be a drag target for another element.
     *
     * @internal
     */
    _dragValueX?: MotionValue<number>;
    /**
     * @internal
     */
    _dragValueY?: MotionValue<number>;
    /**
     * @internal
     */
    _dragTransitionControls?: AnimationControls;
    /**
     * Drag position is calculated by applying the pan offset to the x/y origin
     * measured when the drag gesture begins.
     *
     * By manually creating `dragOriginX` as a `MotionValue`, it can be updated
     * while the gesture is active, for instance to visually offset any movement should
     * the component change layout.
     *
     * @library
     *
     * ```jsx
     * const dragOriginX = useMotionValue(0)
     *
     * return <Frame dragOriginX={dragOriginX} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * const dragOriginX = useMotionValue(0)
     *
     * return <motion.div dragOriginX={dragOriginX} />
     * ```
     *
     * @public
     */
    dragOriginX?: MotionValue<number>;
    /**
     * Drag position is calculated by applying the pan offset to the x/y origin
     * measured when the drag gesture begins.
     *
     * By manually creating `dragOriginY` as a `MotionValue`, it can be updated
     * while the gesture is active, for instance to visually offset any movement should
     * the component change layout.
     *
     * @library
     *
     * ```jsx
     * const dragOriginY = useMotionValue(0)
     *
     * return <Frame dragOriginY={dragOriginY} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * const dragOriginY = useMotionValue(0)
     *
     * return <motion.div dragOriginY={dragOriginY} />
     * ```
     *
     * @public
     */
    dragOriginY?: MotionValue<number>;
}

/** @public */
declare interface DragHandlers {
    /**
     * Callback function that fires when dragging starts.
     *
     * @library
     *
     * ```jsx
     * function onDragStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame drag onDragStart={onDragStart} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDragStart={
     *     (event, info) => console.log(info.point.x, info.point.y)
     *   }
     * />
     * ```
     */
    onDragStart?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when dragging ends.
     *
     * @library
     *
     * ```jsx
     * function onDragEnd(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame drag onDragEnd={onDragEnd} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDragEnd={
     *     (event, info) => console.log(info.point.x, info.point.y)
     *   }
     * />
     * ```
     */
    onDragEnd?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when the component is dragged.
     *
     * @library
     *
     * ```jsx
     * function onDrag(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame drag onDrag={onDrag} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDrag={
     *     (event, info) => console.log(info.point.x, info.point.y)
     *   }
     * />
     * ```
     */
    onDrag?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires a drag direction is determined.
     *
     * @library
     *
     * ```jsx
     * function onDirectionLock(axis) {
     *   console.log(axis)
     * }
     *
     * <Frame
     *   drag
     *   dragDirectionLock
     *   onDirectionLock={onDirectionLock}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragDirectionLock
     *   onDirectionLock={axis => console.log(axis)}
     * />
     * ```
     */
    onDirectionLock?(axis: "x" | "y"): void;
    /**
     * Callback function that fires when drag momentum/bounce transition finishes.
     *
     * @library
     *
     * ```jsx
     * function onDragTransitionEnd() {
     *   console.log('drag transition has ended')
     * }
     *
     * <Frame
     *   drag
     *   onDragTransitionEnd={onDragTransitionEnd}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   onDragTransitionEnd={() => console.log('Drag transition complete')}
     * />
     * ```
     */
    onDragTransitionEnd?(): void;
}

/**
 * The easing function to use. Set as one of:
 *
 * - The name of an in-built easing function.
 * - An array of four numbers to define a cubic bezier curve.
 * - An easing function, that accepts and returns a progress value between `0` and `1`.
 *
 * @public
 */
declare type Easing = [number, number, number, number] | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | EasingFunction;

/**
 * A function that accepts a progress value between `0` and `1` and returns a
 * new one.
 *
 * @library
 *
 * ```jsx
 * const transition = {
 *   ease: progress => progress * progress
 * }
 *
 * <Frame
 *   animate={{ opacity: 0 }}
 *   transition={transition}
 * />
 * ```
 *
 * @motion
 *
 * ```jsx
 * <motion.div
 *   animate={{ opacity: 0 }}
 *   transition={{
 *     duration: 1,
 *     ease: progress => progress * progress
 *   }}
 * />
 * ```
 *
 * @public
 */
declare type EasingFunction = (v: number) => number;

/** @public */
declare interface EventInfo {
    point: Point;
}

declare interface ExitProps {
    initial?: false | VariantLabels;
    isExiting?: boolean;
    onExitComplete?: () => void;
    custom?: any;
}

declare interface FunctionalProps extends MotionProps {
    controls: ValueAnimationControls;
    values: MotionValuesMap;
    innerRef: React.RefObject<Element>;
    parentContext: MotionContextProps;
}

/**
 * @public
 */
declare type GestureHandlers = PanHandlers & TapHandlers & HoverHandlers;

/**
 * @public
 */
declare interface HoverHandlers {
    /**
     * Properties or variant label to animate to while the hover gesture is recognised.
     *
     * @library
     *
     * ```jsx
     * <Frame whileHover={{ scale: 1.2 }} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div whileHover={{ scale: 1.2 }} />
     * ```
     */
    whileHover?: string | TargetAndTransition;
    /**
     * Callback function that fires when pointer starts hovering over the component.
     *
     * @library
     *
     * ```jsx
     * function onHoverStart(event) {
     *   console.log("Hover starts")
     * }
     *
     * <Frame onHoverStart={onHoverStart} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div onHoverStart={() => console.log('Hover starts')} />
     * ```
     */
    onHoverStart?(event: MouseEvent, info: EventInfo): void;
    /**
     * Callback function that fires when pointer stops hovering over the component.
     *
     * @library
     *
     * ```jsx
     * function onHoverEnd(event) {
     *   console.log("Hover ends")
     * }
     *
     * <Frame onHoverEnd={onHoverEnd} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div onHoverEnd={() => console.log("Hover ends")} />
     * ```
     */
    onHoverEnd?(event: MouseEvent, info: EventInfo): void;
}

declare type HTMLAttributesWithoutMotionProps<Attributes extends React.HTMLAttributes<Element>, Element extends HTMLElement> = {
    [K in Exclude<keyof Attributes, keyof MotionProps>]?: Attributes[K];
};

/**
 * @public
 */
declare type HTMLMotionProps<TagName extends keyof React.ReactHTML> = React.HTMLAttributesWithoutMotionProps<UnwrapFactoryAttributes<React.ReactHTML[TagName]>, UnwrapFactoryElement<React.ReactHTML[TagName]>> & MotionProps;

/**
 * An animation that decelerates a value based on its initial velocity,
 * usually used to implement inertial scrolling.
 *
 * Optionally, `min` and `max` boundaries can be defined, and inertia
 * will snap to these with a spring animation.
 *
 * This animation will automatically precalculate a target value,
 * which can be modified with the `modifyTarget` property.
 *
 * This allows you to add snap-to-grid or similar functionality.
 *
 * Inertia is also the animation used for `dragTransition`, and can be configured via that prop.
 *
 * @public
 */
declare interface Inertia {
    /**
     * Set `type` to animate using the inertia animation. Set to `"tween"` by
     * default. This can be used for natural deceleration, like momentum scrolling.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "inertia",
     *   velocity: 50
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: "inertia", velocity: 50 }}
     * />
     * ```
     *
     * @public
     */
    type: "inertia";
    /**
     * A function that receives the automatically-calculated target and returns a new one. Useful for snapping the target to a grid.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   power: 0,
     *   // Snap calculated target to nearest 50 pixels
     *   modifyTarget: target => Math.round(target / 50) * 50
     * }
     *
     * <Frame
     *   drag
     *   dragTransition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{
     *     power: 0,
     *     // Snap calculated target to nearest 50 pixels
     *     modifyTarget: target => Math.round(target / 50) * 50
     *   }}
     * />
     * ```
     *
     * @public
     */
    modifyTarget?(v: number): number;
    /**
     * If `min` or `max` is set, this affects the stiffness of the bounce
     * spring. Higher values will create more sudden movement. Set to `500` by
     * default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   min: 0,
     *   max: 100,
     *   bounceStiffness: 100
     * }
     *
     * <Frame
     *   drag
     *   dragTransition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{
     *     min: 0,
     *     max: 100,
     *     bounceStiffness: 100
     *   }}
     * />
     * ```
     *
     * @public
     */
    bounceStiffness?: number;
    /**
     * If `min` or `max` is set, this affects the damping of the bounce spring.
     * If set to `0`, spring will oscillate indefinitely. Set to `10` by
     * default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   min: 0,
     *   max: 100,
     *   bounceDamping: 8
     * }
     *
     * <Frame
     *   drag
     *   dragTransition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{
     *     min: 0,
     *     max: 100,
     *     bounceDamping: 8
     *   }}
     * />
     * ```
     *
     * @public
     */
    bounceDamping?: number;
    /**
     * A higher power value equals a further target. Set to `0.8` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   min: 0,
     *   max: 100,
     *   power: 0.2
     * }
     *
     * <Frame
     *   drag
     *   dragTransition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ power: 0.2 }}
     * />
     * ```
     *
     * @public
     */
    power?: number;
    /**
     * Adjusting the time constant will change the duration of the
     * deceleration, thereby affecting its feel. Set to `700` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   min: 0,
     *   max: 100,
     *   timeConstant: 200
     * }
     *
     * <Frame
     *   drag
     *   dragTransition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ timeConstant: 200 }}
     * />
     * ```
     *
     * @public
     */
    timeConstant?: number;
    /**
     * End the animation if the distance to the animation target is below this value, and the absolute speed is below `restSpeed`.
     * When the animation ends, the value gets snapped to the animation target. Set to `0.01` by default.
     * Generally the default values provide smooth animation endings, only in rare cases should you need to customize these.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   min: 0,
     *   max: 100,
     *   restDelta: 10
     * }
     *
     * <Frame
     *   drag
     *   dragTransition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ restDelta: 10 }}
     * />
     * ```
     *
     * @public
     */
    restDelta?: number;
    /**
     * Minimum constraint. If set, the value will "bump" against this value (or immediately spring to it if the animation starts as less than this value).
     *
     * @library
     *
     * ```jsx
     * <Frame
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @public
     */
    min?: number;
    /**
     * Maximum constraint. If set, the value will "bump" against this value (or immediately snap to it, if the initial animation value exceeds this value).
     *
     * @library
     *
     * ```jsx
     * <Frame
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   drag
     *   dragTransition={{ min: 0, max: 100 }}
     * />
     * ```
     *
     * @public
     */
    max?: number;
    /**
     * The value to animate from. By default, this is the current state of the animating value.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   min: 0,
     *   max: 100,
     *   from: 50
     * }
     *
     * <Frame
     *   drag
     *   dragTransition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <Frame
     *   drag
     *   dragTransition={{ from: 50 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * The initial velocity of the animation.
     * By default this is the current velocity of the component.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "inertia",
     *   velocity: 200
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'inertia', velocity: 200 }}
     * />
     * ```
     *
     * @public
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}

/**
 * @public
 */
declare type InertiaOptions = Partial<Omit<Inertia, "velocity" | "type">>;

/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
declare function isValidMotionProp(key: string): boolean;

/**
 * @internal
 */
declare interface Just {
    type: "just";
    to?: number | string | ValueTarget;
    from?: number | string;
    delay?: number;
    velocity?: number;
}

/**
 * Keyframes tweens between multiple `values`.
 *
 * These tweens can be arranged using the `duration`, `easings`, and `times` properties.
 *
 * @internalremarks
 * We could possibly make the `type` property redundant, if not for all animations
 * then for this one quite easily.
 *
 * @internal
 */
declare interface Keyframes {
    /**
     * Set `type` to `"keyframes"` to animate using the keyframes animation.
     * Set to `"tween"` by default. This can be used to animate between a series of values.
     *
     * @public
     */
    type: "keyframes";
    /**
     * An array of values to animate between.
     *
     * @internal
     */
    values: KeyframesTarget;
    /**
     * An array of numbers between 0 and 1, where `1` represents the `total` duration.
     *
     * Each value represents at which point during the animation each item in the animation target should be hit, so the array should be the same length as `values`.
     *
     * Defaults to an array of evenly-spread durations.
     *
     * @public
     */
    times?: number[];
    /**
     * An array of easing functions for each generated tween, or a single easing function applied to all tweens.
     *
     * This array should be one item less than `values`, as these easings apply to the transitions *between* the `values`.
     *
     * ```jsx
     * const transition = {
     *   backgroundColor: {
     *     type: 'keyframes',
     *     easings: ['circIn', 'circOut']
     *   }
     * }
     * ```
     *
     * @public
     */
    ease?: Easing | Easing[];
    /**
     * Popmotion's easing prop to define individual easings. `ease` will be mapped to this prop in keyframes animations.
     *
     * @internal
     */
    easings?: Easing | Easing[];
    /**
     * @internal
     */
    elapsed?: number;
    /**
     * The total duration of the animation. Set to `0.3` by default.
     *
     * ```jsx
     * const transition = {
     *   type: "keyframes",
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ opacity: 0 }}
     *   transition={transition}
     * />
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * The number of times to loop the animation.
     *
     * Set to `Infinity` for perpetual looping.
     *
     * @public
     */
    loop?: number;
    /**
     * The number of times to flip the animation by swapping the `to` and `from` values.
     * Set to `Infinity` for perpetual flipping.
     *
     * ```jsx
     * const transition = {
     *   flip: Infinity,
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ opacity: 0 }}
     *   transition={transition}
     * />
     * ```
     *
     * @public
     */
    flip?: number;
    /**
     * The number of times to reverse the animation.
     * Set to `Infinity` for perpetual reversing.
     *
     * ```jsx
     * const transition = {
     *   yoyo: Infinity,
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     *
     * ```
     * @public
     */
    yoyo?: number;
    /**
     * @public
     */
    repeatDelay?: number;
    /**
     * @internal
     */
    from?: number | string;
    /**
     * @internal
     */
    to?: number | string | ValueTarget;
    /**
     * @internal
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}

/**
 * @public
 */
declare type KeyframesTarget = ResolvedKeyframesTarget | [null, ...CustomValueType[]] | CustomValueType[];

declare type LoadFunctionalityComponents<P = {}> = (ref: React.RefObject<Element>, values: MotionValuesMap, props: P & MotionProps, parentContext: MotionContextProps, controls: ValueAnimationControls<P>, inherit: boolean) => React.ReactElement<FunctionalProps>[];

declare type MakeCustomValueType<T> = {
    [K in keyof T]: T[K] | CustomValueType;
};

declare type MakeKeyframes<T> = {
    [K in keyof T]: T[K] | T[K][] | [null, ...T[K][]];
};

declare type MakeMotion<T> = MakeCustomValueType<{
    [K in keyof T]: T[K] | MotionValue<number> | MotionValue<string> | MotionValue<any>;
}>;

declare type MakeTargetAnimatable = (target: TargetWithKeyframes, transitionEnd?: Target | undefined) => {
    target: TargetWithKeyframes;
    transitionEnd?: Target | undefined;
};

/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * @internalremarks
 *
 * I'd like to make it possible for these to be loaded "on demand" - to reduce bundle size by only
 * including HTML/SVG stylers, animation and/or gesture support when necessary.
 *
 * ```jsx
 * <motion.div animate={{ x: 100 }} />
 *
 * <motion.p animate={{ height: 200 }} />
 *
 * <svg><motion.circle r={10} animate={{ r: 20 }} /></svg>
 * ```
 *
 * @public
 */
declare const motion: {
    symbol: React.ForwardRefExoticComponent<SVGMotionProps<SVGSymbolElement> & React.RefAttributes<SVGSymbolElement>>;
    circle: React.ForwardRefExoticComponent<SVGMotionProps<SVGCircleElement> & React.RefAttributes<SVGCircleElement>>;
    clipPath: React.ForwardRefExoticComponent<SVGMotionProps<SVGClipPathElement> & React.RefAttributes<SVGClipPathElement>>;
    defs: React.ForwardRefExoticComponent<SVGMotionProps<SVGDefsElement> & React.RefAttributes<SVGDefsElement>>;
    desc: React.ForwardRefExoticComponent<SVGMotionProps<SVGDescElement> & React.RefAttributes<SVGDescElement>>;
    ellipse: React.ForwardRefExoticComponent<SVGMotionProps<SVGEllipseElement> & React.RefAttributes<SVGEllipseElement>>;
    feBlend: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEBlendElement> & React.RefAttributes<SVGFEBlendElement>>;
    feColorMatrix: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEColorMatrixElement> & React.RefAttributes<SVGFEColorMatrixElement>>;
    feComponentTransfer: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEComponentTransferElement> & React.RefAttributes<SVGFEComponentTransferElement>>;
    feComposite: React.ForwardRefExoticComponent<SVGMotionProps<SVGFECompositeElement> & React.RefAttributes<SVGFECompositeElement>>;
    feConvolveMatrix: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEConvolveMatrixElement> & React.RefAttributes<SVGFEConvolveMatrixElement>>;
    feDiffuseLighting: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEDiffuseLightingElement> & React.RefAttributes<SVGFEDiffuseLightingElement>>;
    feDisplacementMap: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEDisplacementMapElement> & React.RefAttributes<SVGFEDisplacementMapElement>>;
    feDistantLight: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEDistantLightElement> & React.RefAttributes<SVGFEDistantLightElement>>;
    feFlood: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEFloodElement> & React.RefAttributes<SVGFEFloodElement>>;
    feFuncA: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEFuncAElement> & React.RefAttributes<SVGFEFuncAElement>>;
    feFuncB: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEFuncBElement> & React.RefAttributes<SVGFEFuncBElement>>;
    feFuncG: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEFuncGElement> & React.RefAttributes<SVGFEFuncGElement>>;
    feFuncR: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEFuncRElement> & React.RefAttributes<SVGFEFuncRElement>>;
    feGaussianBlur: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEGaussianBlurElement> & React.RefAttributes<SVGFEGaussianBlurElement>>;
    feImage: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEImageElement> & React.RefAttributes<SVGFEImageElement>>;
    feMerge: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEMergeElement> & React.RefAttributes<SVGFEMergeElement>>;
    feMergeNode: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEMergeNodeElement> & React.RefAttributes<SVGFEMergeNodeElement>>;
    feMorphology: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEMorphologyElement> & React.RefAttributes<SVGFEMorphologyElement>>;
    feOffset: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEOffsetElement> & React.RefAttributes<SVGFEOffsetElement>>;
    fePointLight: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEPointLightElement> & React.RefAttributes<SVGFEPointLightElement>>;
    feSpecularLighting: React.ForwardRefExoticComponent<SVGMotionProps<SVGFESpecularLightingElement> & React.RefAttributes<SVGFESpecularLightingElement>>;
    feSpotLight: React.ForwardRefExoticComponent<SVGMotionProps<SVGFESpotLightElement> & React.RefAttributes<SVGFESpotLightElement>>;
    feTile: React.ForwardRefExoticComponent<SVGMotionProps<SVGFETileElement> & React.RefAttributes<SVGFETileElement>>;
    feTurbulence: React.ForwardRefExoticComponent<SVGMotionProps<SVGFETurbulenceElement> & React.RefAttributes<SVGFETurbulenceElement>>;
    filter: React.ForwardRefExoticComponent<SVGMotionProps<SVGFilterElement> & React.RefAttributes<SVGFilterElement>>;
    foreignObject: React.ForwardRefExoticComponent<SVGMotionProps<SVGForeignObjectElement> & React.RefAttributes<SVGForeignObjectElement>>;
    g: React.ForwardRefExoticComponent<SVGMotionProps<SVGGElement> & React.RefAttributes<SVGGElement>>;
    image: React.ForwardRefExoticComponent<SVGMotionProps<SVGImageElement> & React.RefAttributes<SVGImageElement>>;
    line: React.ForwardRefExoticComponent<SVGMotionProps<SVGLineElement> & React.RefAttributes<SVGLineElement>>;
    linearGradient: React.ForwardRefExoticComponent<SVGMotionProps<SVGLinearGradientElement> & React.RefAttributes<SVGLinearGradientElement>>;
    marker: React.ForwardRefExoticComponent<SVGMotionProps<SVGMarkerElement> & React.RefAttributes<SVGMarkerElement>>;
    mask: React.ForwardRefExoticComponent<SVGMotionProps<SVGMaskElement> & React.RefAttributes<SVGMaskElement>>;
    metadata: React.ForwardRefExoticComponent<SVGMotionProps<SVGMetadataElement> & React.RefAttributes<SVGMetadataElement>>;
    path: React.ForwardRefExoticComponent<SVGMotionProps<SVGPathElement> & React.RefAttributes<SVGPathElement>>;
    pattern: React.ForwardRefExoticComponent<SVGMotionProps<SVGPatternElement> & React.RefAttributes<SVGPatternElement>>;
    polygon: React.ForwardRefExoticComponent<SVGMotionProps<SVGPolygonElement> & React.RefAttributes<SVGPolygonElement>>;
    polyline: React.ForwardRefExoticComponent<SVGMotionProps<SVGPolylineElement> & React.RefAttributes<SVGPolylineElement>>;
    radialGradient: React.ForwardRefExoticComponent<SVGMotionProps<SVGRadialGradientElement> & React.RefAttributes<SVGRadialGradientElement>>;
    rect: React.ForwardRefExoticComponent<SVGMotionProps<SVGRectElement> & React.RefAttributes<SVGRectElement>>;
    stop: React.ForwardRefExoticComponent<SVGMotionProps<SVGStopElement> & React.RefAttributes<SVGStopElement>>;
    svg: React.ForwardRefExoticComponent<SVGMotionProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
    switch: React.ForwardRefExoticComponent<SVGMotionProps<SVGSwitchElement> & React.RefAttributes<SVGSwitchElement>>;
    text: React.ForwardRefExoticComponent<SVGMotionProps<SVGTextElement> & React.RefAttributes<SVGTextElement>>;
    textPath: React.ForwardRefExoticComponent<SVGMotionProps<SVGTextPathElement> & React.RefAttributes<SVGTextPathElement>>;
    tspan: React.ForwardRefExoticComponent<SVGMotionProps<SVGTSpanElement> & React.RefAttributes<SVGTSpanElement>>;
    use: React.ForwardRefExoticComponent<SVGMotionProps<SVGUseElement> & React.RefAttributes<SVGUseElement>>;
    view: React.ForwardRefExoticComponent<SVGMotionProps<SVGViewElement> & React.RefAttributes<SVGViewElement>>;
    animate: React.ForwardRefExoticComponent<SVGMotionProps<SVGElement> & React.RefAttributes<SVGElement>>;
    feDropShadow: React.ForwardRefExoticComponent<SVGMotionProps<SVGFEDropShadowElement> & React.RefAttributes<SVGFEDropShadowElement>>;
    object: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement> & MotionProps & React.RefAttributes<HTMLObjectElement>>;
    big: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    link: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> & MotionProps & React.RefAttributes<HTMLLinkElement>>;
    small: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    sub: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    sup: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    track: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement> & MotionProps & React.RefAttributes<HTMLTrackElement>>;
    progress: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement> & MotionProps & React.RefAttributes<HTMLProgressElement>>;
    a: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & MotionProps & React.RefAttributes<HTMLAnchorElement>>;
    abbr: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    address: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    area: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement> & MotionProps & React.RefAttributes<HTMLAreaElement>>;
    article: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    aside: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    audio: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement> & MotionProps & React.RefAttributes<HTMLAudioElement>>;
    b: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    base: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement> & MotionProps & React.RefAttributes<HTMLBaseElement>>;
    bdi: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    bdo: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    blockquote: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    body: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement> & MotionProps & React.RefAttributes<HTMLBodyElement>>;
    br: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLBRElement>, HTMLBRElement> & MotionProps & React.RefAttributes<HTMLBRElement>>;
    button: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & MotionProps & React.RefAttributes<HTMLButtonElement>>;
    canvas: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & MotionProps & React.RefAttributes<HTMLCanvasElement>>;
    caption: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    cite: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    code: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    col: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement> & MotionProps & React.RefAttributes<HTMLTableColElement>>;
    colgroup: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement> & MotionProps & React.RefAttributes<HTMLTableColElement>>;
    data: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    datalist: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLDataListElement>, HTMLDataListElement> & MotionProps & React.RefAttributes<HTMLDataListElement>>;
    dd: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    del: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.DelHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    details: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.DetailsHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    dfn: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    dialog: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement> & MotionProps & React.RefAttributes<HTMLDialogElement>>;
    div: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & React.RefAttributes<HTMLDivElement>>;
    dl: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement> & MotionProps & React.RefAttributes<HTMLDListElement>>;
    dt: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    em: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    embed: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement> & MotionProps & React.RefAttributes<HTMLEmbedElement>>;
    fieldset: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement> & MotionProps & React.RefAttributes<HTMLFieldSetElement>>;
    figcaption: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    figure: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    footer: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    form: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & MotionProps & React.RefAttributes<HTMLFormElement>>;
    h1: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & MotionProps & React.RefAttributes<HTMLHeadingElement>>;
    h2: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & MotionProps & React.RefAttributes<HTMLHeadingElement>>;
    h3: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & MotionProps & React.RefAttributes<HTMLHeadingElement>>;
    h4: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & MotionProps & React.RefAttributes<HTMLHeadingElement>>;
    h5: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & MotionProps & React.RefAttributes<HTMLHeadingElement>>;
    h6: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & MotionProps & React.RefAttributes<HTMLHeadingElement>>;
    head: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLHeadElement> & MotionProps & React.RefAttributes<HTMLHeadElement>>;
    header: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    hgroup: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    hr: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement> & MotionProps & React.RefAttributes<HTMLHRElement>>;
    html: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement> & MotionProps & React.RefAttributes<HTMLHtmlElement>>;
    i: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    iframe: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> & MotionProps & React.RefAttributes<HTMLIFrameElement>>;
    img: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & MotionProps & React.RefAttributes<HTMLImageElement>>;
    input: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & MotionProps & React.RefAttributes<HTMLInputElement>>;
    ins: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.InsHTMLAttributes<HTMLModElement>, HTMLModElement> & MotionProps & React.RefAttributes<HTMLModElement>>;
    kbd: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    label: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & MotionProps & React.RefAttributes<HTMLLabelElement>>;
    legend: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement> & MotionProps & React.RefAttributes<HTMLLegendElement>>;
    li: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> & MotionProps & React.RefAttributes<HTMLLIElement>>;
    main: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    map: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement> & MotionProps & React.RefAttributes<HTMLMapElement>>;
    mark: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    menu: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.MenuHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    meta: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement> & MotionProps & React.RefAttributes<HTMLMetaElement>>;
    meter: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.MeterHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    nav: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    noscript: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    ol: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> & MotionProps & React.RefAttributes<HTMLOListElement>>;
    optgroup: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement> & MotionProps & React.RefAttributes<HTMLOptGroupElement>>;
    option: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement> & MotionProps & React.RefAttributes<HTMLOptionElement>>;
    output: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.OutputHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    p: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & MotionProps & React.RefAttributes<HTMLParagraphElement>>;
    param: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement> & MotionProps & React.RefAttributes<HTMLParamElement>>;
    picture: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    pre: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> & MotionProps & React.RefAttributes<HTMLPreElement>>;
    q: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement> & MotionProps & React.RefAttributes<HTMLQuoteElement>>;
    rp: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    rt: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    ruby: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    s: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    samp: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    script: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement> & MotionProps & React.RefAttributes<HTMLScriptElement>>;
    section: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    select: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & MotionProps & React.RefAttributes<HTMLSelectElement>>;
    source: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement> & MotionProps & React.RefAttributes<HTMLSourceElement>>;
    span: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & MotionProps & React.RefAttributes<HTMLSpanElement>>;
    strong: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    style: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> & MotionProps & React.RefAttributes<HTMLStyleElement>>;
    summary: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    table: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> & MotionProps & React.RefAttributes<HTMLTableElement>>;
    tbody: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & MotionProps & React.RefAttributes<HTMLTableSectionElement>>;
    td: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> & MotionProps & React.RefAttributes<HTMLTableDataCellElement>>;
    textarea: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & MotionProps & React.RefAttributes<HTMLTextAreaElement>>;
    tfoot: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & MotionProps & React.RefAttributes<HTMLTableSectionElement>>;
    th: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement> & MotionProps & React.RefAttributes<HTMLTableHeaderCellElement>>;
    thead: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> & MotionProps & React.RefAttributes<HTMLTableSectionElement>>;
    time: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.TimeHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    title: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement> & MotionProps & React.RefAttributes<HTMLTitleElement>>;
    tr: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> & MotionProps & React.RefAttributes<HTMLTableRowElement>>;
    u: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    ul: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> & MotionProps & React.RefAttributes<HTMLUListElement>>;
    var: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    video: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & MotionProps & React.RefAttributes<HTMLVideoElement>>;
    wbr: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    menuitem: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    keygen: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.KeygenHTMLAttributes<HTMLElement>, HTMLElement> & MotionProps & React.RefAttributes<HTMLElement>>;
    webview: React.ForwardRefExoticComponent<HTMLAttributesWithoutMotionProps<React.WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement> & MotionProps & React.RefAttributes<HTMLWebViewElement>>;
    /**
     * Convert a custom React component into a `motion` component.
     *
     * It can also accept a string, to create [custom DOM elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
     *
     * ```jsx
     * const Component = React.forwardRef((props: Props, ref) => {
     *   return <div ref={ref} />
     * })
     *
     * const MotionComponent = motion.custom<Props>(Component)
     * ```
     *
     * @param Component
     */
    custom: <Props>(Component: string | React.ComponentClass<Props, any> | React.FunctionComponent<Props>) => React.ForwardRefExoticComponent<React.PropsWithoutRef<Props & MotionProps> & React.RefAttributes<Element>>;
};

/**
 * @public
 */
declare interface MotionAdvancedProps {
    /**
     * Custom data to use to resolve dynamic variants differently for each animating component.
     *
     * @library
     *
     * ```jsx
     * const variants = {
     *   visible: (custom) => ({
     *     opacity: 1,
     *     transition: { delay: custom * 0.2 }
     *   })
     * }
     *
     * <Frame custom={0} animate="visible" variants={variants} />
     * <Frame custom={1} animate="visible" variants={variants} />
     * <Frame custom={2} animate="visible" variants={variants} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * const variants = {
     *   visible: (custom) => ({
     *     opacity: 1,
     *     transition: { delay: custom * 0.2 }
     *   })
     * }
     *
     * <motion.div custom={0} animate="visible" variants={variants} />
     * <motion.div custom={1} animate="visible" variants={variants} />
     * <motion.div custom={2} animate="visible" variants={variants} />
     * ```
     *
     * @public
     */
    custom?: any;
    /**
     * @public
     * Set to `false` to prevent inheriting variant changes from its parent.
     */
    inherit?: boolean;
    /**
     * @internal
     * Set to `true` to block rendering motion values (`animate`, gestures, etcetera)
     * on the component. This can be used to temporarily disable animations for performance reasons.
     */
    static?: boolean;
}

/**
 * @public
 */
declare interface MotionCallbacks {
    /**
     * Callback with latest motion values, fired max once per frame.
     *
     * @library
     *
     * ```jsx
     * function onUpdate(latest) {
     *   console.log(latest.x, latest.opacity)
     * }
     *
     * <Frame animate={{ x: 100, opacity: 0 }} onUpdate={onUpdate} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onUpdate(latest) {
     *   console.log(latest.x, latest.opacity)
     * }
     *
     * <motion.div animate={{ x: 100, opacity: 0 }} onUpdate={onUpdate} />
     * ```
     */
    onUpdate?(latest: {
        [key: string]: string | number;
    }): void;
    /**
     * Callback when animation defined in `animate` begins.
     *
     * @library
     *
     * ```jsx
     * function onStart() {
     *   console.log("Animation completed")
     * }
     *
     * <Frame animate={{ x: 100 }} onAnimationStart={onStart} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onStart() {
     *   console.log("Animation completed")
     * }
     *
     * <motion.div animate={{ x: 100 }} onAnimationStart={onStart} />
     * ```
     */
    onAnimationStart?(): void;
    /**
     * Callback when animation defined in `animate` is complete.
     *
     * @library
     *
     * ```jsx
     * function onComplete() {
     *   console.log("Animation completed")
     * }
     *
     * <Frame animate={{ x: 100 }} onAnimationComplete={onComplete} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onComplete() {
     *   console.log("Animation completed")
     * }
     *
     * <motion.div animate={{ x: 100 }} onAnimationComplete={onComplete} />
     * ```
     */
    onAnimationComplete?(): void;
}

declare interface MotionComponentConfig {
    loadFunctionalityComponents: LoadFunctionalityComponents;
    renderComponent: RenderComponent;
    getValueControlsConfig: (ref: React.RefObject<any>, values: MotionValuesMap) => ValueAnimationConfig;
}

/**
 * @internal
 */
declare const MotionContext: React.Context<MotionContextProps>;

declare interface MotionContextProps {
    controls?: ValueAnimationControls;
    values?: MotionValuesMap;
    initial?: false | VariantLabels;
    animate?: VariantLabels;
    static?: boolean;
    hasMounted?: RefObject<boolean>;
    exitProps?: ExitProps;
}

declare type MotionCSS = MakeMotion<Omit<React.CSSProperties, "rotate" | "scale" | "perspective">>;

/**
 * @internal
 */
declare const MotionPluginContext: React.Context<MotionPlugins>;

declare interface MotionPluginProps extends MotionPlugins {
    children?: React.ReactNode;
}

/**
 * @internal
 * @internalremarks For now I think this should remain a private API for our own use
 * until we can figure out a nicer way of allowing people to add these
 */
declare function MotionPlugins({ children, ...props }: MotionPluginProps): JSX.Element;

declare interface MotionPlugins {
    transformPagePoint: (point: Point) => Point;
}

/**
 * Props for `motion` components.
 *
 * @public
 */
declare interface MotionProps extends AnimationProps, MotionCallbacks, GestureHandlers, DraggableProps, MotionAdvancedProps {
    /**
     * Properties, variant label or array of variant labels to start in.
     *
     * Set to `false` to initialise with the values in `animate` (disabling the mount animation)
     *
     * @library
     *
     * ```jsx
     * // As values
     * <Frame initial={{ opacity: 1 }} />
     *
     * // As variant
     * <Frame initial="visible" variants={variants} />
     *
     * // Multiple variants
     * <Frame initial={["visible", "active"]} variants={variants} />
     *
     * // As false (disable mount animation)
     * <Frame initial={false} animate={{ opacity: 0 }} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * // As values
     * <motion.div initial={{ opacity: 1 }} />
     *
     * // As variant
     * <motion.div initial="visible" variants={variants} />
     *
     * // Multiple variants
     * <motion.div initial={["visible", "active"]} variants={variants} />
     *
     * // As false (disable mount animation)
     * <motion.div initial={false} animate={{ opacity: 0 }} />
     * ```
     */
    initial?: boolean | Target | VariantLabels;
    /**
     * @library
     *
     * The React DOM `style` prop, useful for setting CSS properties that aren't explicitly exposed by `Frame` props.
     *
     * ```jsx
     * <Frame style={{ mixBlendMode: "difference" }}  />
     * ```
     *
     * @motion
     *
     * The React DOM `style` prop, enhanced with support for `MotionValue`s and separate `transform` values.
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *
     *   return <motion.div style={{ x, opacity: 1, scale: 0.5 }} />
     * }
     * ```
     */
    style?: MotionStyle;
    /**
     * By default, Framer Motion generates a `transform` property with a sensible transform order. `transformTemplate`
     * can be used to create a different order, or to append/preprend the automatically generated `transform` property.
     *
     * @library
     *
     * ```jsx
     * function transformTemplate({ x, rotate }) {
     *   return `rotate(${rotate}deg) translateX(${x}px)`
     * }
     *
     * <Frame x={0} rotate={180} transformTemplate={transformTemplate} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   style={{ x: 0, rotate: 180 }}
     *   transformTemplate={
     *     ({ x, rotate }) => `rotate(${rotate}deg) translateX(${x}px)`
     *   }
     * />
     * ```
     *
     * @param transform - The latest animated transform props.
     * @param generatedTransform - The transform string as automatically generated by Framer Motion
     *
     * @public
     */
    transformTemplate?(transform: TransformProperties, generatedTransform: string): string;
    /**
     * This allows values to be transformed before being animated or set as styles.
     *
     * For instance, this allows custom values in Framer Library like `size` to be converted into `width` and `height`.
     * It also allows us a chance to take a value like `Color` and convert it to an animatable color string.
     *
     * A few structural typing changes need making before this can be a public property:
     * - Allow `Target` values to be appended by user-defined types (delete `CustomStyles` - does `size` throw a type error?)
     * - Extract `CustomValueType` as a separate user-defined type (delete `CustomValueType` and animate a `Color` - does this throw a type error?).
     *
     * @param values -
     *
     * @internal
     */
    transformValues?<V extends any>(values: V): V;
}

/**
 * @public
 */
declare type MotionStyle = MotionCSS & MotionTransform & MakeMotion<SVGPathProperties> & MakeCustomValueType<CustomStyles>;

/**
 * @public
 */
declare type MotionTransform = MakeMotion<TransformProperties>;

/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
declare class MotionValue<V = any> {
    /**
     * The current state of the `MotionValue`.
     *
     * @internal
     */
    private current;
    /**
     * The previous state of the `MotionValue`.
     *
     * @internal
     */
    private prev;
    /**
     * Duration, in milliseconds, since last updating frame.
     *
     * @internal
     */
    private timeDelta;
    /**
     * Timestamp of the last time this `MotionValue` was updated.
     *
     * @internal
     */
    private lastUpdated;
    /**
     * Collection of children `MotionValue`s to notify of updates.
     *
     * @internal
     */
    private children?;
    /**
     * A reference to this `MotionValue`'s parent.
     *
     * @internal
     */
    private parent?;
    /**
     * Functions to notify when the `MotionValue` updates.
     *
     * @internal
     */
    updateSubscribers?: Set<Subscriber<V>>;
    /**
     * Functions to notify when the `MotionValue` updates and `render` is set to `true`.
     *
     * @internal
     */
    private renderSubscribers?;
    /**
     * Add a passive effect to this `MotionValue`.
     *
     * A passive effect intercepts calls to `set`. For instance, `useSpring` adds
     * a passive effect that attaches a `spring` to the latest
     * set value. Hypothetically there could be a `useSmooth` that attaches an input smoothing effect.
     *
     * @internal
     */
    private passiveEffect?;
    /**
     * If defined, new values passed into `set` will be transformed through this function before being set.
     *
     * @internal
     */
    private transformer?;
    /**
     * A reference to the currently-controlling Popmotion animation
     *
     * @internal
     */
    private stopAnimation?;
    /**
     * Tracks whether this value can output a velocity. Currently this is only true
     * if the value is numerical, but we might be able to widen the scope here and support
     * other value types.
     *
     * @internal
     */
    private canTrackVelocity;
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    constructor(init: V, { transformer, parent }?: Config<V>);
    /**
     * Creates a new `MotionValue` that's subscribed to the output of this one.
     *
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    addChild(config?: Config<V>): MotionValue<V>;
    /**
     * Stops a `MotionValue` from being subscribed to this one.
     *
     * @param child - The subscribed `MotionValue`
     *
     * @internal
     */
    removeChild(child: MotionValue): void;
    /**
     * Subscribes a subscriber function to a subscription list.
     *
     * @param subscriptions - A `Set` of subscribers.
     * @param subscription - A subscriber function.
     */
    private subscribeTo;
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * @library
     *
     * ```jsx
     * function MyComponent() {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <Frame x={x} />
     * }
     * ```
     *
     * @motion
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.onChange(updateOpacity)
     *     const unsubscribeY = y.onChange(updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @internalremarks
     *
     * We could look into a `useOnChange` hook if the above lifecycle management proves confusing.
     *
     * ```jsx
     * useOnChange(x, () => {})
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @public
     */
    onChange(subscription: Subscriber<V>): () => void;
    /**
     * Adds a function that will be notified when the `MotionValue` requests a render.
     *
     * @param subscriber - A function that's provided the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @internal
     */
    onRenderRequest(subscription: Subscriber<V>): () => boolean;
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    attach(passiveEffect: PassiveEffect<V>): void;
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v: V, render?: boolean): void;
    updateAndNotify: (v: V, render?: boolean) => void;
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get(): V;
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity(): number;
    /**
     * Notify a subscriber with the latest value.
     *
     * This is an instanced and bound function to prevent generating a new
     * function once per frame.
     *
     * @param subscriber - The subscriber to notify.
     *
     * @internal
     */
    private notifySubscriber;
    /**
     * Schedule a velocity check for the next frame.
     *
     * This is an instanced and bound function to prevent generating a new
     * function once per frame.
     *
     * @internal
     */
    private scheduleVelocityCheck;
    /**
     * Updates `prev` with `current` if the value hasn't been updated this frame.
     * This ensures velocity calculations return `0`.
     *
     * This is an instanced and bound function to prevent generating a new
     * function once per frame.
     *
     * @internal
     */
    private velocityCheck;
    /**
     * Updates child `MotionValue`.
     *
     * @param child - Child `MotionValue`.
     *
     * @internal
     */
    private setChild;
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    start(animation: StartAnimation): Promise<void>;
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop(): void;
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating(): boolean;
    private clearAnimation;
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy(): void;
}

/**
 * @internal
 */
declare function motionValue<V>(init: V, opts?: Config<V>): MotionValue<V>;

declare class MotionValuesMap {
    private hasMounted;
    private transformTemplate;
    private onUpdate?;
    private values;
    private unsubscribers;
    private output;
    has(key: string): boolean;
    set(key: string, value: MotionValue): void;
    get<Value>(key: string): MotionValue<Value> | undefined;
    get<Value>(key: string, defaultValue: Value): MotionValue<Value>;
    forEach(callback: (value: MotionValue, key: string) => void): void;
    private bindValueToOutput;
    setOnUpdate(onUpdate?: OnUpdate): void;
    setTransformTemplate(transformTemplate?: TransformTemplate | undefined): void;
    getTransformTemplate(): TransformTemplate | undefined;
    updateTransformTemplate(): void;
    mount(output?: Output): void;
    unmount(): void;
}

/**
 * @public
 */
declare interface None {
    /**
     * Set `type` to `false` for an instant transition.
     *
     * @public
     */
    type: false;
    /**
     * @internal
     */
    from?: number | string;
    /**
     * @internal
     */
    delay?: number;
    /**
     * @internal
     */
    velocity?: number;
}

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare type OnUpdate = (v: Target) => void;

/**
 * Options for orchestrating the timing of animations.
 *
 * @public
 */
declare interface Orchestration {
    /**
     * Delay the animation by this duration (in seconds). Defaults to `0`.
     *
     * @remarks
     * ```javascript
     * const transition = {
     *   delay: 0.2
     * }
     * ```
     *
     * @public
     */
    delay?: number;
    /**
     * Describes the relationship between the transition and its children. Set
     * to `false` by default.
     *
     * @remarks
     * When using variants, the transition can be scheduled in relation to its
     * children with either `"beforeChildren"` to finish this transition before
     * starting children transitions, `"afterChildren"` to finish children
     * transitions before starting this transition.
     *
     * @library
     *
     * ```jsx
     * const container = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { when: "afterChildren" }
     *   }
     * }
     *
     * const item = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { duration: 2 }
     *   }
     * }
     *
     * return (
     *   <Frame variants={container} animate="hidden">
     *     <Frame variants={item} size={50} />
     *     <Frame variants={item} size={50} />
     *   </Frame>
     * )
     * ```
     *
     * @motion
     *
     * ```jsx
     * const list = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { when: "afterChildren" }
     *   }
     * }
     *
     * const item = {
     *   hidden: {
     *     opacity: 0,
     *     transition: { duration: 2 }
     *   }
     * }
     *
     * return (
     *   <motion.ul variants={list} animate="hidden">
     *     <motion.li variants={item} />
     *     <motion.li variants={item} />
     *   </motion.ul>
     * )
     * ```
     *
     * @public
     */
    when?: false | "beforeChildren" | "afterChildren" | string;
    /**
     * When using variants, children animations will start after this duration
     * (in seconds). You can add the `transition` property to both the `Frame` and the `variant` directly. Adding it to the `variant` generally offers more flexibility, as it allows you to customize the delay per visual state.
     *
     * @library
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <Frame
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <Frame variants={item} size={50} />
     *     <Frame variants={item} size={50} />
     *   </Frame>
     * )
     * ```
     *
     * @motion
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <motion.ul
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <motion.li variants={item} />
     *     <motion.li variants={item} />
     *   </motion.ul>
     * )
     * ```
     *
     * @public
     */
    delayChildren?: number;
    /**
     * When using variants, animations of child components can be staggered by this
     * duration (in seconds).
     *
     * For instance, if `staggerChildren` is `0.01`, the first child will be
     * delayed by `0` seconds, the second by `0.01`, the third by `0.02` and so
     * on.
     *
     * The calculated stagger delay will be added to `delayChildren`.
     *
     * @library
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       staggerChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <Frame
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <Frame variants={item} size={50} />
     *     <Frame variants={item} size={50} />
     *   </Frame>
     * )
     * ```
     *
     * @motion
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       staggerChildren: 0.5
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <motion.ol
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <motion.li variants={item} />
     *     <motion.li variants={item} />
     *   </motion.ol>
     * )
     * ```
     *
     * @public
     */
    staggerChildren?: number;
    /**
     * The direction in which to stagger children.
     *
     * A value of `1` staggers from the first to the last while `-1`
     * staggers from the last to the first.
     *
     * @library
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5,
     *       staggerDirection: -1
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <Frame
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <Frame variants={item} size={50} />
     *     <Frame variants={item} size={50} />
     *   </Frame>
     * )
     * ```
     *
     * @motion
     *
     * ```jsx
     * const container = {
     *   hidden: { opacity: 0 },
     *   show: {
     *     opacity: 1,
     *     transition: {
     *       delayChildren: 0.5,
     *       staggerDirection: -1
     *     }
     *   }
     * }
     *
     * const item = {
     *   hidden: { opacity: 0 },
     *   show: { opacity: 1 }
     * }
     *
     * return (
     *   <motion.ul
     *     variants={container}
     *     initial="hidden"
     *     animate="show"
     *   >
     *     <motion.li variants={item} size={50} />
     *     <motion.li variants={item} size={50} />
     *   </motion.ul>
     * )
     * ```
     *
     * @public
     */
    staggerDirection?: 1 | -1;
}

declare type Output = (key: string, value: string | number | TransformTemplate | undefined) => void;

/**
 * @public
 */
declare interface PanHandlers {
    /**
     * Callback function that fires when the pan gesture is recognised on this element.
     *
     * @library
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onPan={onPan} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x` and `y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPan?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when the pan gesture begins on this element.
     *
     * @library
     *
     * ```jsx
     * function onPanStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onPanStart={onPanStart} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPanStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPanStart={onPanStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPanStart?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
    /**
     * Callback function that fires when we begin detecting a pan gesture. This
     * is analogous to `onMouseStart` or `onTouchStart`.
     *
     * @library
     *
     * ```jsx
     * function onPanSessionStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onPanSessionStart={onPanSessionStart} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPanSessionStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPanSessionStart={onPanSessionStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link EventInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     */
    onPanSessionStart?(event: MouseEvent | TouchEvent | PointerEvent, info: EventInfo): void;
    /**
     * Callback function that fires when the pan gesture ends on this element.
     *
     * @library
     *
     * ```jsx
     * function onPanEnd(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onPanEnd={onPanEnd} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPanEnd(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPanEnd={onPanEnd} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - A {@link PanInfo} object containing `x`/`y` values for:
     *
     *   - `point`: Relative to the device or page.
     *   - `delta`: Distance moved since the last event.
     *   - `offset`: Offset from the original pan event.
     *   - `velocity`: Current velocity of the pointer.
     */
    onPanEnd?(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}

/**
 * Passed in to pan event handlers like `onPan` the `PanInfo` object contains
 * information about the current state of the tap gesture such as its
 * `point`, `delta`, `offset` and `velocity`.
 *
 * @library
 *
 * ```jsx
 * function onPan(event, info) {
 *   console.log(info.point.x, info.point.y)
 * }
 *
 * <Frame onPan={onPan} />
 * ```
 *
 * @motion
 *
 * ```jsx
 * <motion.div onPan={(event, info) => {
 *   console.log(info.point.x, info.point.y)
 * }} />
 * ```
 *
 * @public
 */
declare interface PanInfo {
    /**
     * Contains `x` and `y` values for the current pan position relative
     * to the device or page.
     *
     * @library
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onPan={onPan} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    point: Point;
    /**
     * Contains `x` and `y` values for the distance moved since
     * the last event.
     *
     * @library
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.delta.x, info.delta.y)
     * }
     *
     * <Frame onPan={onPan} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.delta.x, info.delta.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    delta: Point;
    /**
     * Contains `x` and `y` values for the distance moved from
     * the first pan event.
     *
     * @library
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.offset.x, info.offset.y)
     * }
     *
     * <Frame onPan={onPan} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.offset.x, info.offset.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    offset: Point;
    /**
     * Contains `x` and `y` values for the current velocity of the pointer.
     *
     * @library
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.velocity.x, info.velocity.y)
     * }
     *
     * <Frame onPan={onPan} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onPan(event, info) {
     *   console.log(info.velocity.x, info.velocity.y)
     * }
     *
     * <motion.div onPan={onPan} />
     * ```
     *
     * @public
     */
    velocity: Point;
}

/**
 * @public
 */
declare type PassiveEffect<T> = (v: T, safeSetter: (v: T) => void) => void;

declare type PermissiveTransitionDefinition = {
    [key: string]: any;
};

/** @public */
declare interface Point {
    x: number;
    y: number;
}

/** @public */
declare namespace Point {
    /** @beta */
    const subtract: (a: Point, b: Point) => Point;
    /** @beta */
    const relativeTo: (idOrElem: string | HTMLElement) => ({ x, y }: Point) => Point | undefined;
}

declare type ReadValueFromSource = (key: string) => number | string;

/**
 * @public
 */
declare interface RelayoutInfo {
    delta: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

declare type RenderComponent<P = {}> = (ref: React.RefObject<Element>, style: React.CSSProperties, values: MotionValuesMap, props: P, isStatic?: boolean) => React.ReactElement;

/**
 * @public
 */
declare type ResolvedKeyframesTarget = [null, ...number[]] | number[] | [null, ...string[]] | string[];

/**
 * @public
 */
declare type ResolvedSingleTarget = string | number;

/**
 * @public
 */
declare type ResolvedValueTarget = ResolvedSingleTarget | ResolvedKeyframesTarget;

/**
 * @public
 */
declare type ResolveLayoutTransition = (info: RelayoutInfo) => Transition | boolean;

declare interface ScaleMotionValues {
    scaleX: MotionValue<number>;
    scaleY: MotionValue<number>;
}

declare interface ScrollMotionValues {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
}

/**
 * @public
 */
declare type SingleTarget = ResolvedSingleTarget | CustomValueType;

/**
 * An animation that simulates spring physics for realistic motion.
 * This is the default animation for physical values like `x`, `y`, `scale` and `rotate`.
 *
 * @public
 */
declare interface Spring {
    /**
     * Set `type` to `"spring"` to animate using spring physics for natural
     * movement. Type is set to `"spring"` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring"
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring' }}
     * />
     * ```
     *
     * @public
     */
    type: "spring";
    /**
     * Stiffness of the spring. Higher values will create more sudden movement.
     * Set to `100` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring",
     *   stiffness: 50
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.section
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', stiffness: 50 }}
     * />
     * ```
     *
     * @public
     */
    stiffness?: number;
    /**
     * Strength of opposing force. If set to 0, spring will oscillate
     * indefinitely. Set to `10` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring",
     *   damping: 300
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.a
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', damping: 300 }}
     * />
     * ```
     *
     * @public
     */
    damping?: number;
    /**
     * Mass of the moving object. Higher values will result in more lethargic
     * movement. Set to `1` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring",
     *   mass: 0.5
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.feTurbulence
     *   animate={{ baseFrequency: 0.5 } as any}
     *   transition={{ type: "spring", mass: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    mass?: number;
    /**
     * End animation if absolute speed (in units per second) drops below this
     * value and delta is smaller than `restDelta`. Set to `0.01` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring",
     *   restSpeed: 0.5
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', restSpeed: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    restSpeed?: number;
    /**
     * End animation if distance is below this value and speed is below
     * `restSpeed`. When animation ends, spring gets “snapped” to. Set to
     * `0.01` by default.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring",
     *   restDelta: 0.5
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', restDelta: 0.5 }}
     * />
     * ```
     *
     * @public
     */
    restDelta?: number;
    /**
     * The value to animate from.
     * By default, this is the initial state of the animating value.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring",
     *   from: 90
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', from: 90 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * @internal
     */
    to?: number | string | ValueTarget;
    /**
     * The initial velocity of the spring. By default this is the current velocity of the component.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   type: "spring",
     *   velocity: 2
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ type: 'spring', velocity: 2 }}
     * />
     * ```
     *
     * @public
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}

declare type StartAnimation = (complete: () => void) => () => void;

/**
 * @public
 */
declare type Subscriber<T> = (v: T) => void;

/**
 * Blanket-accept any SVG attribute as a `MotionValue`
 * @public
 */
declare type SVGAttributesAsMotionValues<T> = MakeMotion<SVGAttributesWithoutMotionProps<T>>;

declare interface SVGAttributesWithoutMotionProps<T> extends Pick<SVGAttributes<T>, Exclude<keyof SVGAttributes<T>, keyof MotionProps>> {
}

/**
 * @public
 */
declare interface SVGMotionProps<T> extends SVGAttributesAsMotionValues<T>, Omit<MotionProps, "positionTransition"> {
}

/**
 * @public
 */
declare interface SVGPathProperties {
    pathLength?: number;
    pathOffset?: number;
    pathSpacing?: number;
}

declare interface SyncLayoutProps {
    children: React.ReactNode;
}

/**
 * @public
 */
declare interface TapHandlers {
    /**
     * Callback when the tap gesture successfully ends on this element.
     *
     * @library
     *
     * ```jsx
     * function onTap(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onTap={onTap} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onTap(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTap={onTap} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTap?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Callback when the tap gesture starts on this element.
     *
     * @library
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onTapStart={onTapStart} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTapStart={onTapStart} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTapStart?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Callback when the tap gesture ends outside this element.
     *
     * @library
     *
     * ```jsx
     * function onTapCancel(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onTapCancel={onTapCancel} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onTapCancel(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTapCancel={onTapCancel} />
     * ```
     *
     * @param event - The originating pointer event.
     * @param info - An {@link TapInfo} object containing `x` and `y` values for the `point` relative to the device or page.
     */
    onTapCancel?(event: MouseEvent | TouchEvent | PointerEvent, info: TapInfo): void;
    /**
     * Properties or variant label to animate to while the component is pressed.
     *
     * @library
     *
     * ```jsx
     * <Frame whileTap={{ scale: 0.8 }} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div whileTap={{ scale: 0.8 }} />
     * ```
     */
    whileTap?: string | TargetAndTransition;
}

/**
 * Passed in to tap event handlers like `onTap` the `TapInfo` object contains
 * information about the tap gesture such as it‘s location.
 *
 * @library
 *
 * ```jsx
 * function onTap(event, info) {
 *   console.log(info.point.x, info.point.y)
 * }
 *
 * <Frame onTap={onTap} />
 * ```
 *
 * @motion
 *
 * ```jsx
 * function onTap(event, info) {
 *   console.log(info.point.x, info.point.y)
 * }
 *
 * <motion.div onTap={onTap} />
 * ```
 *
 * @public
 */
declare interface TapInfo {
    /**
     * Contains `x` and `y` values for the tap gesture relative to the
     * device or page.
     *
     * @library
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <Frame onTapStart={onTapStart} />
     * ```
     *
     * @motion
     *
     * ```jsx
     * function onTapStart(event, info) {
     *   console.log(info.point.x, info.point.y)
     * }
     *
     * <motion.div onTapStart={onTapStart} />
     * ```
     *
     * @public
     */
    point: Point;
}

declare type Target = MakeCustomValueType<TargetProperties>;

/**
 * An object that specifies values to animate to. Each value may be set either as
 * a single value, or an array of values.
 *
 * It may also option contain these properties:
 *
 * - `transition`: Specifies transitions for all or individual values.
 * - `transitionEnd`: Specifies values to set when the animation finishes.
 *
 * ```jsx
 * const target = {
 *   x: "0%",
 *   opacity: 0,
 *   transition: { duration: 1 },
 *   transitionEnd: { display: "none" }
 * }
 * ```
 *
 * @public
 */
declare type TargetAndTransition = TargetWithKeyframes & {
    transition?: Transition;
    transitionEnd?: Target;
};

declare type TargetProperties = CSSPropertiesWithoutTransitionOrSingleTransforms & SVGAttributes<SVGElement> & TransformProperties & CustomStyles;

declare type TargetResolver = (custom: any, current: Target, velocity: Target) => TargetAndTransition;

declare type TargetWithKeyframes = MakeKeyframes<Target>;

/**
 * Transforms numbers into other values by mapping them from an input range to an output range.
 * Returns the type of the input provided.
 *
 * @remarks
 *
 * Given an input range of `[0, 200]` and an output range of
 * `[0, 1]`, this function will return a value between `0` and `1`.
 * The input range must be a linear series of numbers. The output range
 * can be any supported value type, such as numbers, colors, shadows, arrays, objects and more.
 * Every value in the output range must be of the same type and in the same format.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, transform } from "framer"
 *
 * export function MyComponent() {
 *    const inputRange = [0, 200]
 *    const outputRange = [0, 1]
 *    const output = transform(100, inputRange, outputRange)
 *
 *    // Returns 0.5
 *    return <Frame>{output}</Frame>
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * import * as React from "react"
 * import { transform } from "framer-motion"
 *
 * export function MyComponent() {
 *    const inputRange = [0, 200]
 *    const outputRange = [0, 1]
 *    const output = transform(100, inputRange, outputRange)
 *
 *    // Returns 0.5
 *    return <div>{output}</div>
 * }
 * ```
 *
 * @param inputValue - A number to transform between the input and output ranges.
 * @param inputRange - A linear series of numbers (either all increasing or decreasing).
 * @param outputRange - A series of numbers, colors, strings, or arrays/objects of those. Must be the same length as `inputRange`.
 * @param options - Clamp: Clamp values to within the given range. Defaults to `true`.
 *
 * @public
 */
declare function transform<T>(inputValue: number, inputRange: number[], outputRange: T[], options?: TransformOptions<T>): T;

/**
 * @library
 *
 * For improved performance, `transform` can pre-calculate the function that will transform a value between two ranges.
 * Returns a function.
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, transform } from "framer"
 *
 * export function MyComponent() {
 *     const inputRange = [-200, -100, 100, 200]
 *     const outputRange = [0, 1, 1, 0]
 *     const convertRange = transform(inputRange, outputRange)
 *     const output = convertRange(-150)
 *
 *     // Returns 0.5
 *     return <Frame>{output}</Frame>
 * }
 *
 * ```
 *
 * @motion
 *
 * Transforms numbers into other values by mapping them from an input range to an output range.
 *
 * Given an input range of `[0, 200]` and an output range of
 * `[0, 1]`, this function will return a value between `0` and `1`.
 * The input range must be a linear series of numbers. The output range
 * can be any supported value type, such as numbers, colors, shadows, arrays, objects and more.
 * Every value in the output range must be of the same type and in the same format.
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, transform } from "framer"
 *
 * export function MyComponent() {
 *     const inputRange = [-200, -100, 100, 200]
 *     const outputRange = [0, 1, 1, 0]
 *     const convertRange = transform(inputRange, outputRange)
 *     const output = convertRange(-150)
 *
 *     // Returns 0.5
 *     return <div>{output}</div>
 * }
 *
 * ```
 *
 * @param inputRange - A linear series of numbers (either all increasing or decreasing).
 * @param outputRange - A series of numbers, colors or strings. Must be the same length as `inputRange`.
 * @param options - Clamp: clamp values to within the given range. Defaults to `true`.
 *
 * @public
 */
declare function transform<T>(inputRange: number[], outputRange: T[], options?: TransformOptions<T>): (inputValue: number) => T;

declare type Transformer<T> = (v: T) => T;

declare type Transformer_2<T> = (v: any) => T;

/**
 * @public
 */
declare interface TransformOptions<T> {
    /**
     * Clamp values to within the given range. Defaults to `true`
     *
     * @public
     */
    clamp?: boolean;
    /**
     * Easing functions to use on the interpolations between each value in the input and output ranges.
     *
     * If provided as an array, the array must be one item shorter than the input and output ranges, as the easings apply to the transition **between** each.
     *
     * @public
     */
    ease?: Easing_2 | Easing_2[];
    /**
     * @internal
     */
    mixer?: (from: T, to: T) => (v: number) => any;
}

declare interface TransformProperties {
    x?: string | number;
    y?: string | number;
    z?: string | number;
    translateX?: string | number;
    translateY?: string | number;
    translateZ?: string | number;
    rotate?: string | number;
    rotateX?: string | number;
    rotateY?: string | number;
    rotateZ?: string | number;
    scale?: string | number;
    scaleX?: string | number;
    scaleY?: string | number;
    scaleZ?: string | number;
    skew?: string | number;
    skewX?: string | number;
    skewY?: string | number;
    originX?: string | number;
    originY?: string | number;
    originZ?: string | number;
    perspective?: string | number;
}

declare type TransformTemplate = (transform: TransformProperties, generatedTransform: string) => string;

/**
 * Transition props
 *
 * @public
 */
declare type Transition = (Orchestration & TransitionDefinition) | (Orchestration & TransitionMap);

/**
 * @public
 */
declare type TransitionDefinition = Tween | Spring | Keyframes | Inertia | Just | None | PermissiveTransitionDefinition;

declare type TransitionMap = Orchestration & {
    [key: string]: TransitionDefinition;
};

/**
 * An animation that animates between two or more values over a specific duration of time.
 * This is the default animation for non-physical values like `color` and `opacity`.
 *
 * @public
 */
declare interface Tween {
    /**
     * Set `type` to `"tween"` to use a duration-based tween animation.
     * If any non-orchestration `transition` values are set without a `type` property,
     * this is used as the default animation.
     *
     * @library
     *
     * ```jsx
     * <Frame
     *   animate={{ opacity: 0 }}
     *   transition={{ duration: 2, type: "tween" }}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.path
     *   animate={{ pathLength: 1 }}
     *   transition={{ duration: 2, type: "tween" }}
     * />
     * ```
     *
     * @public
     */
    type?: "tween";
    /**
     * The duration of the tween animation. Set to `0.3` by default, 0r `0.8` if animating a series of keyframes.
     *
     * @library
     *
     * ```jsx
     * <Frame
     *   animate={{ opacity: 0 }}
     *   transition={{ duration: 2 }}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * const variants = {
     *   visible: {
     *     opacity: 1,
     *     transition: { duration: 2 }
     *   }
     * }
     * ```
     *
     * @public
     */
    duration?: number;
    /**
     * The easing function to use. Set as one of the below.
     *
     * - The name of an existing easing function.
     * - An array of four numbers to define a cubic bezier curve.
     * - An easing function, that accepts and returns a value `0-1`.
     *
     * If the animating value is set as an array of multiple values for a keyframes
     * animation, `ease` can be set as an array of easing functions to set different easings between
     * each of those values.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   ease: [0.17, 0.67, 0.83, 0.67]
     * }
     *
     * <Frame
     *   animate={{ opacity: 0 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ opacity: 0 }}
     *   transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
     * />
     * ```
     *
     * @public
     */
    ease?: Easing | Easing[];
    /**
     * The duration of time already elapsed in the animation. Set to `0` by
     * default.
     *
     * @internal
     */
    elapsed?: number;
    /**
     * When animating keyframes, `times` can be used to determine where in the animation each keyframe is reached.
     * Each value in `times` is a value between `0` and `1`, representing `duration`.
     *
     * There must be the same number of `times` as there are keyframes.
     * Defaults to an array of evenly-spread durations.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   times: [0, 0.1, 0.9, 1]
     * }
     *
     * <Frame
     *   animate={{ scale: [0, 1, 0.5, 1] }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ scale: [0, 1, 0.5, 1] }}
     *   transition={{ times: [0, 0.1, 0.9, 1] }}
     * />
     * ```
     *
     * @public
     */
    times?: number[];
    /**
     * When animating keyframes, `easings` can be used to define easing functions between each keyframe. This array should be one item fewer than the number of keyframes, as these easings apply to the transitions between the keyframes.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   easings: ["easeIn", "easeOut"]
     * }
     *
     * <Frame
     *   animate={{ backgroundColor: ["#0f0", "#00f", "#f00"] }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ backgroundColor: ["#0f0", "#00f", "#f00"] }}
     *   transition={{ easings: ["easeIn", "easeOut"] }}
     * />
     * ```
     *
     * @public
     */
    easings?: Easing[];
    /**
     * The number of times to loop the animation.
     * Set to `Infinity` for perpetual looping.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   loop: Infinity,
     *   ease: "linear",
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ rotate: 360 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 360 }}
     *   transition={{
     *     loop: Infinity,
     *     ease: "linear",
     *     duration: 2
     *   }}
     * />
     * ```
     *
     * @public
     */
    loop?: number;
    /**
     * The number of times to flip the animation by swapping the `to` and `from` values.
     * Set to `Infinity` for perpetual flipping.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   flip: Infinity,
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ opacity: 0 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ opacity: 0 }}
     *   transition={{ flip: Infinity, duration: 2 }}
     * />
     * ```
     *
     * @public
     */
    flip?: number;
    /**
     * The number of times to reverse the animation.
     * Set to `Infinity` for perpetual reversing.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   yoyo: Infinity,
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ yoyo: Infinity, duration: 2 }}
     * />
     * ```
     *
     * @public
     */
    yoyo?: number;
    /**
     * When repeating an animation using `loop`, `flip`, or `yoyo`, `repeatDelay` can set the
     * duration of the time to wait, in seconds, between each repetition.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   yoyo: Infinity,
     *   repeatDelay: 1
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ yoyo: Infinity, repeatDelay: 1 }}
     * />
     * ```
     *
     *
     * @public
     */
    repeatDelay?: number;
    /**
     * The value to animate from.
     * By default, this is the current state of the animating value.
     *
     * @library
     *
     * ```jsx
     * const transition = {
     *   from: 90,
     *   duration: 2
     * }
     *
     * <Frame
     *   animate={{ rotate: 180 }}
     *   transition={transition}
     * />
     * ```
     *
     * @motion
     *
     * ```jsx
     * <motion.div
     *   animate={{ rotate: 180 }}
     *   transition={{ from: 90, duration: 2 }}
     * />
     * ```
     *
     * @public
     */
    from?: number | string;
    /**
     * @internal
     */
    to?: number | string | ValueTarget;
    /**
     * @internal
     */
    velocity?: number;
    /**
     * @internal
     */
    delay?: number;
}

/**
 * When layout changes happen asynchronously to their instigating render (ie when exiting
 * children of `AnimatePresence` are removed), `SyncLayout` can wrap parent and sibling
 * components that need to animate as a result of this layout change.
 *
 * @motion
 *
 * ```jsx
 * const MyComponent = ({ isVisible }) => {
 *   return (
 *     <SyncLayout>
 *       <AnimatePresence>
 *         {isVisible && (
 *           <motion.div exit={{ opacity: 0 }} />
 *         )}
 *       </AnimatePresence>
 *       <motion.div positionTransition />
 *     </SyncLayout>
 *   )
 * }
 * ```
 *
 * @internalremarks
 *
 * The way this component works is by memoising a function and passing it down via context.
 * The function, when called, updates the local state, which is used to invalidate the
 * memoisation cache. A new function is called, performing a synced re-render of components
 * that are using the SyncLayoutContext.
 *
 * @internal
 */
declare const UnstableSyncLayout: ({ children }: SyncLayoutProps) => JSX.Element;

declare type UnwrapFactoryAttributes<F> = F extends React.DetailedHTMLFactory<infer P, any> ? P : never;

declare type UnwrapFactoryElement<F> = F extends React.DetailedHTMLFactory<any, infer P> ? P : never;

/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 *
 * @internal
 */
declare function unwrapMotionValue(value?: string | number | CustomValueType | MotionValue): string | number;

/**
 * Experimental API.
 *
 * Makes an animated version of `useState`.
 *
 * @remarks
 *
 * When the returned state setter is called, values will be animated to their new target.
 *
 * This allows the animation of arbitrary React components.
 *
 * **Note:** When animating DOM components, it's always preferable to use the `animate` prop, as Framer
 * will bypass React's rendering cycle with one optimised for 60fps motion. This Hook is specifically
 * for animating props on arbitrary React components, or for animating text content.
 *
 * ```jsx
 * const [state, setState] = useAnimatedState({ percentage: 0 })
 *
 * return (
 *   <Graph
 *     percentage={state.percentage}
 *     onTap={() => setState({ percentage: 50 })}
 *   />
 * )
 * ```
 *
 * @internalremarks
 *
 * TODO:
 * - Make hook accept a typed version of Target that accepts any value (not just DOM values)
 * - Allow hook to accept single values. ie useAnimatedState(0)
 * - Allow providing MotionValues via initialState.
 *
 * @beta
 */
declare function useAnimatedState(initialState: any): any[];

/**
 * Creates `AnimationControls`, which can be used to manually start, stop
 * and sequence animations on one or more components.
 *
 * The returned `AnimationControls` should be passed to the `animate` property
 * of the components you want to animate.
 *
 * These components can then be animated with the `start` method.
 *
 * @library
 *
 * ```jsx
 * import * as React from 'react'
 * import { Frame, useAnimation } from 'framer'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <Frame animate={controls} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * import * as React from 'react'
 * import { motion, useAnimation } from 'framer-motion'
 *
 * export function MyComponent(props) {
 *    const controls = useAnimation()
 *
 *    controls.start({
 *        x: 100,
 *        transition: { duration: 0.5 },
 *    })
 *
 *    return <motion.div animate={controls} />
 * }
 * ```
 *
 * @returns Animation controller with `start` and `stop` methods
 *
 * @public
 */
declare function useAnimation(): AnimationControls;

/**
 * Cycles through a series of visual properties. Can be used to toggle between or cycle through animations. It works similar to `useState` in React. It is provided an initial array of possible states, and returns an array of two arguments.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, useCycle } from "framer"
 *
 * export function MyComponent() {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <Frame
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @motion
 *
 * An index value can be passed to the returned `cycle` function to cycle to a specific index.
 *
 * ```jsx
 * import * as React from "react"
 * import { motion, useCycle } from "framer-motion"
 *
 * export const MyComponent = () => {
 *   const [x, cycleX] = useCycle(0, 50, 100)
 *
 *   return (
 *     <motion.div
 *       animate={{ x: x }}
 *       onTap={() => cycleX()}
 *      />
 *    )
 * }
 * ```
 *
 * @param items - items to cycle through
 * @returns [currentState, cycleState]
 *
 * @public
 */
declare function useCycle<T>(...items: T[]): CycleState<T>;

/**
 * Attaches an event listener directly to the provided DOM element.
 *
 * Bypassing React's event system can be desirable, for instance when attaching non-passive
 * event handlers.
 *
 * ```jsx
 * const ref = useRef(null)
 *
 * useDomEvent(ref, 'wheel', onWheel, { passive: false })
 *
 * return <div ref={ref} />
 * ```
 *
 * @param ref - React.RefObject that's been provided to the element you want to bind the listener to.
 * @param eventName - Name of the event you want listen for.
 * @param handler - Function to fire when receiving the event.
 * @param options - Options to pass to `Event.addEventListener`.
 *
 * @public
 */
declare function useDomEvent(ref: React.RefObject<Element>, eventName: string, handler?: EventListener | undefined, options?: AddEventListenerOptions): void;

/**
 * Uses the ref that is passed in, or creates a new one
 * @param external - External ref
 * @internal
 */
declare function useExternalRef<E = Element>(internalRef: React.RefObject<E>, externalRef?: React.Ref<E>): void;

/**
 * Add pan and tap gesture recognition to an element.
 *
 * @param props - Gesture event handlers
 * @param ref - React `ref` containing a DOM `Element`
 * @public
 */
declare function useGestures<GestureHandlers>(props: GestureHandlers, ref: React.RefObject<Element>): void;

/**
 * Returns a `MotionValue` each for `scaleX` and `scaleY` that update with the inverse
 * of their respective parent scales.
 *
 * This is useful for undoing the distortion of content when scaling a parent component.
 *
 * By default, `useInvertedScale` will automatically fetch `scaleX` and `scaleY` from the nearest parent.
 * By passing other `MotionValue`s in as `useInvertedScale({ scaleX, scaleY })`, it will invert the output
 * of those instead.
 *
 * @motion
 *
 * ```jsx
 * const MyComponent = () => {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <motion.div style={{ scaleX, scaleY }} />
 * }
 * ```
 *
 * @library
 *
 * ```jsx
 * function MyComponent() {
 *   const { scaleX, scaleY } = useInvertedScale()
 *   return <Frame scaleX={scaleX} scaleY={scaleY} />
 * }
 * ```
 *
 * @public
 */
declare function useInvertedScale(scale?: Partial<ScaleMotionValues>): ScaleMotionValues;

/**
 * Creates a `MotionValue` to track the state and velocity of a value.
 *
 * Usually, these are created automatically. For advanced use-cases, like use with `useTransform`, you can create `MotionValue`s externally and pass them into the animated component via the `style` prop.
 *
 * @library
 *
 * ```jsx
 * export function MyComponent() {
 *   const scale = useMotionValue(1)
 *
 *   return <Frame scale={scale} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const scale = useMotionValue(1)
 *
 *   return <motion.div style={{ scale }} />
 * }
 * ```
 *
 * @param initial - The initial state.
 *
 * @public
 */
declare function useMotionValue<T>(initial: T): MotionValue<T>;

/**
 *
 * @param handlers -
 * @param ref -
 *
 * @internalremarks
 * Currently this sets new pan gesture functions every render. The memo route has been explored
 * in the past but ultimately we're still creating new functions every render. An optimisation
 * to explore is creating the pan gestures and loading them into a `ref`.
 *
 * @internal
 */
declare function usePanGesture({ onPan, onPanStart, onPanEnd, onPanSessionStart }: PanHandlers, ref: React.RefObject<Element>): void;

/**
 * Creates a `MotionValue` that, when `set`, will use a spring animation to animate to its new state.
 *
 * It can either work as a stand-alone `MotionValue` by initialising it with a value, or as a subscriber
 * to another `MotionValue`.
 *
 * @remarks
 *
 * ```jsx
 * const x = useSpring(0, { stiffness: 300 })
 * const y = useSpring(x, { damping: 10 })
 * ```
 *
 * @param inputValue - `MotionValue` or number. If provided a `MotionValue`, when the input `MotionValue` changes, the created `MotionValue` will spring towards that value.
 * @param springConfig - Configuration options for the spring.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useSpring(source: MotionValue | number, config?: SpringProps): MotionValue<any>;

/**
 * @param handlers -
 * @internal
 */
declare function useTapGesture({ onTap, onTapStart, onTapCancel, whileTap, controls, }: TapHandlers & ControlsProp, ref: React.RefObject<Element>): void;

/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` through a function.
 * In this example, `y` will always be double `x`.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import { Frame, useMotionValue, useTransform } from "framer"
 *
 * export function MyComponent() {
 *   const x = useMotionValue(10)
 *   const y = useTransform(x, value => value * 2)
 *
 *   return <Frame x={x} y={y} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(10)
 *   const y = useTransform(x, value => value * 2)
 *
 *   return <motion.div style={{ x, y }} />
 * }
 * ```
 *
 * @param value - The `MotionValue` to transform the output of.
 * @param transform - Function that accepts the output of `value` and returns a new value.
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<T>(parent: MotionValue, transform: Transformer_2<T>): MotionValue;

/**
 * Create a `MotionValue` that transforms the output of another `MotionValue` by mapping it from one range of values into another.
 *
 * @remarks
 *
 * Given an input range of `[-200, -100, 100, 200]` and an output range of
 * `[0, 1, 1, 0]`, the returned `MotionValue` will:
 *
 * - When provided a value between `-200` and `-100`, will return a value between `0` and  `1`.
 * - When provided a value between `-100` and `100`, will return `1`.
 * - When provided a value between `100` and `200`, will return a value between `1` and  `0`
 *
 *
 * The input range must be a linear series of numbers. The output range
 * can be any value type supported by Framer Motion: numbers, colors, shadows, etc.
 *
 * Every value in the output range must be of the same type and in the same format.
 *
 * @library
 *
 * ```jsx
 * export function MyComponent() {
 *   const x = useMotionValue(0)
 *   const xRange = [-200, -100, 100, 200]
 *   const opacityRange = [0, 1, 1, 0]
 *   const opacity = useTransform(x, xRange, opacityRange)
 *
 *   return <Frame drag="x" x={x} opacity={opacity} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const x = useMotionValue(0)
 *   const xRange = [-200, -100, 100, 200]
 *   const opacityRange = [0, 1, 1, 0]
 *   const opacity = useTransform(x, xRange, opacityRange)
 *
 *   return <motion.div drag="x" style={{ opacity, x }} />
 * }
 * ```
 *
 * @param inputValue - `MotionValue`
 * @param inputRange - A linear series of numbers (either all increasing or decreasing)
 * @param outputRange - A series of numbers, colors or strings. Must be the same length as `inputRange`.
 * @param options -
 *
 *  - clamp: boolean - Clamp values to within the given range. Defaults to `true`
 *  - ease: EasingFunction[] - Easing functions to use on the interpolations between each value in the input and output ranges. If provided as an array, the array must be one item shorter than the input and output ranges, as the easings apply to the transition **between** each.
 *
 * @returns `MotionValue`
 *
 * @public
 */
declare function useTransform<T>(parent: MotionValue<number>, from: number[], to: T[], options?: TransformOptions<T>): MotionValue<T>;

/**
 * Provides `MotionValue`s that update when the viewport scrolls:
 *
 * - `scrollX` — Horizontal scroll distance in pixels.
 * - `scrollY` — Vertical scroll distance in pixels.
 * - `scrollXProgress` — Horizontal scroll progress between `0` and `1`.
 * - `scrollYProgress` — Vertical scroll progress between `0` and `1`.
 *
 * **Note:** If the returned scroll `MotionValue`s don't seem to be updating,
 * double check if the `body` tag styles are set to `width: 100%; height: 100%` or
 * similar, as this can break accurate measurement of viewport scroll.
 *
 * @library
 *
 * ```jsx
 * import * as React from "react"
 * import {
 *   Frame,
 *   useViewportScroll,
 *   useTransform
 * } from "framer"
 *
 * export function MyComponent() {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <Frame scaleX={scrollYProgress} />
 * }
 * ```
 *
 * @motion
 *
 * ```jsx
 * export const MyComponent = () => {
 *   const { scrollYProgress } = useViewportScroll()
 *   return <motion.div style={{ scaleX: scrollYProgress }} />
 * }
 * ```
 *
 * @internalremarks
 * This isn't technically a hook yet, but in the future it might be nice
 * to accept refs to elements and add scroll listeners to those, which
 * may involve the use of lifecycle.
 *
 * @public
 */
declare function useViewportScroll(): ScrollMotionValues;

declare interface ValueAnimationConfig {
    values: MotionValuesMap;
    readValueFromSource: ReadValueFromSource;
    makeTargetAnimatable?: MakeTargetAnimatable;
}

/**
 * Control animations for a single component
 * @internal
 */
declare class ValueAnimationControls<P extends {} = {}, V extends {} = {}> {
    /**
     * A reference to the component's latest props. We could probably ditch this in
     * favour to a reference to the `custom` prop now we don't send all props through
     * to target resolvers.
     */
    private props;
    /**
     * A reference to the component's motion values
     */
    private values;
    /**
     * The default transition to use for `Target`s without any `transition` prop.
     */
    private defaultTransition?;
    /**
     * The component's variants, as provided by `variants`
     */
    private variants;
    /**
     * A set of values that we animate back to when a value is cleared of all overrides.
     */
    private baseTarget;
    /**
     * A series of target overrides that we can animate to/from when overrides are set/cleared.
     */
    private overrides;
    /**
     * A series of target overrides as they were originally resolved.
     */
    private resolvedOverrides;
    /**
     * A Set of currently active override indexes
     */
    private activeOverrides;
    /**
     * A Set of children component controls for variant propagation.
     */
    private children?;
    /**
     * A Set of value keys that are currently animating.
     */
    private isAnimating;
    /**
     * In the event we attempt to animate a value that doesn't exist yet, we use this
     * function to attempt to read it from the source (ie the DOM, or React state etc)
     */
    private readValueFromSource;
    /**
     * A chance
     */
    private makeTargetAnimatable;
    constructor({ values, readValueFromSource, makeTargetAnimatable, }: ValueAnimationConfig);
    /**
     * Set the reference to the component's props.
     * @param props -
     */
    setProps(props: P & MotionProps): void;
    /**
     * Set the reference to the component's variants
     * @param variants -
     */
    setVariants(variants?: Variants): void;
    /**
     * Set the component's default transition
     * @param transition -
     */
    setDefaultTransition(transition?: Transition): void;
    /**
     * Set motion values without animation.
     *
     * @param target -
     * @param isActive -
     */
    private setValues;
    /**
     * Allows `transformValues` to be set by a component that allows us to
     * transform the values in a given `Target`. This allows Framer Library
     * to extend Framer Motion to animate `Color` variables etc. Currently we have
     * to manually support these extended types here in Framer Motion.
     *
     * @param values -
     */
    private transformValues;
    /**
     * Check a `Target` for new values we haven't animated yet, and add them
     * to the `MotionValueMap`.
     *
     * Currently there's functionality here that is DOM-specific, we should allow
     * this functionality to be injected by the factory that creates DOM-specific
     * components.
     *
     * @param target -
     */
    private checkForNewValues;
    /**
     * Check if the associated `MotionValueMap` has a key with the provided string.
     * Pre-bound to the class so we can provide directly to the `filter` in `checkForNewValues`.
     */
    private hasValue;
    /**
     * Resolve a variant from its label or resolver into an actual `Target` we can animate to.
     * @param variant -
     */
    private resolveVariant;
    /**
     * Get the highest active override priority index
     */
    private getHighestPriority;
    /**
     * Set an override. We add this layer of indirection so if, for instance, a tap gesture
     * starts and overrides a hover gesture, when we clear the tap gesture and fallback to the
     * hover gesture, if that hover gesture has changed in the meantime we can go to that rather
     * than the one that was resolved when the hover gesture animation started.
     *
     * @param definition -
     * @param overrideIndex -
     */
    setOverride(definition: AnimationDefinition, overrideIndex: number): void;
    /**
     * Start an override animation.
     * @param overrideIndex -
     */
    startOverride(overrideIndex: number): Promise<void> | undefined;
    /**
     * Clear an override. We check every value we animated to in this override to see if
     * its present on any lower-priority overrides. If not, we animate it back to its base target.
     * @param overrideIndex -
     */
    clearOverride(overrideIndex: number): void;
    /**
     * Apply a target/variant without any animation
     */
    apply(definition: VariantLabels | TargetAndTransition): void;
    /**
     * Apply variant labels without animation
     */
    private applyVariantLabels;
    start(definition: AnimationDefinition, opts?: AnimationOptions): Promise<void>;
    private animate;
    private animateVariantLabels;
    private animateVariant;
    private animateChildren;
    private onStart;
    private onComplete;
    private checkOverrideIsAnimating;
    private resetIsAnimating;
    stop(): void;
    /**
     * Add the controls of a child component.
     * @param controls -
     */
    addChild(controls: ValueAnimationControls): void;
    removeChild(controls: ValueAnimationControls): void;
    resetChildren(): void;
}

/**
 * @public
 */
declare type ValueTarget = SingleTarget | KeyframesTarget;

/**
 * @public
 */
declare type Variant = TargetAndTransition | TargetResolver;

/**
 * Either a string, or array of strings, that reference variants defined via the `variants` prop.
 * @public
 */
declare type VariantLabels = string | string[];

/**
 * @public
 */
declare type Variants = {
    [key: string]: Variant;
};
