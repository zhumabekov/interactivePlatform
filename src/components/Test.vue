<template>
  <div class="wrapper">
    <div class="title">
      <span>Вопрос</span>
      <span>{{activeTestIndex+1}}/{{lectionData.total}}</span>
    </div>
    <div v-show="callback != 'Тест сдан!'" class="test">
      <div class="question">{{activeTest.text}}</div>
      <div class="answer">
        <div class="variant" v-for="(variant, index) in activeTest.options" :key="index">
          <input type="radio" :id="variant.id" :value="variant.id" v-model="selectedVariant">
          <label :for="variant.id">{{variant.text}}</label>
        </div>
      </div>
      <div class="callback" :class="{callback_animation: callback}">{{callback}}</div>
      <button class="check_btn" @click.prevent="checkingTest()">Проверить</button>
    </div>
    <div v-show="callback == 'Тест сдан!'" class="callback_text">
      <img src="../assets/certificate.png"/>  Тест сдан!
    </div>
    <div class="loading-bar">
      <div class="percentage" :style="{'width' : percentage + '%'}">{{percent}} %</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: () => {
    return {
      activeTestIndex: 0,
      totalpercent: 0,
      percentage: 0,
      selectedVariant: "",
      callback: ""
    }
  },
  computed: {
    ...mapGetters(['lectionData']),
    percent() {
      return this.percentage.toFixed();
    },
    activeTest() {
      return this.lectionData.lesson.questions[this.activeTestIndex]
    }
  },
  watch: {
    totalpercent: function () {
      this.animationProgress();
    }
  },
  methods: {
    ...mapActions(['sendAnswerforChek']),
    checkingTest() {
      this.callback = "";
      let answerData = {
        lessonStatId: this.lectionData.id, 
        optionId: this.selectedVariant
      }
      if(this.selectedVariant !== ""){
        this.sendAnswerforChek(answerData)
        .then((response)=>{
          if(response.data){
            if(response.data.correct){
              this.totalpercent = (100/response.data.total)*response.data.passed;
              this.selectedVariant = "";
              if(response.data.passed === response.data.total){
                this.callback = "Тест сдан!";
              }else{
                this.activeTestIndex = response.data.passed;
              }
            }else{
              this.callback = "Ответ не верен. Попробуйте заново!";
            }
          }
        })
      }else{
        this.callback = "Надо выбрать один из вариантов!";
      }
    },
    animationProgress() {
      var intval = setInterval(() => {
        if(this.percentage < this.totalpercent)
          this.percentage += .5;
        else
          clearInterval(intval);
      }, 10);
    }
  },
  created() {
    this.totalpercent = (100/this.lectionData.total)*this.lectionData.passed;
    this.activeTestIndex =  this.lectionData.passed;
    this.animationProgress();
  }
}
</script>
<style scoped>
.wrapper{
  display: grid;
  grid-row-gap: 1em;
  width: 70%;
  justify-self: center;
  align-self: center;
}
.title{
  display: flex;
  justify-content: space-between;
  font-size: .9em;
  color: #868585;
}
.test{
  display: grid;
  grid-row-gap: 1em;
  color: #1e3144;
}
.callback{
  height: 50px;
  color: red;
}
.callback_animation{
  animation: animationFrames linear 1s;
  animation-iteration-count: 1;
}
.callback_text{
    display: grid;
    justify-content: center;
    align-content: center;
    color: #00a189;
    font-size: 1.3em;
  }
.check_btn{
  align-self: end;
  background-color: #00a189;
  padding: 10px 60px;
  border-radius: 3px;
  color: #fff;
  border: 2px solid #00a189;
  font-size: 1em;
  cursor: pointer;
}
.check_btn:hover{
  color: #00a189;
  background-color: #fff;
  transition: all .5s;
}
.loading-bar {
  position: relative;
  width: 100%;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  border-bottom: 1px solid #898989;
  box-shadow: inset 0 1px 2px rgba(0,0,0, .4), 0 -1px 1px #898989, 0 1px 0 #898989;
}
.loading-bar .percentage {
  position: absolute;
  top: 1px; left: 1px; right: 1px;
  display: block;
  text-align: center;
  line-height: 30px;
  font-size: 0.8em;
  height: 100%;
  color: #fff;
  border-radius: 15px;
  background-color: #00a189;
  background-size: 30px 30px;
  background-image: linear-gradient(135deg, rgba(255,255,255, .15) 25%, transparent 25%, transparent 50%, rgba(255,255,255, .15) 50%, rgba(255,255,255, .15) 75%, transparent 75%, transparent); 
  animation: animate-stripes 3s linear infinite;
} 
@keyframes animate-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 60px 0; }
}

@keyframes animationFrames{
  0% {
    transform:  translate(0px,0px)  ;
  }
  10% {
    transform:  translate(-10px,0px)  ;
  }
  20% {
    transform:  translate(10px,0px)  ;
  }
  30% {
    transform:  translate(-10px,0px)  ;
  }
  40% {
    transform:  translate(10px,0px)  ;
  }
  50% {
    transform:  translate(-10px,0px)  ;
  }
  60% {
    transform:  translate(10px,0px)  ;
  }
  70% {
    transform:  translate(-10px,0px)  ;
  }
  80% {
    transform:  translate(10px,0px)  ;
  }
  90% {
    transform:  translate(-10px,0px)  ;
  }
  100% {
    transform:  translate(0px,0px)  ;
  }
}

.answer{
  display: grid;
  align-content: start;
  grid-row-gap: 10px;
}
.variant input, .variant label{
  margin-left: 5px;
}
@media screen and (max-width:1000px){
  .wrapper{
    width: 100%;
  }
}
</style>