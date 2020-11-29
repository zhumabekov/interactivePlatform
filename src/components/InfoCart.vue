<template>
  <section>
    <div
      v-if="lectionData.passed === lectionData.total && loaded"
      class="callback"
    >
      <img src="../assets/certificate.png" /> Тест сдан!
      <router-link tag="button" to="/lection" class="callback_btn"
        >Назад</router-link
      >
    </div>
    <article class="info_cart" v-else-if="loaded">
      <div
        class="inform_cart__content"
        @click="toogleQuestionAnswer()"
        :class="{ leaveBlockLeft: leaveLeft, leaveBlockRight: leaveRight }"
      >
        <div class="front" :class="{ activeAnswer: isActive }">
          <span>{{ activeCart.situation }}</span>
        </div>
        <div class="back" :class="{ inactiveQuestion: isActive }">
          <span>{{ activeCart.riskLevel }}</span>
        </div>
      </div>
      <div class="inform_cart__button">
        <span @click.prevent="prevCart()" class="btn"
          ><font-awesome-icon icon="arrow-left"
        /></span>
        <span>{{ activeCartIndex + 1 }}/{{ lectionData.total }}</span>
        <span @click.prevent="nextCart()" class="btn"
          ><font-awesome-icon icon="arrow-right"
        /></span>
      </div>
      <div class="loading-bar">
        <div class="percentage" :style="{ width: percentage + '%' }">
          {{ percent }} %
        </div>
      </div>
      <router-link tag="button" to="/lection" class="btn-complate"
        >Завершить</router-link
      >
      <div class="prompt">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/545/545775.svg"
        />
        <span
          >для прохождение модуля можно использовать горячие клавиши (&larr;
          прев; &rarr; след; space перевернуть)</span
        >
      </div>
    </article>
    <div class="loadingFon" v-else>Loading...</div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "InfoCart",
  props: ["id"],
  data() {
    return {
      loaded: false,
      activeCartIndex: 0,
      totalpercent: 0,
      percentage: 0,
      isActive: false,
      leaveLeft: false,
      leaveRight: false,
    };
  },
  computed: {
    ...mapGetters(["lectionData"]),
    percent() {
      return this.percentage.toFixed();
    },
    activeCart() {
      return this.lectionData.lesson.cards[this.activeCartIndex];
    },
  },
  watch: {
    totalpercent: function() {
      this.animationProgress();
    },
  },
  methods: {
    ...mapActions(["getLectionData", "sendFlipCard"]),
    prevCart() {
      if (this.activeCartIndex > 0) {
        this.isActive = false;
        this.leaveLeft = true;
        setTimeout(() => {
          this.activeCartIndex--;
          this.leaveLeft = false;
        }, 150);
      }
    },
    nextCart() {
      if (this.activeCartIndex < this.lectionData.total - 1) {
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
      let answerData = {
        lessonStatId: this.lectionData.id,
        cardId: this.activeCart.id,
      };
      this.sendFlipCard(answerData).then((response) => {
        if (response.data) {
          this.totalpercent =
            (100 / response.data.total) * response.data.passed;
        }
      });
    },
    animationProgress() {
      var intval = setInterval(() => {
        if (this.percentage < this.totalpercent) this.percentage += 0.5;
        else clearInterval(intval);
      }, 10);
    },
  },
  created() {
    this.animationProgress();
  },
  mounted() {
    this.getLectionData(this.id).then((resp) => {
      if (resp.data) {
        this.activeCartIndex = resp.data.passed;
        this.totalpercent = (100 / resp.data.total) * resp.data.passed;
        this.loaded = true;
      }
    });
    if (!localStorage.getItem("userAttemptId")) {
      this.$router.push("/");
    }
    let self = this;
    window.addEventListener("keyup", function(event) {
      if (event.keyCode === 32) {
        self.toogleQuestionAnswer();
      }
      if (event.keyCode === 37) {
        self.prevCart();
      }
      if (event.keyCode === 39) {
        self.nextCart();
      }
    });
  },
};
</script>

<style scoped>
section {
  width: 100%;
  height: calc(100vh - 100px);
  background-color: #f8f8f8;
  display: grid;
  justify-content: center;
  align-content: center;
}
.info_cart {
  display: grid;
  grid-template-rows: 5fr 1fr 1fr;
  justify-items: center;
  grid-row-gap: 1em;
}
.inform_cart__content {
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 40vh;
  min-width: 50vw;
  text-align: center;
  transition: 0.5s;
  /* box-shadow: 0px 0px 13px -1px rgba(148,145,148,1);
    background-color: #fff;
    border-radius: 5px; */
  font-size: 1.2em;
  perspective: 1000px;
}
.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 13px -1px rgba(148, 145, 148, 1);
  background-color: #fff;
  padding: 0.5em;
}
.back {
  transform: rotateX(180deg);
}
.activeAnswer {
  transform: rotateX(180deg);
}
.inactiveQuestion {
  transform: rotateX(360deg);
}
.leaveBlockLeft {
  opacity: 0;
  transform: translateX(-10%);
}
.leaveBlockRight {
  opacity: 0;
  transform: translateX(10%);
}
.inform_cart__button {
  display: grid;
  align-items: center;
  justify-items: center;
  /* height: 50px; */
  width: 30%;
  grid-template-columns: 1fr 2fr 1fr;
}
.btn {
  cursor: pointer;
}
.btn-complate {
  background-color: #1769aa;
  color: #fff;
  border: 2px solid #1769aa;
  font-size: 1.1em;
  padding: 5px 3.5em;
  border-radius: 3px;
}
.btn-complate:hover {
  background-color: #f8f8f8;
  color: #1769aa;
  transition: all 0.5s;
  cursor: pointer;
}
.loading-bar {
  position: relative;
  width: 100%;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  border-bottom: 1px solid #898989;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #898989,
    0 1px 0 #898989;
}
.loading-bar .percentage {
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  display: block;
  text-align: center;
  line-height: 30px;
  font-size: 0.8em;
  height: 100%;
  color: #fff;
  border-radius: 15px;
  background-color: #00a189;
  background-size: 30px 30px;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  animation: animate-stripes 3s linear infinite;
}
.prompt {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 15%;
  right: 0;
  color: #686668;
  font-size: 14px;
  width: 50px;
  overflow: hidden;
  transition: 0.2s;
  height: 50px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
  border-radius: 25px 0 0 25px;
}
.prompt:hover {
  width: 400px;
}
.prompt img {
  width: 50px;
}
.prompt span {
  padding: 5px;
}
.callback {
  display: grid;
  justify-content: center;
  align-content: center;
  color: #00a189;
  font-size: 1.3em;
  text-align: center;
  grid-row-gap: 1em;
}
.callback img {
  margin: 0 auto;
}
.callback_btn {
  background-color: #1769aa;
  color: #fff;
  border: 2px solid #1769aa;
  font-size: 1.1em;
  padding: 5px 3.5em;
  border-radius: 3px;
}
.callback_btn:hover {
  background-color: #f8f8f8;
  color: #1769aa;
  transition: all 0.5s;
  cursor: pointer;
}
@keyframes animate-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 60px 0;
  }
}
@media screen and (max-width: 1000px) {
  .inform_cart__content {
    min-height: 30vh;
    min-width: 70vw;
  }
}
@media screen and (max-width: 700px) {
  .inform_cart__content {
    font-size: 0.7em;
  }
}
</style>
