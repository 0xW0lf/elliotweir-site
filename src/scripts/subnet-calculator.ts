import { calculateSubnet } from '../lib/subnet';
const ip = document.querySelector<HTMLInputElement>('#ip-address')!;
const slider = document.querySelector<HTMLInputElement>('#prefix-slider')!;
const number = document.querySelector<HTMLInputElement>('#prefix-number')!;
const error = document.querySelector<HTMLElement>('#ip-error')!;
const results = document.querySelector<HTMLElement>('#subnet-results')!;
const status = document.querySelector<HTMLElement>('#calculator-status')!;
const set = (id: string, value: string | number) => { document.getElementById(id)!.textContent = String(value); };
let current = '';
function update(prefix: number) {
  try {
    const subnet = calculateSubnet(ip.value, prefix);
    ip.removeAttribute('aria-invalid'); number.removeAttribute('aria-invalid');
    error.hidden = true; results.hidden = false;
    slider.value = number.value = String(prefix);
    slider.setAttribute('aria-valuetext', `/${prefix}, ${subnet.total.toLocaleString()} addresses`);
    set('prefix-value', `/${prefix}`); set('results-title', subnet.cidr); current = subnet.cidr;
    for (const name of ['network','mask','wildcard','last'] as const) set(name, subnet[name]);
    set('total', subnet.total.toLocaleString()); set('usable', subnet.usable.toLocaleString());
    set('bit-count', `${prefix} / ${32-prefix}`);
    set('last-label', prefix >= 31 ? 'Last address (no broadcast)' : 'Broadcast address');
    set('usable-label', prefix === 32 ? 'Single address' : prefix === 31 ? 'Point-to-point endpoints' : 'Usable hosts');
    set('range-label', prefix === 32 ? 'Host route' : prefix === 31 ? 'Endpoint range' : 'Usable host range');
    set('range', prefix === 32 ? subnet.firstHost : `${subnet.firstHost} – ${subnet.lastHost}`);
    set('subnet-note', prefix === 32 ? 'A /32 selects one address. There are no separate network or broadcast reservations.' : prefix === 31 ? 'RFC 3021 point-to-point semantics: both addresses are endpoints; no broadcast reservation.' : 'Usable host counts exclude the network and broadcast addresses. Cloud platforms may reserve additional addresses.');
    const binary = document.getElementById('binary')!; binary.replaceChildren();
    for (let octet = 0; octet < 4; octet++) {
      const group = document.createElement('span'); group.className = 'octet';
      for (let bit = octet*8; bit < octet*8+8; bit++) {
        const element = document.createElement('span'); element.textContent = subnet.binary[bit];
        element.className = `bit ${bit < prefix ? 'network-bit' : 'host-bit'}`;
        group.append(element);
      }
      binary.append(group);
    }
    binary.setAttribute('aria-label', `${subnet.address} in binary: ${subnet.binary.match(/.{8}/g)!.join(' ')}. ${prefix} network bits, ${32-prefix} host bits.`);
    document.querySelectorAll<HTMLButtonElement>('[data-prefix]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.prefix) === prefix)));
    status.textContent = '';
  } catch (cause) {
    error.textContent = cause instanceof Error ? cause.message : 'Check the address and prefix.';
    error.hidden = false; results.hidden = true; current = '';
    ip.setAttribute('aria-invalid', String(!Number.isInteger(prefix) || prefix < 0 || prefix > 32 ? false : true));
    number.setAttribute('aria-invalid', String(!Number.isInteger(prefix) || prefix < 0 || prefix > 32));
  }
}
slider.addEventListener('input', () => update(Number(slider.value)));
number.addEventListener('input', () => update(number.value === '' ? NaN : Number(number.value)));
ip.addEventListener('input', () => update(number.value === '' ? NaN : Number(number.value)));
document.querySelectorAll<HTMLButtonElement>('[data-prefix]').forEach(button => button.addEventListener('click', () => update(Number(button.dataset.prefix))));
document.getElementById('copy-subnet')!.addEventListener('click', async () => {
  if (!current) return;
  try { await navigator.clipboard.writeText(current); status.textContent = `Copied ${current}.`; }
  catch { status.textContent = 'Copy unavailable. Select the subnet above to copy it manually.'; }
});
update(24);
