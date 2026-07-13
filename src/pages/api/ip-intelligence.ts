import type { APIRoute } from "astro";

export const prerender = false;

type JsonObject = Record<string, unknown>;

function jsonResponse(data: JsonObject, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function isValidIPv4(value: string): boolean {
  const parts = value.split(".");

  return (
    parts.length === 4 &&
    parts.every((part) => {
      if (!/^\d{1,3}$/.test(part)) return false;

      const number = Number(part);
      return number >= 0 && number <= 255;
    })
  );
}

function isPossibleIPv6(value: string): boolean {
  return (
    value.includes(":") &&
    value.length <= 45 &&
    /^[0-9a-f:]+$/i.test(value)
  );
}

function isValidIPAddress(value: string): boolean {
  return isValidIPv4(value) || isPossibleIPv6(value);
}

function reverseIPv4(ip: string): string {
  return `${ip.split(".").reverse().join(".")}.in-addr.arpa`;
}

function expandIPv6(address: string): string[] {
  const halves = address.split("::");
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves[1] ? halves[1].split(":") : [];
  const missingGroups = Math.max(0, 8 - left.length - right.length);

  return [...left, ...Array(missingGroups).fill("0"), ...right].map((group) =>
    group.padStart(4, "0"),
  );
}

function reverseIPv6(ip: string): string {
  return `${expandIPv6(ip).join("").split("").reverse().join(".")}.ip6.arpa`;
}

function getReverseDNSName(ip: string): string {
  return isValidIPv4(ip) ? reverseIPv4(ip) : reverseIPv6(ip);
}

function getEntityName(entity: any): string | null {
  const entries = entity?.vcardArray?.[1];

  if (!Array.isArray(entries)) return null;

  const nameEntry = entries.find((entry: unknown[]) => entry?.[0] === "fn");

  return typeof nameEntry?.[3] === "string" ? nameEntry[3] : null;
}

function getAbuseEmail(entities: any[]): string | null {
  for (const entity of entities ?? []) {
    const roles = Array.isArray(entity?.roles) ? entity.roles : [];

    if (!roles.includes("abuse")) continue;

    const entries = entity?.vcardArray?.[1];

    if (!Array.isArray(entries)) continue;

    const emailEntry = entries.find(
      (entry: unknown[]) => entry?.[0] === "email",
    );

    if (typeof emailEntry?.[3] === "string") {
      return emailEntry[3];
    }
  }

  return null;
}

async function fetchJSON(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Portfolio-IP-Intelligence/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export const GET: APIRoute = async ({ request }) => {
  const requestURL = new URL(request.url);
  const ip = requestURL.searchParams.get("ip")?.trim() ?? "";

  if (!isValidIPAddress(ip)) {
    return jsonResponse({ error: "Enter a valid IPv4 or IPv6 address." }, 400);
  }

  const reverseName = getReverseDNSName(ip);

  try {
    const [geoResult, rdapResult, dnsResult] = await Promise.allSettled([
      fetchJSON(`https://ipapi.co/${encodeURIComponent(ip)}/json/`),
      fetchJSON(`https://rdap.org/ip/${encodeURIComponent(ip)}`),
      fetchJSON(
        `https://dns.google/resolve?name=${encodeURIComponent(
          reverseName,
        )}&type=PTR`,
      ),
    ]);

    const geo = geoResult.status === "fulfilled" ? geoResult.value : {};
    const rdap = rdapResult.status === "fulfilled" ? rdapResult.value : {};
    const dns = dnsResult.status === "fulfilled" ? dnsResult.value : {};

    const ptrRecords = Array.isArray(dns?.Answer)
      ? dns.Answer.map((answer: any) => String(answer?.data ?? ""))
          .filter(Boolean)
          .map((hostname: string) => hostname.replace(/\.$/, ""))
      : [];

    const registrationEntity =
      Array.isArray(rdap?.entities) && rdap.entities.length > 0
        ? rdap.entities
            .map(getEntityName)
            .find((name: string | null) => Boolean(name)) ?? null
        : null;

    return jsonResponse({
      ip,
      location: {
        city: geo.city ?? null,
        region: geo.region ?? null,
        country: geo.country_name ?? null,
        countryCode: geo.country_code ?? null,
        continentCode: geo.continent_code ?? null,
        postalCode: geo.postal ?? null,
        latitude: geo.latitude ?? null,
        longitude: geo.longitude ?? null,
        timezone: geo.timezone ?? null,
        utcOffset: geo.utc_offset ?? null,
      },
      network: {
        asn: geo.asn ?? null,
        organisation: geo.org ?? null,
        network: geo.network ?? null,
        version: geo.version ?? null,
        reverseDNS: ptrRecords,
      },
      registration: {
        handle: rdap.handle ?? null,
        name: rdap.name ?? registrationEntity,
        type: rdap.type ?? null,
        startAddress: rdap.startAddress ?? null,
        endAddress: rdap.endAddress ?? null,
        country: rdap.country ?? null,
        parentHandle: rdap.parentHandle ?? null,
        port43: rdap.port43 ?? null,
        abuseEmail: getAbuseEmail(rdap.entities ?? []),
      },
      availability: {
        geolocation: geoResult.status === "fulfilled" && !geo?.error,
        registration: rdapResult.status === "fulfilled",
        reverseDNS: dnsResult.status === "fulfilled",
      },
      sources: {
        geolocation: {
          name: "ipapi.co",
          description:
            "Approximate location, ASN, organisation and network range.",
        },
        registration: {
          name: "RDAP.org",
          description:
            "Registered network name, allocation range and abuse contact.",
        },
        reverseDNS: {
          name: "Google Public DNS",
          description: "PTR records for reverse DNS hostnames.",
        },
      },
    });
  } catch (error) {
    console.error("IP intelligence lookup failed:", error);

    return jsonResponse(
      { error: "The IP intelligence lookup could not be completed." },
      500,
    );
  }
};
