<template>
  <section>
      <article class="info_cart">
        <div class="inform_cart__content" @click="toogleQuestionAnswer()" :class="{leaveBlockLeft: leaveLeft, leaveBlockRight: leaveRight}">
          <div class="front" :class="{activeAnswer: isActive}"><span>{{activeCart.question}}</span></div>
          <div class="back" :class="{inactiveQuestion: isActive}"><span>{{activeCart.answer}}</span></div>
        </div>
        <div class="inform_cart__button">
          <span @click.prevent="prevCart()" class="btn"><font-awesome-icon icon="arrow-left"/></span>
          <span>{{activeCartIndex+1}}/{{cartsCount}}</span>
          <span @click.prevent="nextCart()" class="btn"><font-awesome-icon icon="arrow-right"/></span>
        </div>
        <router-link tag="button" to="/lection" class="btn-complate">Завершить</router-link>
      </article>
  </section>
</template>

<script>
export default {
  name: 'InfoCart',
  data() {
    return {
      activeCartIndex: 0,
      isActive: false,
      leaveLeft: false,
      leaveRight: false
    }
  },
  methods: {
    prevCart() {
      if (this.activeCartIndex>0){
        this.isActive = false;
        this.leaveLeft = true;
        setTimeout(() => {
          this.activeCartIndex--;
          this.leaveLeft = false;
        }, 150); 
      }
    },
    nextCart() {
      if (this.activeCartIndex<this.cartsCount-1){
        this.isActive = false;
        this.leaveRight = true;
        setTimeout(() => {
          this.activeCartIndex++;
          this.leaveRight = false;
        }, 150);
      }
    },
    toogleQuestionAnswer() {
      this.isActive = !this.isActive;
      // if ((this.activeCartIndex>this.numOfviewed) && (this.show === 'answer')){
      //   this.numOfviewed = this.activeCartIndex;
      // }
    },
    // sendResult(){
    //   this.$store.dispatch('methodName', obj);
    // }
  },
  computed: {
    activeCart() {
      return this.$store.getters.carts[this.activeCartIndex]
    },
    cartsCount() {
      return this.$store.getters.carts.length
    }
  }
}
</script>

<style scoped>
  section{
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #f8f8f8;
    display: grid;
    justify-content: center;
    align-content: center;
  }
  .info_cart{
    display: grid;
    grid-template-rows: 5fr 1fr 1fr;
    justify-items: center;
  }
  .inform_cart__content{
    display: grid;
    align-items: center;
    justify-items: center;
    min-height: 40vh;
    min-width: 40vw;
    text-align: center;
    padding: 15px;
    transition: .5s;
    /* box-shadow: 0px 0px 13px -1px rgba(148,145,148,1);
    background-color: #fff;
    border-radius: 5px; */
    font-size: 1.2em;
    perspective: 1000px;
  }
  .front, .back {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .5s;
    backface-visibility: hidden;
    border-radius: 10px;
    box-shadow: 0px 0px 13px -1px rgba(148,145,148,1);
    background-color: #fff;
  }
  .back {
    transform: rotateX(180deg);
  }
  .activeAnswer{
    transform: rotateX(180deg)
  }
  .inactiveQuestion{
    transform: rotateX(360deg)
  }
  .leaveBlockLeft{
    opacity: 0;
    transform: translateX(-10%)
  }
  .leaveBlockRight{
    opacity: 0;
    transform: translateX(10%)
  }
  .inform_cart__button{
    display: grid;
    align-items: center;
    justify-items: center;
    height: 50px;
    width: 30%;
    grid-template-columns: 1fr 2fr 1fr; 
  }
  .btn{
    cursor: pointer;
  }
  .btn-complate{
    background-color: #1769aa;
    color: #fff;
    border: 2px solid #1769aa;
    font-size: 1.1em;
    padding: .8em 3em;
    border-radius: 3px;
  }
  .btn-complate:hover{
    background-color: #f8f8f8;
    color: #1769aa;
    transition: all .5s;
    cursor: pointer;
  }
  @media screen and (max-width:1000px){
    .inform_cart__content{
      min-height: 30vh;
      min-width: 60vw;
    }
  }
</style>
