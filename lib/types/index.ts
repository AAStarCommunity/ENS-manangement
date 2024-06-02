export type CacheStrategy =
    | {
        ttl: number;
        swr: number;
    }
    | {
        ttl: number;
    }
    | {
        swr: number;
    };

export type AccelerateInfo = {
    cacheStatus: "ttl" | "swr" | "miss" | "none";
    lastModified: Date;
    region: string;
    requestId: string;
    signature: string;
};

export type Ens = {
    node: string;
    address: { [key: string]: string };
    text: { [key: string]: string };
    contenthash: string;
};

export type EnsWithId = Ens & { id: number };

export type EnsResult = {
    data: Ens[];
    info: AccelerateInfo;
    time: number;
};

export type QuoteCacheType = "SWR" | "TTL" | "No caching" | "TTL + SWR";