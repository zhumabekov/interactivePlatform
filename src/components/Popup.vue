<template>
  <div class="popup_wrapper">
    <div class="popup">
      <div class="popup_header">{{popapTitle}}</div>
      <div class="popup_body">
        <slot></slot>
      </div>
      <div class="popup_footer">
        <button @click.prevent="login()" class="btn btn_login">{{popapTitle ? popapTitle : "OK"}}</button>
        <button @click.prevent="closePopup()" class="btn btn_close">Закрыть</button>
      </div>
    </div>
    <div class="popup_background" @click.prevent="closePopup()"></div>
  </div>
</template>
<script>
export default {
  name: 'Popup',
  props: ['popapTitle'],
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    login() {
      this.$emit('login')
    }
  }
}
</script>
<style scoped>
  .popup_wrapper{
    position: absolute;
  }
  .popup_background{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background:  rgba(0,0,0, .5);
  }
  .popup{
    z-index: 99;
    width: 400px;
    top: 10vh;
    left: calc(50% - 215px);
    position: fixed;
    background: #f8f8f8;
    border-top: 5px solid #1769aa;
    border-radius: 2px;
    box-shadow: 0px 0px 10px -3px rgba(0,0,0,0.75);
    padding: 16px;
  }
  .popup_header{
    font-size: 1.2em;
    color: rgb(24, 24, 24);
  }
  .popup_body{
    display: grid;
    align-items: center;
    grid-row-gap: 1em;
    margin: 1em 0;
  }
  .popup_body input{
    background: none;
    color: rgb(59, 59, 59);
    border: none;
    border: 2px solid #dfdfdf;
    font-size: 1em;
    padding: .5em;
  }
  .popup_body .invalid{
    border: 2px solid #ab003c;
  }
  .popup_body small{
    color: #ab003c;
  }
  .popup_footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .btn{
    cursor: pointer;
    padding: 7px 25px;
    color: #fff;
    border-radius: 1px;
    font-size: .9em;
    transition: all .3s linear;
  }
  .btn_login{
    background-color: #1769aa;
    border: 2px solid #1769aa;
  }
  .btn_login:hover{
    background-color: #fff;
    color: #1769aa;
  }
  .btn_close{
    background-color: #ab003c;
    border: 2px solid #ab003c;
  }
  .btn_close:hover{
    background-color: #fff;
    color: #ab003c;
  }
  @media screen and (max-width:500px){
    .popup{
      width: 200px;
      left: calc(50% - 117px);
    }
  }
</style>