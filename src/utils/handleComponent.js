export default function handleComponent(obj) {
  let {component, render} = obj;
  if (render) {
    return {
      functional: true,
      render
    };
  } else {
    return component;
  }
};
