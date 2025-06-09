import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocationPermission = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Solicitar permisos
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permiso de ubicación denegado");
          setIsLoading(false);
          return;
        }

        // Obtener ubicación actual
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // Alta precisión
        });

        setLocation(location);
      } catch (error) {
        setErrorMsg("Error al obtener la ubicación");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    location,
    errorMsg,
    isLoading,
    permissionGranted: !!location && !errorMsg,
  };
};

export default useLocationPermission;
