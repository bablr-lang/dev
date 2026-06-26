import { createBLAKE3 } from 'hash-wasm';

const blake3 = await createBLAKE3();

blake3.update('foo');

console.log(blake3.digest());
