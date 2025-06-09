import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React from "react";
import ViewContainer from "@/shared/components/ViewContainer";
import Header from "@/shared/components/Header";
import Btn from "@/shared/components/Btn";
import { FontAwesome } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import SelectDropDown from "@/shared/components/SelectDropDown";
import useRegister, { Country } from "@/shared/hooks/useRegister";
import LoadScreen from "@/shared/components/LoadScreen";

const Register = () => {
  const {
    control,
    handleSubmit,
    getValues,
    errors,
    isWeb,
    onSubmit,
    containerStyleForm,
    labelStyleForm,
    inputStyleForm,
    iconStyleForm,
    errorStyle,
    hasMinLength,
    hasNumber,
    hasSpecialChar,
    hasMinusAndMayus,
    passwordRegex,
    password,
    changeIcon,
    showPassword,
    showConfirmPassword,
    onSelectCountry,
    loading,
  } = useRegister(countrysNumber);

  if (loading) {
    return <LoadScreen />;
  } else {
    return (
      <ViewContainer bottomProp={true} topProp={true}>
        <Header text="Registrarse" />
        <ScrollView
          style={isWeb ? styles.containerScrollView : {}}
          className={isWeb ? "" : "w-full h-full"}
        >
          <View
            style={isWeb ? styles.containerFormWeb : {}}
            className={
              isWeb ? "" : "flex-1 w-full h-full p-2 items-center !pt-8"
            }
          >
            {/*Phone*/}
            <Controller
              rules={{ required: "Número de celular es obligatorio" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={isWeb ? styles.containerInputWeb : {}}
                  className={isWeb ? "" : containerStyleForm}
                >
                  <Text
                    style={isWeb ? styles.labelWeb : {}}
                    className={isWeb ? "" : labelStyleForm}
                  >
                    Número de celular
                  </Text>
                  <View
                    style={isWeb ? styles.containerInputWeb : {}}
                    className="flex flex-row items-center w-full relative"
                  >
                    <View
                      style={isWeb ? styles.iconWebSelect : {}}
                      className={isWeb ? "" : "absolute z-10"}
                    >
                      <SelectDropDown
                        data={countrysNumber}
                        onSelect={onSelectCountry}
                      />
                    </View>
                    <TextInput
                      style={
                        isWeb ? { ...styles.inputWeb, paddingLeft: 75 } : {}
                      }
                      className={inputStyleForm + " pl-[75px] "}
                      placeholder="Número de celular"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                </View>
              )}
              name="phoneNumber"
              control={control}
            />

            {/*Email*/}
            <Controller
              rules={{
                required: "Correo electrónico es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo electrónico inválido",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <View
                    style={isWeb ? styles.containerInputWeb : {}}
                    className={containerStyleForm}
                  >
                    <Text
                      style={isWeb ? styles.labelWeb : {}}
                      className={labelStyleForm}
                    >
                      Correo electrónico
                    </Text>
                    <TextInput
                      style={isWeb ? styles.inputWeb : {}}
                      className={inputStyleForm}
                      placeholder="Correo electrónico"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors.email && (
                      <Text className={errorStyle}>{errors.email.message}</Text>
                    )}
                  </View>
                );
              }}
              name="email"
              control={control}
            />

            {/*Password*/}
            <Controller
              rules={{
                required: "Contraseña es obligatoria",
                validate: (value) =>
                  passwordRegex.test(value) ||
                  "La contraseña no cumple con los requisitos",
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <View
                    style={isWeb ? styles.containerInputWeb : {}}
                    className={containerStyleForm}
                  >
                    <Text
                      style={isWeb ? styles.labelWeb : {}}
                      className={labelStyleForm}
                    >
                      Contraseña
                    </Text>
                    <TextInput
                      secureTextEntry={!showPassword}
                      style={isWeb ? styles.inputWeb : {}}
                      className={inputStyleForm}
                      placeholder="Contraseña"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <View
                      style={isWeb ? styles.iconWeb : {}}
                      className={iconStyleForm}
                    >
                      <FontAwesome
                        name={showPassword ? "eye" : "eye-slash"}
                        size={24}
                        color="black"
                        onPress={() => {
                          changeIcon(1);
                        }}
                      />
                    </View>
                    {errors.password && (
                      <Text className={errorStyle}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                );
              }}
              name="password"
              control={control}
            />

            {/*Confirm Password*/}
            <Controller
              rules={{
                required: "Confirmar contraseña es obligatoria",
                validate: (value) =>
                  value === getValues("password") ||
                  "Las contraseñas no coinciden",
              }}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <View
                    style={isWeb ? styles.containerInputWeb : {}}
                    className={containerStyleForm}
                  >
                    <Text
                      style={isWeb ? styles.labelWeb : {}}
                      className={labelStyleForm}
                    >
                      Confirmar contraseña
                    </Text>
                    <TextInput
                      secureTextEntry={!showConfirmPassword}
                      style={isWeb ? styles.inputWeb : {}}
                      className={inputStyleForm}
                      placeholder="Confirmar contraseña"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <View
                      style={isWeb ? styles.iconWeb : {}}
                      className={iconStyleForm}
                    >
                      <FontAwesome
                        name={showConfirmPassword ? "eye" : "eye-slash"}
                        size={24}
                        color="black"
                        onPress={() => {
                          changeIcon(2);
                        }}
                      />
                    </View>
                    {errors.confirmPassword && (
                      <Text className={errorStyle}>
                        {errors.confirmPassword.message}
                      </Text>
                    )}
                  </View>
                );
              }}
              name="confirmPassword"
              control={control}
            />

            {/*Info Password*/}
            <View
              style={isWeb ? styles.containerInfoWeb : {}}
              className={isWeb ? "" : "flex flex-col gap-2 mt-2 mb-16"}
            >
              <Text>En la digitación de la contraseña, tenga en cuenta: </Text>
              <Text>
                {" "}
                {hasMinLength(password) ? "✅" : "❌"} Al menos 8 caracteres
              </Text>
              <Text>
                {" "}
                {hasMinusAndMayus(password) ? "✅" : "❌"} Al menos una letra
                mayúscula y una minúscula
              </Text>
              <Text>
                {" "}
                {hasNumber(password) ? "✅" : "❌"} Al menos un número
              </Text>
              <Text>
                {" "}
                {hasSpecialChar(password) ? "✅" : "❌"} Al menos un carácter
                especial (!@#$%^&*())
              </Text>
            </View>

            {/*Btn Register*/}
            <View
              style={isWeb ? styles.containerBtnWeb : {}}
              className={isWeb ? "" : "w-full h-auto"}
            >
              <Btn
                title="Registrarse"
                onPress={handleSubmit(onSubmit)}
                type="login"
                disabled={Object.keys(errors).length == 0 ? false : true}
              />
            </View>
          </View>
        </ScrollView>
      </ViewContainer>
    );
  }
};

