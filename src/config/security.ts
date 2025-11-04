// Security configuration for the frontend application
// Defines security policies, CSP headers, and validation rules

export const securityConfig = {
  // Content Security Policy
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'", "https://hdkrfwgcmkxeeazkceiv.supabase.co"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      workerSrc: ["'self'"]
    },
    reportOnly: false
  },

  // HTTP Security Headers
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  },

  // Input validation rules
  validation: {
    // Form field limits
    maxFieldLengths: {
      text: 1000,
      email: 254,
      password: 128,
      name: 50,
      description: 2000,
      bio: 500,
      title: 200
    },

    // Allowed file types
    allowedFileTypes: {
      images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      documents: ['application/pdf', 'text/plain'],
      videos: ['video/mp4', 'video/webm'],
      audio: ['audio/mp3', 'audio/wav', 'audio/ogg']
    },

    // File size limits (in bytes)
    maxFileSizes: {
      images: 5 * 1024 * 1024, // 5MB
      documents: 10 * 1024 * 1024, // 10MB
      videos: 100 * 1024 * 1024, // 100MB
      audio: 50 * 1024 * 1024 // 50MB
    },

    // URL validation patterns
    urlPatterns: {
      safe: /^https?:\/\/(?:[-\w.])+(?:[:\d]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:#(?:\w)*)?)?$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      phone: /^\+?[1-9]\d{1,14}$/,
      postalCode: /^[A-Za-z0-9\s\-]{3,10}$/
    }
  },

  // Rate limiting configuration
  rateLimiting: {
    // API call limits
    apiCalls: {
      recommendations: { requests: 10, window: 60000 }, // 10 per minute
      assessments: { requests: 3, window: 300000 }, // 3 per 5 minutes
      uploads: { requests: 5, window: 60000 }, // 5 per minute
      general: { requests: 100, window: 60000 } // 100 per minute
    },

    // User action limits
    actions: {
      formSubmissions: { requests: 5, window: 60000 },
      searches: { requests: 20, window: 60000 },
      enrollments: { requests: 3, window: 300000 }
    }
  },

  // Session security
  session: {
    // Token expiration times
    accessTokenExpiry: 3600, // 1 hour
    refreshTokenExpiry: 2592000, // 30 days
    sessionExpiry: 86400, // 24 hours

    // Security settings
    requireHTTPS: true,
    secureCookies: true,
    httpOnly: true,
    sameSite: 'strict',

    // Refresh settings
    autoRefreshThreshold: 300, // 5 minutes before expiry
    refreshInterval: 60000 // Check every minute
  },

  // Authentication security
  auth: {
    // Password requirements
    passwordRequirements: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      maxAttempts: 5,
      lockoutDuration: 900, // 15 minutes
      passwordHistory: 5 // Remember last 5 passwords
    },

    // Account security
    accountLockout: {
      maxFailedAttempts: 5,
      lockoutDuration: 1800, // 30 minutes
      progressiveDelay: true
    },

    // Session management
    sessionManagement: {
      maxConcurrentSessions: 3,
      sessionTimeout: 3600, // 1 hour
      idleTimeout: 1800 // 30 minutes
    }
  },

  // Data protection
  dataProtection: {
    // PII fields that need special handling
    piiFields: [
      'email', 'firstName', 'lastName', 'phone', 'address', 'dateOfBirth'
    ],

    // Fields to exclude from logging
    excludeFromLogging: [
      'password', 'confirmPassword', 'token', 'secret', 'key'
    ],

    // Encryption requirements
    encryption: {
      sensitiveData: true,
      piiData: true,
      tokens: true
    }
  },

  // API security
  api: {
    // CORS settings
    cors: {
      allowedOrigins: [
        'https://brtl79n1olev.space.minimax.io',
        'http://localhost:3000',
        'http://localhost:5173'
      ],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      credentials: true
    },

    // Request size limits
    requestLimits: {
      maxRequestSize: '10mb',
      maxBodySize: '5mb',
      maxQuerySize: '1kb'
    },

    // Response security
    responseSecurity: {
      removeServerHeader: true,
      removePoweredByHeader: true,
      enableCors: true
    }
  },

  // Environment-specific settings
  environment: {
    development: {
      cspEnabled: false,
      securityHeadersEnabled: false,
      detailedErrors: true,
      debugMode: true
    },
    staging: {
      cspEnabled: true,
      securityHeadersEnabled: true,
      detailedErrors: false,
      debugMode: false
    },
    production: {
      cspEnabled: true,
      securityHeadersEnabled: true,
      detailedErrors: false,
      debugMode: false,
      enableAnalytics: true,
      enableMonitoring: true
    }
  }
};

// Security utilities
export class SecurityManager {
  private static instance: SecurityManager;
  private rateLimiters: Map<string, any> = new Map();

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  // Rate limiting check
  canMakeRequest(category: string, key: string): boolean {
    const config = securityConfig.rateLimiting.apiCalls[category as keyof typeof securityConfig.rateLimiting.apiCalls];
    if (!config) return true;

    const limiter = this.getRateLimiter(category);
    return limiter.canMakeRequest(key);
  }

  // Get remaining requests
  getRemainingRequests(category: string, key: string): number {
    const config = securityConfig.rateLimiting.apiCalls[category as keyof typeof securityConfig.rateLimiting.apiCalls];
    if (!config) return 0;

    const limiter = this.getRateLimiter(category);
    return limiter.getRemainingRequests(key);
  }

  // Validate input
  validateInput(input: string, type: keyof typeof securityConfig.validation.urlPatterns): boolean {
    const pattern = securityConfig.validation.urlPatterns[type];
    return pattern ? pattern.test(input) : false;
  }

  // Check if field is sensitive
  isSensitiveField(fieldName: string): boolean {
    return securityConfig.dataProtection.piiFields.includes(fieldName);
  }

  // Sanitize HTML
  sanitizeHtml(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  // Generate secure random string
  generateSecureRandom(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Hash sensitive data
  async hashSensitiveData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private getRateLimiter(category: string): any {
    if (!this.rateLimiters.has(category)) {
      const config = securityConfig.rateLimiting.apiCalls[category as keyof typeof securityConfig.rateLimiting.apiCalls];
      if (config) {
        this.rateLimiters.set(category, new ClientRateLimiter(config.requests, config.window));
      }
    }
    return this.rateLimiters.get(category);
  }
}

// Client-side rate limiter implementation
class ClientRateLimiter {
  private storage: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(
    private maxRequests: number,
    private timeWindow: number
  ) {}

  canMakeRequest(key: string): boolean {
    const now = Date.now();
    const existing = this.storage.get(key);

    if (!existing || now > existing.resetTime) {
      this.storage.set(key, { count: 1, resetTime: now + this.timeWindow });
      return true;
    }

    if (existing.count >= this.maxRequests) {
      return false;
    }

    existing.count++;
    return true;
  }

  getRemainingRequests(key: string): number {
    const existing = this.storage.get(key);
    if (!existing) return this.maxRequests;
    
    const now = Date.now();
    if (now > existing.resetTime) {
      return this.maxRequests;
    }

    return Math.max(0, this.maxRequests - existing.count);
  }
}

// Export singleton instance
export const securityManager = SecurityManager.getInstance();