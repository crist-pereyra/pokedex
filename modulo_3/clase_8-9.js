function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) {
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
  return x + a + b;
  //throw new Error('Error');
}

try {
  add1(10).then((v) => {
    console.log(v); // imprime 60 despues de 4 segundos.
  });
} catch (e) {
  console.log(e);
}

async function add2(x) {
  const p_a = resolveAfter2Seconds(20);
  const p_b = resolveAfter2Seconds(30);
  return x + (await p_a) + (await p_b);
}

add2(10).then((v) => {
  console.log(v); //imprime 60 después de 2 segundos.
});
