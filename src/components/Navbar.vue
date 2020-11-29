<template>
  <header>
    <div class="wrapper">
      <div class="logo"><img src="../assets/logo.png" /></div>
      <div class="result">
        <span
          @click="showInputIINForm = true"
          v-if="!signedIn"
          class="result_btn"
          ><font-awesome-icon class="icon" icon="certificate" />Сертификат</span
        >
        <span v-else @click="logOut()" class="result_btn"
          >{{ userFIO }} <font-awesome-icon class="icon" icon="sign-out-alt"
        /></span>
        <!-- <span v-else class="result_form"><input type="text" placeholder="ИИН"></span> -->
        <Popup
          v-if="showInputIINForm"
          @closePopup="closePopup"
          @login="logIn"
          popapTitle="Получить"
        >
          <input
            type="text"
            placeholder="ИИН"
            v-model.trim="iin"
            :class="{
              invalid:
                ($v.iin.$dirty && !$v.iin.required) ||
                ($v.iin.$dirty && !$v.iin.numeric),
            }"
          />
          <small v-if="$v.iin.$dirty && !$v.iin.required">Введите ИИН!</small>
          <small v-if="$v.iin.$dirty && !$v.iin.numeric"
            >ИИН некорректен!</small
          >
        </Popup>
        <Popup
          v-if="!certificate"
          @closePopup="closePopup"
          @login="logIn"
          popapTitle=""
        >
          <h2>Сертификат не доступен!</h2>
        </Popup>
      </div>
    </div>
  </header>
</template>

<script>
import Popup from "./Popup";
import { required, numeric } from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Header",
  components: {
    Popup,
  },
  data() {
    return {
      showInputIINForm: false,
      certificate: true,
      iin: "",
    };
  },
  validations: {
    iin: {
      required,
      numeric,
    },
  },
  computed: {
    ...mapGetters(["userSigned", "userFIO"]),
    signedIn() {
      return this.userSigned;
    },
  },
  methods: {
    ...mapMutations(["clearState"]),
    ...mapActions(["getPersonId", "getCertificateData"]),
    closePopup() {
      this.showInputIINForm = false;
      this.certificate = true;
    },
    logIn() {
      if (this.$v.iin.$invalid) {
        this.$v.$touch();
        return;
      }
      const userInfo = {
        iin: this.iin,
      };
      this.getPersonId(userInfo)
        .then((response) => {
          if (response.data) {
            this.getCertificateData(response.data.attemptId).then((resp) => {
              if (resp.data) {
                let date = new Date().toISOString();
                let blob = new Blob([resp.data], { type: "application/pdf" });
                let downloadUrl = URL.createObjectURL(blob);
                let link = document.createElement("a");
                link.href = downloadUrl;
                link.download = date + "_sertificate.pdf";
                link.click();
              } else {
                this.certificate = false;
              }
              this.showInputIINForm = false;
            });
          } else {
            this.showInputIINForm = false;
            this.certificate = false;
          }
        })
        .catch((error) => {
          this.showInputIINForm = false;
          this.certificate = false;
          console.log(error);
        });
    },
    logOut() {
      this.clearState();
      window.location.reload(true);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.wrapper {
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  cursor: pointer;
}
.logo img {
  height: 40px;
}
.result {
  transition: all 0.5s linear;
}
.result_btn {
  color: #1769aa;
  text-transform: uppercase;
  font-size: 0.9em;
  cursor: pointer;
}
.result_btn .icon {
  margin-right: 5px;
}
.result_form input {
  border: none;
  padding: 3px;
  border-bottom: 2px solid #1769aa;
  color: #1e3144;
}
</style>
