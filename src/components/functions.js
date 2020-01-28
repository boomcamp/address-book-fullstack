const generator = () => {
  let hex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  if(hex.length < 7) {
    generator();
  }
  return hex;
}
export { generator };