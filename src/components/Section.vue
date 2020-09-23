<template>
  <section>
    <div class="wrapper">
      <article class="inform_block">
        <div class="inform_block__text">Стигма и дискриминация в отношении людей, живущих с ВИЧ и представителей ключевых групп</div>
        <div class="inform_block__btn">
          <button class="btn__begin" @click.prevent="showPopup('login')">Начать обучение</button>
          <button class="btn__continue" @click.prevent="showPopup('continue')">Продолжить обучение</button>
        </div>
        
        <!-- <router-link tag="div" class="inform_block__btn" to="/lection"><span>Пройти обучение</span></router-link> -->
        <!-- <div class="inform_block__link">Результаты</div> -->
      </article>
      <article class="img_block"><img src="../assets/fon.png" width="95%"></article>
      <Popup v-show="showLogin" @closePopup="closePopup" @login="regIn" popapTitle="Войти">
          <input type="text" placeholder="Фамилия" v-model.trim="lastName" :class="{invalid: ($v.lastName.$dirty && !$v.lastName.required) || ($v.lastName.$dirty && !$v.lastName.maxLength)}">
          <small v-if="$v.lastName.$dirty && !$v.lastName.required">Введите имя!</small>
          <input type="text" placeholder="Имя" v-model.trim="firstName" :class="{invalid: ($v.firstName.$dirty && !$v.firstName.required) || ($v.firstName.$dirty && !$v.firstName.maxLength)}">
          <small v-if="$v.firstName.$dirty && !$v.firstName.required">Введите фамилию!</small>
          <input type="text" placeholder="Отчество" v-model.trim="patronymic">
          <input type="text" placeholder="ИИН" v-model.trim="iin" :class="{invalid: ($v.iin.$dirty && !$v.iin.required) || ($v.iin.$dirty && !$v.iin.numeric)}">
          <small v-if="$v.iin.$dirty && !$v.iin.required">Введите ИИН!</small>
          <small v-if="($v.iin.$dirty && !$v.iin.numeric) || callbackerror">ИИН некорректен!</small>
          <!-- <input type="text" placeholder="Email" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
          <small v-if="$v.email.$dirty && !$v.email.required">Введите Email!</small>
          <small v-else-if="$v.email.$dirty && !$v.email.email">Email некорректен!</small> -->
      </Popup>
      <Popup v-show="showContinue" @closePopup="closePopup" @login="logIn" popapTitle="Продолжить">
        <input type="text" placeholder="ИИН" v-model.trim="iin" :class="{invalid: ($v.iin.$dirty && !$v.iin.required) || ($v.iin.$dirty && !$v.iin.numeric)}">
        <small v-if="$v.iin.$dirty && !$v.iin.required">Введите ИИН!</small>
        <small v-if="($v.iin.$dirty && !$v.iin.numeric) || callbackerror">ИИН некорректен!</small>
      </Popup>
    </div>
  </section>
</template>

<script>
import Popup from './Popup'
import {required, maxLength, numeric} from 'vuelidate/lib/validators'
import {mapActions} from 'vuex'
export default {
  name: 'Section',
  components: {
    Popup
  },
  data() {
    return {
      lastName: '',
      firstName: '',
      patronymic: '',
      iin: '',
      // email: '',
      showLogin: false,
      showContinue: false,
      callbackerror: false
    }
  },
  validations: {
    lastName: {
      required,
      maxLength: maxLength(256)
    },
    firstName: {
      required,
      maxLength: maxLength(256)
    },
    iin: {
      required,
      numeric
    }
    // email: {
    //   required,
    //   email
    // }
  },
  methods: {
    ...mapActions(['enterPlatform']),
    showPopup(formType) {
      if (formType == "login"){
        this.showLogin = true;
      }else{
        this.showContinue = true;
      }
    },
    closePopup() {
      this.showLogin = false;
      this.showContinue = false;
      this.lastName = '';
      this.firstName = '';
      this.patronymic = '';
      this.iin = '';
    },
    regIn() {
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const userInfo = {
        lastName: this.lastName,
        firstName: this.firstName,
        patronymic: this.patronymic,
        iin: this.iin
      }
      this.enterPlatform(userInfo)
        .then((response)=>{
          if(response.data){
            this.$router.push('/lection')
          }else{
            this.callbackerror = true;
          }
        })
    },
    logIn() {
      if (this.$v.iin.$invalid){
        this.$v.$touch()
        return
      }
      const userInfo = {
        // lastName: this.lastName,
        // firstName: this.firstName,
        // patronymic: this.patronymic,
        iin: this.iin
      }
      this.enterPlatform(userInfo)
        .then((response)=>{
          if(response.data){
            this.$router.push('/lection')
          }else{
            this.callbackerror = true;
          }
        })
    }
  }
}
</script>

<style scoped>
  section{
    width: 100%;
    min-height: calc(100vh - 100px);
    background-color: #f8f8f8;
    overflow: auto;
  }
  .wrapper{
    width: 90%;
    display: grid;
    margin: 0 auto;
    min-height: calc(100vh - 100px);
    align-items: center;
    grid-template-columns: 1fr 1fr;
  }
  .inform_block{
    display: grid;
    grid-row-gap: 50px;
    align-self: center;
  }
  .inform_block__text{
    font-size: 2.2em;
    width: 70%;
    font-weight: bold;
    color: #1e3144;
  }
  .btn__continue{
    margin-left: .5em;
  }
  .btn__begin{
    background-color: #1769aa;
    font-size: 1.1em;
    padding: .8em 3em;
    border-radius: 3px;
    color: #fff;
    border: 2px solid #1769aa;
  }
  .btn__begin:hover{
    background-color: #f8f8f8;
    color: #1769aa;
    transition: all .5s;
    cursor: pointer;
  }
  .btn__continue{
    background-color: #ff9100;
    font-size: 1.1em;
    padding: .8em 3em;
    border-radius: 3px;
    color: #fff;
    border: 2px solid #ff9100;
  }
  .btn__continue:hover{
    background-color: #f8f8f8;
    color: #ff9100;
    transition: all .5s;
    cursor: pointer;
  }
  .img_block{
    justify-self: center;
    align-self: center;
  }
  @media screen and (max-width:1400px){
    .inform_block__text{
      width: 80%;
    }
  }
  @media screen and (max-width:1250px){
    .inform_block__btn button{
      display: block;
    }
    .btn__continue{
      margin-left: 0;
      margin-top: .5em;
    }
  }
  @media screen and (max-width:800px){
    .inform_block__text{
      font-size: 1.8em;
      width: 90%;
    }
  }
  @media screen and (max-width:700px){
    .wrapper{
      grid-template-columns: 1fr;
    }
    .img_block{
      display: none;
    }
    .inform_block{
      justify-items: center;
    }
    .inform_block__text{
      text-align: center;
    }
    .inform_block__btn{
      display: grid;
    }
  }
</style>
