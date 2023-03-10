/// <reference types="node" />
import * as http from "http";
import { ProxyInfo } from "./ProxyInfo";
export declare class CertCheckAgent {
    static testTimeOffset: number;
    static forceDisableOCSPStapling: boolean;
    private static privMemCache;
    private static privDiskCache;
    private privProxyInfo;
    constructor(proxyInfo?: ProxyInfo);
    static forceReinitDiskCache(): void;
    GetAgent(disableStapling?: boolean): http.Agent;
    private static GetProxyAgent;
    private static OCSPCheck;
    private static GetIssuer;
    private static GetResponseFromCache;
    private static VerifyOCSPResponse;
    private static UpdateCache;
    private static StoreCacheEntry;
    private static StoreMemoryCacheEntry;
    private static StoreDiskCacheEntry;
    private static GetOCSPResponse;
    private static onEvent;
    private CreateConnection;
}
