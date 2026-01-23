
const JWT_SECRET = 'qa-pro-prod-secret-2025-x99';

export class AuthService {
  async sign(payload: any): Promise<string> {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const data = btoa(JSON.stringify({ ...payload, exp: Date.now() + 86400000 }));
    const signature = await this.generateSignature(header + '.' + data);
    return `${header}.${data}.${signature}`;
  }

  async verify(token: string): Promise<any | null> {
    try {
      const [header, data, signature] = token.split('.');
      const expectedSignature = await this.generateSignature(header + '.' + data);
      
      if (signature !== expectedSignature) {
        console.error("[AUTH] Signature mismatch detected.");
        return null;
      }
      
      const payload = JSON.parse(atob(data));
      if (Date.now() > payload.exp) {
        console.warn("[AUTH] Token expired.");
        return null;
      }
      return payload;
    } catch (e) {
      console.error("[AUTH] Token verification failed", e);
      return null;
    }
  }

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'salt_v1');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return this.bufferToHex(hashBuffer);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const newHash = await this.hashPassword(password);
    return newHash === hash;
  }

  private async generateSignature(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str + JWT_SECRET);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return this.bufferToHex(hashBuffer);
  }

  private bufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
}

export const authService = new AuthService();
