export default {
  invalid: (name) => `${name} tidak valid`,
  minLength: (min) => `Password minimal ${min} angka`,
  required: (name) => `${name} tidak boleh kosong`,
  notFound: (name) => `${name} tidak ditemukan`,
  incorrect: (name) => `${name} salah`,
  duplicate: (name, value) => `${name} ${value} telah dipakai`,
  oneOf: (name, ...args) =>
    `${name} harus salah satu diantara ${args.map((v) => `'${v}'`).join(', ')}`,
}
