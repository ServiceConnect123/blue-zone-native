export default function useLoginServices() {
  // Funciones auxiliares
  const isFormValid = (validForm: any): boolean => {
    if (!validForm()) {
      console.log("Formulario no válido");
      return false;
    }
    return true;
  };

  const getFormValues = (getValues: any) => {
    return getValues();
  };

  const logFormSubmission = (values: any) => {
    console.log("Datos del formulario:", values);
  };

  const retrieveUserFromStorage = async (
    AsyncStorage: any
  ): Promise<any | null> => {
    try {
      const userJson = await AsyncStorage.getItem("user");
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Error al recuperar usuario:", error);
      return null;
    }
  };

  const handleNoUserRegistered = () => {
    console.log("No hay usuario registrado");
    // Aquí podrías mostrar un mensaje al usuario
    // Ej: Toast.show("No hay usuario registrado");
  };

  const areCredentialsValid = (user: any, formValues: any): boolean => {
    return (
      user.email === formValues.email && user.password === formValues.password
    );
  };

  const handleInvalidCredentials = () => {
    console.log("Credenciales incorrectas");
    // Aquí podrías mostrar un mensaje al usuario
    // Ej: Toast.show("Email o contraseña incorrectos");
  };

  const handleSuccessfulLogin = async (login: () => void, router: any) => {
    console.log("Credenciales correctas");
    login();
    router.replace("/(tabs)");

    // Opcional: limpiar formulario después del login
    // reset();
  };

  return {
    isFormValid,
    getFormValues,
    logFormSubmission,
    retrieveUserFromStorage,
    handleNoUserRegistered,
    areCredentialsValid,
    handleInvalidCredentials,
    handleSuccessfulLogin,
  };
}
