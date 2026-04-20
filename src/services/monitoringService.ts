import * as Updates from 'expo-updates';
import * as Sentry from 'sentry-expo';

const SENTRY_DSN = 'YOUR_SENTRY_DSN_HERE';

class MonitoringService {
  private isInitialized: boolean = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      Sentry.init({
        dsn: SENTRY_DSN,
        enableInExpoDevelopment: true,
        maxBreadcrumbs: 50,
      });

      this.isInitialized = true;
      console.log('Sentry initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Sentry:', error);
    }
  }

  setUserContext(userId: string, userType: 'user' | 'driver' | 'admin') {
    Sentry.Native.setUser({
      id: userId,
      extra: {
        userType,
      },
    });
  }

  clearUserContext() {
    Sentry.Native.setUser(null);
  }

  logError(error: Error, context?: Record<string, unknown>) {
    Sentry.Native.captureException(error, {
      extra: context,
    });
  }

  logMessage(message: string, level: 'debug' | 'info' | 'warning' | 'error' = 'info') {
    switch (level) {
      case 'debug':
        Sentry.Native.captureMessage(message, 'debug');
        break;
      case 'info':
        Sentry.Native.captureMessage(message, 'info');
        break;
      case 'warning':
        Sentry.Native.captureMessage(message, 'warning');
        break;
      case 'error':
        Sentry.Native.captureMessage(message, 'error');
        break;
    }
  }

  addBreadcrumb(message: string, category: string, data?: Record<string, unknown>) {
    Sentry.Native.addBreadcrumb({
      message,
      category,
      data,
      timestamp: Date.now(),
    });
  }

  async checkForUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        this.addBreadcrumb('Update available', 'app', {
          isAvailable: true,
        });

        await Updates.fetchUpdateAsync();

        this.addBreadcrumb('Update downloaded', 'app', {
          isAvailable: true,
        });

        return {
          available: true,
        };
      }

      return { available: false };
    } catch (error) {
      this.logError(error as Error, { context: 'checkForUpdates' });
      return { available: false, error };
    }
  }

  async reloadApp() {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      this.logError(error as Error, { context: 'reloadApp' });
    }
  }
}

export default new MonitoringService();