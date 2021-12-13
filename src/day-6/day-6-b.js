let input = [
  5, 3, 2, 2, 1, 1, 4, 1, 5, 5, 1, 3, 1, 5, 1, 2, 1, 4, 1, 2, 1, 2, 1, 4, 2, 4,
  1, 5, 1, 3, 5, 4, 3, 3, 1, 4, 1, 3, 4, 4, 1, 5, 4, 3, 3, 2, 5, 1, 1, 3, 1, 4,
  3, 2, 2, 3, 1, 3, 1, 3, 1, 5, 3, 5, 1, 3, 1, 4, 2, 1, 4, 1, 5, 5, 5, 2, 4, 2,
  1, 4, 1, 3, 5, 5, 1, 4, 1, 1, 4, 2, 2, 1, 3, 1, 1, 1, 1, 3, 4, 1, 4, 1, 1, 1,
  4, 4, 4, 1, 3, 1, 3, 4, 1, 4, 1, 2, 2, 2, 5, 4, 1, 3, 1, 2, 1, 4, 1, 4, 5, 2,
  4, 5, 4, 1, 2, 1, 4, 2, 2, 2, 1, 3, 5, 2, 5, 1, 1, 4, 5, 4, 3, 2, 4, 1, 5, 2,
  2, 5, 1, 4, 1, 5, 1, 3, 5, 1, 2, 1, 1, 1, 5, 4, 4, 5, 1, 1, 1, 4, 1, 3, 3, 5,
  5, 1, 5, 2, 1, 1, 3, 1, 1, 3, 2, 3, 4, 4, 1, 5, 5, 3, 2, 1, 1, 1, 4, 3, 1, 3,
  3, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 5, 1, 2, 2, 5, 2, 4, 1, 1, 2, 4, 1, 2, 3, 4,
  1, 2, 1, 2, 4, 2, 1, 1, 5, 3, 1, 4, 4, 4, 1, 5, 2, 3, 4, 4, 1, 5, 1, 2, 2, 4,
  1, 1, 2, 1, 1, 1, 1, 5, 1, 3, 3, 1, 1, 1, 1, 4, 1, 2, 2, 5, 1, 2, 1, 3, 4, 1,
  3, 4, 3, 3, 1, 1, 5, 5, 5, 2, 4, 3, 1, 4,
]

// input = [3, 4, 3, 1, 2]
// input = [6, 5]
const totalDays = 256

// Caso: un solo pesce di 7 giorni
// Ogni 7 giorni ne crea uno, quindi posso calcolare quanti figli fa lui direttamente => ne crea totalDays / 7
// Ciascun figlio aspetta due giorni e poi ogni 7 giorni ne crea uno

// Es: 20 giorni
// crea 20/7 = 2 figli, il primo al giorno 7 e il secondo al giorno 14
// Ogni figlio non ha totalDays giorni a venire, ma totalDays meno il giorno in cui è nato.
// Il primo figlio ha 20 - 7 = 13 giorni di speranza di vita. Ne tolgo 2 e rientro nel caso di prima.
// Il primo figlio ha 20 - 14 = 6 giorni di speranza di vita. Ne tolgo 2 e rientro nel caso di prima.
// Quindi:
// Il padre fa 20/7 = 2 figli
// Il primo fa (20 - 7 - 2) / 7 = 1 figlio
// Il secondo fa (20 - 14 - 2) / 7 = 0 figli
// Il figlio del primo figlio fa (20 - 7 - 2 - 7 - 2) / 7 = 0 figli

const numFigliPerGiorniDiVita = (giorniDiVita) => Math.floor(giorniDiVita / 7)

const getNumDiscendenti = (giorniDiVita) => {
  if (!getNumDiscendenti.cache) {
    getNumDiscendenti.cache = []
  }
  if (getNumDiscendenti.cache[giorniDiVita]) {
    return getNumDiscendenti.cache[giorniDiVita]
  }
  const numFigli = numFigliPerGiorniDiVita(giorniDiVita)
  if (numFigli === 0) {
    return 0
  }
  let numDiscendenti = 0
  for (let i = 1; i <= numFigli; i++) {
    numDiscendenti += 1 + getNumDiscendenti(giorniDiVita - 7 * i - 2)
  }
  getNumDiscendenti.cache[giorniDiVita] = numDiscendenti
  return numDiscendenti
}

const totalFishes = input.reduce((acc, fish, fishIndex) => {
  return acc + 1 + getNumDiscendenti(totalDays + 6 - input[fishIndex])
}, 0)

console.log('totalFishes', totalFishes) // 1631647919273
