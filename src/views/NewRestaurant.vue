<template>
  <div class="container">
    <div class="row">
      <div class="card col s6 offset-s3">
        <form class="card-content" @submit.prevent="geocode">
          <h5 class="center">餐廳資訊</h5>
          <div class="row">
            <div class="input-field col s12">
              <label for="name">餐廳名稱</label>
              <input type="text" id="name" v-model="restaurant.name" />
            </div>
            <div class="input-field col s12">
              <label for="address">餐廳地址</label>
              <input type="text" id="address" v-model="restaurant.address" />
            </div>
            <!--顯示錯誤訊息-->
            <p v-if="errormsg" class="center red-text">{{errormsg}}</p>
            <div class="input-field col s12 center">
              <button type="submit" class="btn waves-light waves-effect">submit</button>
            </div>
          </div>
        </form>
      </div>
      <div class="card col s6 offset-s3" v-if="hasGeo">
        <div class="card-content">
          <h5 class="center">確認資訊</h5>
        </div>
        <div class="card-action">
          <GMap
            :center="{lat: restaurant.lat, lng: restaurant.lng}"
            :restaurants="[restaurant]"
            :streetViewControl="false"
            :mapTypeControl="false"
            :fullscreenControl="true"
            :zoomControl="true"
          ></GMap>
        </div>
        <div class="card-action">
          <p class="grey-text">餐廳名稱：{{restaurant.name}}</p>
          <p class="grey-text">餐廳緯度: {{restaurant.lat}}</p>
          <p class="grey-text">餐廳經度: {{restaurant.lng}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GMap from "../components/GMap";

export default {
  components: {
    GMap
  },
  data() {
    return {
      restaurant: {
        address: "",
        name: "",
        lat: 25.0325917,
        lng: 121.562499
      },
      hasGeo: false,
      errormsg: null,
      geocoder: null
    };
  },
  mounted() {
    this.initGeocoder();
  },
  methods: {
    initGeocoder() {
      this.geocoder = new google.maps.Geocoder();
    },
    geocode() {
      // 取得地址
      const address = this.restaurant.address;
      this.geocoder.geocode(
        {
          address: address,
          // 限制轉換的結果必須是在台灣的範圍
          componentRestrictions: {
            country: "TW"
          }
        },
        // 轉換完成後呼叫的 callback 函式
        (results, status) => {
          if (status === "OK") {
            // 當轉換成功時，將第一筆結果的經緯度存取起來
            this.restaurant.lat = results[0].geometry.location.lat();
            this.restaurant.lng = results[0].geometry.location.lng();
            this.hasGeo = true;
          } else {
            this.hasGeo = false;
            // 當轉換失敗時，顯示錯誤原因
            this.errormsg = status;
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  height: 300px;
}
</style>