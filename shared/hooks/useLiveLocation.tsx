import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLiveLocation = (shouldTrack: boolean = true) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      try {
        // 1. Solicitar permisos
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permiso de ubicación denegado");
          setIsLoading(false);
          return;
        }

        // 2. Obtener ubicación actual (opcional)
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(currentLocation);

        // 3. Suscribirse a actualizaciones en tiempo real
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 10, // Actualizar cada 10 metros (ajustable)
            timeInterval: 5000, // Actualizar cada 5 segundos (ajustable)
          },
          (newLocation) => {
            setLocation(newLocation);
          }
        );
      } catch (err) {
        setError("Error al obtener ubicación en tiempo real");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (shouldTrack) {
      startWatching();
    }

    // Limpiar suscripción al desmontar el componente
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [shouldTrack]);

  return { location, error, isLoading };
};

export default useLiveLocation;
