const useTestInput = false
let input
if (useTestInput) {
  input = '9C0141080250320F1802104A08'
} else {
  input =
    'A20D74AFC6C80CEA7002D4009202C7C00A6830029400F500218080C3002D006CC2018658056E7002DC00C600E75002ED6008EDC00D4003E24A13995080513FA309482649458A054C6E00E6008CEF204BA00B080311B21F4101006E1F414846401A55002F53E9525B845AA7A789F089402997AE3AFB1E6264D772D7345C6008D8026200E41D83B19C001088CB04A294ADD64C0129D818F802727FFF3500793FFF9A801A801539F42200DC3801A39C659ACD3FC6E97B4B1E7E94FC1F440219DAFB5BB1648E8821A4FF051801079C379F119AC58ECC011A005567A6572324D9AE6CCD003639ED7F8D33B8840A666B3C67B51388440193E003413A3733B85F2712DEBB59002B930F32A7D0688010096019375300565146801A194844826BB7132008024C8E4C1A69E66108000D39BAD950802B19839F005A56D9A554E74C08028992E95D802D2764D93B27900501340528A7301F2E0D326F274BCAB00F5009A737540916D9A9D1EA7BD849100425D9E3A9802B800D24F669E7691E19CFFE3AF280803440086C318230DCC01E8BF19E33980331D631C593005E80330919D718EFA0E3233AE31DF41C67F5CB5CAC002758D7355DD57277F6BF1864E9BED0F18031A95DDF99EB7CD64626EF54987AE007CCC3C4AE0174CDAD88E65F9094BC4025FB2B82C6295F04100109263E800FA41792BCED1CC3A233C86600B48FFF5E522D780120C9C3D89D8466EFEA019009C9600A880310BE0C47A100761345E85F2D7E4769240287E80272D3CEFF1C693A5A79DFE38D27CCCA75E5D00803039BFF11F401095F714657DC56300574010936491FBEC1D8A4402234E1E68026200CC5B8FF094401C89D12E14B803325DED2B6EA34CA248F2748834D0E18021339D4F962AB005E78AE75D08050E10066114368EE0008542684F0B40010B8AB10630180272E83C01998803104E14415100623E469821160'
}

const hex2bin = (hex) =>
  hex
    .split('')
    .map((i) => parseInt(i, 16).toString(2).padStart(4, '0'))
    .join('')

const bin2dec = (bin) => parseInt(bin, 2)

const consumeNextPacket = (str) => {
  const version = bin2dec(str.slice(0, 3))
  const type = bin2dec(str.slice(3, 6))
  // console.log('packet', str, version, type)
  if (type === 4) {
    const res = consumeNextLiteral(str.slice(6))
    return {
      version,
      type,
      ...res,
      totalVersion: version,
    }
  } else {
    const lengthType = str[6]
    const res = consumeNextOperation(lengthType, str.slice(7))
    const returnedValue = {
      version,
      type,
      lengthType,
      ...res,
      totalVersion: res.subPackets.reduce(
        (acc, p) => acc + p.totalVersion,
        version
      ),
    }
    switch (type) {
      case 0:
        returnedValue.literal = res.subPackets.reduce(
          (acc, p) => acc + p.literal,
          0
        )
        break
      case 1:
        returnedValue.literal = res.subPackets.reduce(
          (acc, p) => acc * p.literal,
          1
        )
        break
      case 2:
        returnedValue.literal = Math.min(
          ...res.subPackets.map((p) => p.literal)
        )
        break
      case 3:
        returnedValue.literal = Math.max(
          ...res.subPackets.map((p) => p.literal)
        )
        break
      case 5:
        returnedValue.literal =
          res.subPackets[0].literal > res.subPackets[1].literal ? 1 : 0
        break
      case 6:
        returnedValue.literal =
          res.subPackets[0].literal < res.subPackets[1].literal ? 1 : 0
        break
      case 7:
        returnedValue.literal =
          res.subPackets[0].literal === res.subPackets[1].literal ? 1 : 0
        break
      default:
        throw new Error(`Unexpectd type ${type}`)
    }
    return returnedValue
  }
}

const consumeNextLiteral = (str) => {
  // console.log('literal', str)
  let binLiteral = ''
  let rest = str
  while (rest[0] === '1') {
    binLiteral += rest.slice(1, 5)
    rest = rest.slice(5)
  }
  binLiteral += rest.slice(1, 5)
  // const extraZeros = 4 - ((str.length - rest.length + 6) % 4)
  const extraZeros = 0
  rest = rest.slice(5 + extraZeros)
  return {
    literal: bin2dec(binLiteral),
    rest: rest,
  }
}

const consumeNextOperation = (lengthType, str) => {
  let rest = str
  let subPacketsLength = null
  let subPacketsCount = null
  const subPackets = []
  if (lengthType === '0') {
    subPacketsLength = bin2dec(rest.slice(0, 15))
    let operationRest = rest.slice(15, 15 + subPacketsLength)
    rest = rest.slice(15 + subPacketsLength)
    // console.log('operation', str, lengthType, subPacketsLength, subPacketsCount)
    while (operationRest.length > 6) {
      const subPacket = consumeNextPacket(operationRest)
      subPackets.push(subPacket)
      operationRest = subPacket.rest
    }
  } else {
    subPacketsCount = bin2dec(rest.slice(0, 11))
    // console.log('operation', str, lengthType, subPacketsLength, subPacketsCount)
    rest = rest.slice(11)
    while (subPacketsCount-- > 0) {
      const subPacket = consumeNextPacket(rest)
      subPackets.push(subPacket)
      rest = subPacket.rest
    }
  }
  return {
    subPackets,
    rest,
    subPacketsLength,
    subPacketsCount,
  }
}

console.log(input, JSON.stringify(consumeNextPacket(hex2bin(input)), null, 2))