export default Register;

const countrysNumber: Country[] = [
  {
    name: "Colombia",
    code: "CO",
    phoneCode: "+57",
    icon: "Flag CO",
  },
  {
    name: "Peru",
    code: "PE",
    phoneCode: "+51",
    icon: "Flag PE",
  },
  {
    name: "Chile",
    code: "CL",
    phoneCode: "+56",
    icon: "Flag CL",
  },
  {
    name: "Argentina",
    code: "AR",
    phoneCode: "+54",
    icon: "Flag AR",
  },
  {
    name: "Bolivia",
    code: "BO",
    phoneCode: "+591",
    icon: "Flag BO",
  },
  {
    name: "Venezuela",
    code: "VE",
    phoneCode: "+58",
    icon: "Flag VE",
  },
];

const styles = StyleSheet.create({
  containerWeb: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    borderRadius: 20,
    backgroundColor: "white",
    height: "auto",
    minHeight: 500,
    padding: 20,
  },
  containerScrollView: {
    width: "100%",
    height: "100%",
  },
  titleWeb: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  containerIconWeb: {
    width: "100%",
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerFormWeb: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },
  containerInputWeb: {
    width: 500,
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  labelWeb: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
  },
  inputWeb: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  iconWeb: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 10,
    top: 35,
  },
  containerBtnWeb: {
    width: "100%",
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  containerInputCheck: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 10,
  },
  containerInfoWeb: {
    width: 500,
    height: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 10,
    gap: 10,
  },
  iconWebSelect: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 25,
    top: 15,
  },
});
