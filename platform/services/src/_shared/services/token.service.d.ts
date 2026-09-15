/**
 * Token Service — JWT for optional FI operator sessions (stub identity).
 */
export interface TokenClaims {
    userId: string;
    email: string;
    role: string;
    tenantId?: string;
    clientId?: string;
    scopes?: string[];
}
export declare function generateAccessToken(claims: TokenClaims): string;
export declare function generateRefreshToken(claims: TokenClaims): string;
