import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, Alert } from "react-native";

const useLocationPermission = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS !== "android") {
      // iOS: se maneja diferente o ya tienes permisos declarados
      setHasLocationPermission(true);
      return;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permiso de Ubicación",
          message:
            "Esta app necesita acceso a tu ubicación para mostrar el mapa.",
          buttonNeutral: "Pregúntame luego",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permiso de ubicación concedido");
        setHasLocationPermission(true);
      } else {
        console.log("Permiso de ubicación denegado");
        setHasLocationPermission(false);
        // Reintentar con un mensaje claro
        Alert.alert(
          "Permiso Requerido",
          "Debes conceder el permiso de ubicación para usar el mapa.",
          [
            {
              text: "Volver a intentar",
              onPress: () => requestLocationPermission(),
            },
            {
              text: "Cancelar",
              style: "cancel",
            },
          ]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return hasLocationPermission;
};

export default useLocationPermission;
