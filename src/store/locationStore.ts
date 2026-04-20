import { create } from 'zustand';

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

interface DriverLocation {
  driverId: string;
  location: Location;
}

interface LocationState {
  userLocation: Location | null;
  driverLocations: DriverLocation[];
  setUserLocation: (location: Location) => void;
  updateDriverLocation: (driverId: string, location: Location) => void;
  removeDriverLocation: (driverId: string) => void;
  clearDriverLocations: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  userLocation: null,
  driverLocations: [],
  setUserLocation: (location) => set({ userLocation: location }),
  updateDriverLocation: (driverId, location) => set((state) => ({
    driverLocations: state.driverLocations.map((dl) => 
      dl.driverId === driverId ? { driverId, location } : dl
    ).filter((dl) => dl.driverId !== driverId).concat({ driverId, location })
  })),
  removeDriverLocation: (driverId) => set((state) => ({
    driverLocations: state.driverLocations.filter((dl) => dl.driverId !== driverId),
  })),
  clearDriverLocations: () => set({ driverLocations: [] }),
}));