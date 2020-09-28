<template>
  <section>
    <article class="lecture_block" :class="{activeTest: isActive}" v-if="loaded">
      <div class="lecture__content">
        <div class="lecture__title">
          <router-link tag="span" to="/lection" class="btn_back"><font-awesome-icon class="icon" icon="chevron-left"/>Назад</router-link>
          <span class="lec_title">{{lectionData.lesson.number}} {{lectionData.lesson.name}}</span>
        </div>
        <iframe :src="lectionData.lesson.googlePresentationUrl"
        frameborder="0" allowfullscreen="true" mozallowfullscreen="true"
        webkitallowfullscreen="true"></iframe>
      </div>
      <div class="lecture__test">
       <button class="lecture__test_btn" @click.prevent="startTest()" v-show="(!isActive) && (lectionData.passed !== lectionData.total)">Начать тест</button>
       <Test v-if="(isActive) && (lectionData.passed !== lectionData.total)"></Test>
       <div v-if="lectionData.passed === lectionData.total" class="callback">
        <img src="../assets/certificate.png"/>  Тест сдан!
       </div>
       <router-link tag="button" to="/lection" class="lecture_close_btn" v-show="isActive">Завершить модуль</router-link>
      </div>
    </article>
    <div class="loadingFon" v-else>Loading...</div>
  </section>
</template>

<script>
import Test from './Test';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'LectureBlock',
  props: ['id'],
  components: {
    Test
  },
  data() {
    return {
      isActive: false,
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['lectionData']),
  },
  methods: {
    ...mapActions(['getLectionData']),
    startTest() {
      this.isActive = true
    }
  },
  mounted() {
    this.getLectionData(this.id)
      .then((resp)=>{
        if(resp.data){
          this.loaded = true;
        }
      })
    if (!localStorage.getItem('userAttemptId')){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  section{
    width: 100%;
    height: calc(100vh - 100px);
    background-color: #f8f8f8;
    overflow: auto;
    display: grid;
  }
  .loadingFon{
    display: grid;
    justify-content: center;
    align-content: center;
  }
  .lecture_block{
    width: 90%;
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: 3fr 1fr;
    justify-self: center;
    overflow: auto;
    padding: 1em;
    transition: all .5s linear;
  }
  .callback{
    display: grid;
    justify-content: center;
    align-content: center;
    color: #00a189;
    font-size: 1.3em;
  }
  .lecture__content{
    display: grid;
    grid-template-rows: minmax(2em,auto) 1fr;
  }
  .lecture__content .lecture__title{
    display: grid;
    grid-template-columns: 15% 85%;
  }
  .lecture__title .btn_back{
    color: #a3a2a2;
    font-size: .9em;
    cursor: pointer;
  }
  .btn_back .icon{
    margin-right: 10px;
  }
  .lecture__title .lec_title{
    color: #506df0;
  }
  .lecture__content iframe{
    width: 100%;
    min-height: 95%;
  }
  .lecture__test{
    display: grid;
    grid-row-gap: 1em;
  }
  .lecture__test_btn{
    align-self: start;
    justify-self: center;
    background-color: #1769aa;
    padding: 1em 4em;
    margin-top: 2em;
    border-radius: 3px;
    color: #fff;
    border: 2px solid #1769aa;
    font-size: 1em;
  }
  .lecture__test_btn:hover{
    background-color: #f8f8f8;
    color: #1769aa;
    transition: all .5s;
    cursor: pointer;
  }
  .lecture_close_btn{
    align-self: end;
    width: 70%;
    justify-self: center;
    background-color: #1769aa;
    padding: 10px 60px;
    border-radius: 3px;
    color: #fff;
    border: 2px solid #1769aa;
    font-size: 1em;
    cursor: pointer;
  }
  .lecture_close_btn:hover{
    color: #1769aa;
    background-color: #fff;
    transition: all .5s;
  }
  .activeTest{
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width:1000px){
    .lecture_block{
      grid-template-columns: 1fr;
      grid-row-gap: 1em;
    }
    .lecture__content iframe{
      width: 100%;
      height: 40vh;
    }
    .lecture__test_btn, .lecture_close_btn{
      width: 100%;
    }
  }
  @media screen and (max-width:500px){
    .lecture__content .lecture__title{
      grid-template-columns: 20% 80%;
    }
  }
</style>

