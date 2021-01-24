

<template>
  <div style="200px" class="box">
    <div class="box__input">
      <input
        class="box__file"
        @change="changeImage"
        accept="image/*"
        fileUpload
        type="file"
      />
      <img
        height="140"
        v-if="image.imageURL"
        class="uploadedImage"
        :class="uploading ? 'uploading' : ''"
        :src="image.imageURL"
        alt
      />

      <div v-else>
        <svg
          class="box__icon"
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="43"
          viewBox="0 0 50 43"
        >
          <path
            d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"
          />
        </svg>

        <label>
          <strong>העלאת תמונה לכאן</strong>
        </label>
      </div>
      <div v-if="uploading">מעלה</div>
      <div class="box__success">Done!</div>
      <div class="box__error">
        Error!
        <span></span>.
      </div>
    </div>

    <!-- newTEST END -->
    <!-- 
    <div v-if="!imageInfo || imageInfo.imageURL == ''" class="imageUploader mt-2">
      <p class="bagelbtn">Browse Images</p>
      <div class="obj-field upload-wrapper" v-cloak>
        <h2>Choose Image to Upload</h2>
      </div>
      <div style="padding:5px;">
        <input @change="changeImage" accept="image/*" fileUpload type="file" />
      </div>
    </div>-->
    <!-- <div class="imageload mt-2" v-else>
      <img v-if="imageInfo" class="image rounded inline-block" id :src="imageInfo.imageURL" alt />
      <div v-else class="image-info">
        <a class="image-name" :href="imageInfo.imageURL" target="_blank">
          <div>{{ imageInfo.selectedImage.name }}</div>
        </a>
        <input class="alt-txt" type="text" placeholder="Alt Text" v-model="altText" />
      </div>
      <a class="delete-image" href="#" style="color:red;" @click="deleteImage">
        <span class="delete-icon"></span> Delete image
      </a>
    </div>-->
    <div v-if="uploading" class="loader">
      <div class="bar"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageRef",
  props: {
    db: Object,
  },
  data() {
    return {
      uploading: false,
      collection: "usersData",
      slug: "avatar",
      item: "882830ec-5e77-41ec-b185-8a6a17d81147",
      image: {
        selectedImage: {},
        altText: "My Image",
      },
    };
  },
  mounted() {
    this.fetchCurrentImage();
  },
  methods: {
    async fetchCurrentImage() {
      let { data: userData } = await this.db
        .collection(this.collection)
        .item(this.item)
        .get();
      this.image = userData[this.slug];
    },
    async uploadNewfile() {
      if (
        this.image.selectedImage &&
        this.collection &&
        this.slug &&
        this.item
      ) {
        this.uploading = true;
        try {
          await this.db
            .collection(this.collection)
            .item(this.item)
            .uploadImage(this.slug, this.image);
          await this.fetchCurrentImage();
          this.uploading = false;
        } catch (err) {
          this.uploading = false;
        }
      }
    },
    changeImage(event) {
      this.image.selectedImage = event.target.files[0];
      this.uploadNewfile();
    },
  },
};
</script>

<style scoped>
.eraseimg {
  color: red;
  margin-top: -23px;
  font-size: 15px;
}

@keyframes loader-animation {
  0% {
    width: 0%;
    left: 0%;
    right: 0%;
  }
  40% {
    width: 100%;
    left: 100%;
    right: 0%;
  }
  85% {
    width: 0%;
    left: 0%;
    right: 100%;
  }
  100% {
    width: 0%;
    right: 0%;
    left: 0%;
  }
}
.loader {
  height: 2px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.loader .bar {
  position: relative;
  height: 5px;
  background-color: #ff7272;
  animation-name: loader-animation;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.imageUploader {
  padding: 10px;
  background-color: white;
  max-width: 500px;
  height: 100;
  text-align: center;
}

.uploadedImage {
  max-height: 200px;
}

.uploadedImage.uploading {
  opacity: 0.6;
}

input[type="file"] {
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  margin: 0;
  padding: 0;
  display: block;
  cursor: pointer;
  width: 100%;
}

.box__dragndrop,
.box__uploading,
.box__success,
.box__error {
  display: none;
}
.box {
  margin-bottom: 10px;
  overflow: hidden;
  outline: 2px dashed #92b0b3;
  outline-offset: -10px;
  -webkit-transition: outline-offset 0.15s ease-in-out,
    background-color 0.15s linear;
  transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
}
.box {
  font-size: 1.25rem;
  background-color: white;
  position: relative;
  padding: 30px 20px;
  text-align: center;
}
.box__icon {
  width: 100%;
  height: 80px;
  fill: #bbbbbb;
  display: block;
  margin-bottom: 10px;
}
.box__file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.box label {
  max-width: 80%;
  color: #bbbbbb;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
}
</style>