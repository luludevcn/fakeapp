import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { useLocationStore } from '../store/locationStore';

interface LocationState {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

export default function useLocation() {
  const [location, setLocation] = useState<LocationState>({
    latitude: 39.9042,
    longitude: 116.4074,
    accuracy: null,
    error: null,
    loading: true,
  });
  const setUserLocation = useLocationStore((state) => state.setUserLocation);

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        // 请求位置权限
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          if (isMounted) {
            setLocation(prev => ({
              ...prev,
              error: '位置权限被拒绝',
              loading: false,
            }));
          }
          return;
        }

        // 获取当前位置
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (isMounted) {
          const newLocation = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            accuracy: currentLocation.coords.accuracy,
            error: null,
            loading: false,
          };
          setLocation(newLocation);
          // 存储到 locationStore
          setUserLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            accuracy: currentLocation.coords.accuracy ?? undefined,
            timestamp: currentLocation.timestamp,
          });
        }
      } catch (error) {
        if (isMounted) {
          setLocation(prev => ({
            ...prev,
            error: '获取位置失败',
            loading: false,
          }));
        }
      }
    };

    getLocation();

    return () => {
      isMounted = false;
    };
  }, [setUserLocation]);

  return location;
}