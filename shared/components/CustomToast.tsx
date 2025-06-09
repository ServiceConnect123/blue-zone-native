import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast, { ToastConfig, ToastConfigParams } from "react-native-toast-message";

// Configuración global del Toast
export const toastConfig:ToastConfig = {
  /*
   * Toast de éxito
   */
  success: ({
    text1,
    text2,
    props,
  }: ToastConfigParams<any>) => (
    <View style={[styles.toastContainer, styles.successContainer]}>
      <Icon name="check-circle" size={24} color="#FFF" />
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 && <Text style={styles.text2}>{text2}</Text>}
      </View>
    </View>
  ),

  /*
   * Toast de error
   */
  error: ({
    text1,
    text2,
    props,
  }: ToastConfigParams<any>) => (
    <View style={[styles.toastContainer, styles.errorContainer]}>
      <Icon name="error" size={24} color="#FFF" />
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 && <Text style={styles.text2}>{text2}</Text>}
      </View>
    </View>
  ),

  /*
   * Toast de información
   */
  info: ({
    text1,
    text2,
    props,
  }: ToastConfigParams<any>) => (
    <View style={[styles.toastContainer, styles.infoContainer]}>
      <Icon name="info" size={24} color="#FFF" />
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {text2 && <Text style={styles.text2}>{text2}</Text>}
      </View>
    </View>
  ),

  /*
   * Toast personalizado (ejemplo con progreso)
   */
  custom: ({ text1, props }: ToastConfigParams<any>) => (
    <View style={[styles.toastContainer, styles.customContainer]}>
      {props.icon && <Icon name={props.icon} size={24} color="#FFF" />}
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{text1}</Text>
        {props.progress && (
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${props.progress}%` }]}
            />
          </View>
        )}
      </View>
    </View>
  ),
};

// Estilos
const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successContainer: {
    backgroundColor: "#4CAF50",
  },
  errorContainer: {
    backgroundColor: "#F44336",
  },
  infoContainer: {
    backgroundColor: "#2196F3",
  },
  customContainer: {
    backgroundColor: "#FF9800",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  text1: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  text2: {
    color: "#FFF",
    fontSize: 14,
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFF",
  },
});

// Función helper para mostrar toasts fácilmente
export const showToast = (
  type: string,
  title: string,
  message: string,
  options: any = {}
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: options.position || "top",
    visibilityTime: options.duration || 3000,
    autoHide: options.autoHide !== false,
    ...options.props,
  });
};

// Componente que debe envolver tu aplicación
const CustomToast = () => {
  return <Toast config={toastConfig}/>;
};

export default CustomToast;
