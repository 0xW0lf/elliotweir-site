export function calculateSubnet(input: string, prefix: number) {
  const parts = input.trim().split('.');
  if (parts.length !== 4 || parts.some(p => !/^(0|[1-9]\d{0,2})$/.test(p) || Number(p) > 255)) throw Error('Enter four numbers from 0 to 255, for example 192.168.1.42.');
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) throw Error('Choose a prefix between 0 and 32.');
  const ip = parts.reduce((value, part) => value * 256 + Number(part), 0);
  const size = 2 ** (32 - prefix);
  const network = Math.floor(ip / size) * size;
  const last = network + size - 1;
  const format = (n: number) => [24,16,8,0].map(shift => Math.floor(n / 2 ** shift) % 256).join('.');
  return {
    address: format(ip), cidr: `${format(network)}/${prefix}`, network: format(network),
    mask: format(2 ** 32 - size), wildcard: format(size - 1), last: format(last),
    firstHost: format(prefix >= 31 ? network : network + 1),
    lastHost: format(prefix >= 31 ? last : last - 1),
    total: size, usable: prefix >= 31 ? size : size - 2,
    binary: parts.map(p => Number(p).toString(2).padStart(8,'0')).join(''),
    position: ip - network,
  };
}
