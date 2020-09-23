<template>
  <div class="wrapper">
    <div class="title">
      <span>Вопрос</span>
      <span>{{activeTestIndex+1}}/{{testCount}}</span>
    </div>
    <div class="test">
      <div class="question">{{activeTest.text}}</div>
      <div class="answer">
        <div class="variant" v-for="(variant, index) in activeTest.options" :key="index">
          <input type="radio" :id="variant.id" :value="variant.id" v-model="selectedVariant">
          <label :for="variant.id">{{variant.text}}</label>
        </div>
      </div>
      <div class="callback">{{callback}}</div>
      <button class="check_btn" @click.prevent="checkingTest()">Проверить</button>
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
    },
    testCount() {
      return this.lectionData.total
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
      if(this.selectedVariant === this.activeTest.correctOption.id){
        if(this.activeTestIndex<this.testCount-1){
          this.sendAnswer(this.selectedVariant);
          this.callback = "";
        }else if((this.activeTestIndex === this.testCount-1) && (this.totalpercent<100)){
          this.sendAnswer(this.selectedVariant);
          this.callback = "Тест успешно пройден!";
        }
      }else if(this.selectedVariant === ""){
        this.callback = "Надо выбрать один из вариантов!";
      }else{
        this.callback = "Ответ не верен. Попробуйте заново!";
      }
    },
    sendAnswer(answer) {
      let answerData = {
        lessonStatId: this.lectionData.id, 
        optionId: answer
      }
      this.sendAnswerforChek(answerData)
        .then((response)=>{
          if(response.data){
            this.totalpercent += 100/this.testCount;
            this.activeTestIndex++;
            this.selectedVariant = "";
          }
        })
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
  mounted() {
    
  },
  created() {
    this.totalpercent = this.lectionData.passed*100/this.lectionData.total;
    this.activeTestIndex = (this.lectionData.passed === this.lectionData.passed) ? 0 : this.lectionData.passed-1;
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