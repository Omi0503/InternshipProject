import { createStore } from "vuex";
import router from "../router";
import axios from "axios";

export default createStore({
  state: {
    signUpValues: {
      firstName: "",
      lastName: "",
      gender: "",
      emailId: "",
      password: "",
      cPassword: "",
    },

    logInValues: {
      emailId: "",
      password: "",
    },

    formValues: {
      firstName: "",
      lastName: "",
      gender: "",
      emailId: "",
    },

    formValuesList: {},

    buttonName: "Submit",

    userInfo: JSON.parse(localStorage.getItem("userInfo")),
  },
  getters: {},
  mutations: {
    resetFormValues(state) {
      state.formValues.id = "";
      state.formValues.firstName = "";
      state.formValues.lastName = "";
      state.formValues.gender = "";
      state.formValues.emailId = "";
    },

    formValuesList(state, data) {
      state.formValuesList = data;
    },

    fillFormValues(state, data) {
      state.formValues.id = data.id;
      state.formValues.firstName = data.firstName;
      state.formValues.lastName = data.lastName;
      state.formValues.gender = data.gender;
      state.formValues.emailId = data.emailId;
    },

    resetSignUpValues(state) {
      state.signUpValues.firstName = "";
      state.signUpValues.lastName = "";
      state.signUpValues.gender = "";
      state.signUpValues.emailId = "";
      state.signUpValues.password = "";
      state.signUpValues.cPassword = "";
    },

    resetLogInValues(state) {
      state.logInValues.emailId = "";
      state.logInValues.password = "";
    },

    resetUserInfo(state) {
      state.userInfo = {};
    },
  },
  actions: {
    getFormValues({ commit }) {
      axios
        .get(`https://62861e15f0e8f0bb7c109c4f.mockapi.io/People`)
        .then((response) => {
          commit("formValuesList", response.data);
        });
    },

    postFormValues({ state, dispatch, commit }) {
      axios
        .post(
          `https://62861e15f0e8f0bb7c109c4f.mockapi.io/People`,
          state.formValues
        )
        .then(() => dispatch("getFormValues"))
        .then(() => commit("resetFormValues"));
    },

    deleteFormValue({ dispatch }, key) {
      if (confirm("Are you sure you want to delete the row?") === true) {
        axios
          .delete(`https://62861e15f0e8f0bb7c109c4f.mockapi.io/People/${key}`)
          .then(() => dispatch("getFormValues"))
          .then(() => alert("Deleted successfully"));
      }
    },

    getFormValuesById({ state, commit }, key) {
      axios
        .get(`https://62861e15f0e8f0bb7c109c4f.mockapi.io/People/${key}`)
        .then((response) => commit("fillFormValues", response.data))
        .then(() => (state.buttonName = "Update"))
        .then(() => router.push({ name: "updateForm", params: { id: key } }));
    },

    updateFormValues({ state, dispatch, commit }, key) {
      axios
        .put(
          `https://62861e15f0e8f0bb7c109c4f.mockapi.io/People/${key}`,
          state.formValues
        )
        .then(() => dispatch("getFormValues"))
        .then(() => commit("resetFormValues"))
        .then(() => (state.buttonName = "Submit"));
    },

    operation({ state, dispatch }) {
      if (
        state.formValues.firstName &&
        state.formValues.lastName &&
        state.formValues.emailId &&
        state.formValues.gender
      ) {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            state.formValues.emailId
          )
        ) {
          router.push({ name: "user" });
          return state.formValues.id
            ? dispatch("updateFormValues", state.formValues.id)
            : dispatch("postFormValues");
        } else {
          alert("You have entered an invalid email address!");
        }
      } else {
        alert("Please all the field");
      }
    },

    postSignUpValues({ state }) {
      // Validating if all the fields are filled
      if (
        state.signUpValues.firstName &&
        state.signUpValues.lastName &&
        state.signUpValues.gender &&
        state.signUpValues.emailId &&
        state.signUpValues.password &&
        state.signUpValues.cPassword
      ) {
        // Validation for emailId format
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            state.signUpValues.emailId
          )
        ) {
          // Validation if password and confirm password are same
          if (state.signUpValues.password === state.signUpValues.cPassword) {
            // Validation if passowrd is between 8 to 12 characters long
            if (
              state.signUpValues.password.length <= 12 &&
              state.signUpValues.password.length >= 8
            ) {
              axios
                .post(
                  `https://62861e15f0e8f0bb7c109c4f.mockapi.io/Users`,
                  state.signUpValues
                )
                .then(() => router.push({ name: "home" }));
            } else {
              alert("Password must 8 to 12 characters long");
            }
          } else {
            alert("Confirm pasword must be same as password");
          }
        } else {
          alert("You have entered an invalid email address!");
        }
      } else {
        alert("All field are required!");
      }
    },

    async logInFunction({ state, commit, dispatch }) {
      // Validation if both emailId and password are entered
      if (state.logInValues.emailId && state.logInValues.password) {
        let result = await axios.get(
          `https://62861e15f0e8f0bb7c109c4f.mockapi.io/Users?emailId=${state.logInValues.emailId}&password=${state.logInValues.password}`
        );
        commit("resetLogInValues");
        if (result.status == 200 && result.data.length == 1) {
          localStorage.setItem("userInfo", JSON.stringify(result.data[0]));
          router.push({ name: "user" });
          dispatch("getUserInfo");
        } else {
          alert("Wrong credentials");
        }
      } else {
        alert("Please enter valid EmailId and Password to Login");
      }
    },

    logOutFunction({ commit }) {
      localStorage.removeItem("userInfo");
      router.push({ name: "loggedOut" });
      commit("resetUserInfo");
    },

    getUserInfo({ state }) {
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    },
  },
  modules: {},
});
