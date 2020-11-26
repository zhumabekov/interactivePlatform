<template>
  <footer>
    <div class="wrapper">
      <div class="loading-bar" v-if="totalpercent != 100 && statData">
        <div class="percentage" :style="{ width: percentage + '%' }">
          <span v-show="percentage > 0">{{ percent }} %</span>
        </div>
      </div>
      <div v-else-if="statData">
        <button class="btn_certificate" @click="getCertificate()">
          Получть сертификат
        </button>
      </div>
      <div v-else></div>
      <div class="bottom_text">CAAPL 2020</div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "Footer",
  data: () => {
    return {
      totalpercent: 0,
      percentage: 0,
      statData: false,
      certificate: "",
    };
  },
  computed: {
    percent() {
      return this.percentage.toFixed();
    },
  },
  watch: {
    totalpercent: function() {
      this.animationProgress();
    },
    $route() {
      this.initVar();
      this.clearLectionData();
    },
  },
  methods: {
    ...mapActions(["getTotalStat", "getCertificateData"]),
    ...mapMutations(["clearLectionData"]),
    animationProgress() {
      var intval = setInterval(() => {
        if (this.percentage < this.totalpercent) this.percentage += 0.5;
        else clearInterval(intval);
      }, 10);
    },
    initVar() {
      this.getTotalStat().then((resp) => {
        if (resp.data) {
          if (localStorage.getItem("userAttemptId")) {
            this.statData = true;
          } else {
            this.statData = false;
          }
          this.totalpercent = (100 / resp.data.total) * resp.data.passed;
        }
      });
    },
    getCertificate() {
      this.getCertificateData(localStorage.getItem("userAttemptId"))
        .then((resp) => {
          if (resp.data) {
            console.log(resp.data);
            let date = new Date().toISOString();
            let blob = new Blob([resp.data], { type: "application/pdf" });
            let downloadUrl = URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.href = downloadUrl;
            link.download = date + "_sertificate.pdf";
            link.click();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.animationProgress();
  },
  mounted() {
    this.initVar();
  },
};
</script>

<style scoped>
footer {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #4c4b4b;
}
.wrapper {
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom_text {
  color: #fff;
  justify-self: end;
}
.loading-bar {
  position: relative;
  width: 40%;
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
.btn_certificate {
  background-color: #00a189;
  font-size: 0.9em;
  padding: 0.5em 2em;
  border-radius: 2px;
  color: #fff;
  border: 2px solid #00a189;
}
.btn_certificate:hover {
  background-color: #4c4b4b;
  color: #fff;
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
@media screen and (max-width: 500px) {
  .btn_certificate {
    padding: 0.2em 1em;
  }
}
@media screen and (max-width: 400px) {
  .bottom_text {
    font-size: 0.8em;
  }
  .btn_certificate {
    font-size: 0.8em;
    padding: 0.2em 0.5em;
  }
}
</style>
