import { CameraPermissionState } from '../types';

/**
 * Request camera permission dari browser
 * @returns Promise<MediaStream | null>
 */
export async function requestCameraPermission(): Promise<MediaStream | null> {
  try {
    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Browser Anda tidak mendukung akses kamera. Gunakan browser modern seperti Chrome atau Firefox.');
    }

    // Request permission
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      }
    });

    return stream;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        throw new Error('Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        throw new Error('Kamera tidak ditemukan. Pastikan kamera terpasang dan tidak digunakan aplikasi lain.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        throw new Error('Kamera sedang digunakan oleh aplikasi lain. Tutup aplikasi lain yang menggunakan kamera.');
      }
      throw new Error(`Error akses kamera: ${error.message}`);
    }
    throw new Error('Gagal mengakses kamera.');
  }
}

/**
 * Check status camera permission
 * @returns Promise<CameraPermissionState>
 */
export async function checkCameraPermission(): Promise<CameraPermissionState> {
  if (!navigator.permissions) {
    return { granted: false, denied: false, prompt: true };
  }

  try {
    const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
    
    return {
      granted: permissionStatus.state === 'granted',
      denied: permissionStatus.state === 'denied',
      prompt: permissionStatus.state === 'prompt'
    };
  } catch (error) {
    // Fallback jika permissions API tidak support
    return { granted: false, denied: false, prompt: true };
  }
}

/**
 * Stop media stream
 * @param stream MediaStream to stop
 */
export function stopMediaStream(stream: MediaStream | null): void {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
}

/**
 * Request notification permission
 * @returns Promise<boolean>
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Browser tidak mendukung notifikasi.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

/**
 * Show browser notification
 * @param title Notification title
 * @param body Notification body
 */
export function showNotification(title: string, body: string): void {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/logo192.png',
      badge: '/logo192.png'
    });
  }
}

