/*
 **
 **     Main
 **
 */
async function main() {
  let command = await input();
  await parse(command);

  main();
}

function pause(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, Number(ms)));
}

function INIT() {
  boot();
}
INIT();
