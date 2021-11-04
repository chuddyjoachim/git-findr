<template>
  <div class="relative flex justify-center items-center">
    <div class="w-80 rounded-md p-2 flex flex-col items-center">
      <div class="w-12 h-12 relative mt-4 mb-3">
        <img class="w-full h-full" src="../assets/octo.png" alt="" />
      </div>
      <h2 class="font-bold text-2xl">GiT FiNdR</h2>

      <form
        action=""
        class="flex flex-row items-center h-10 mt-5 mb-4 relative"
        @submit="created"
      >
        <input
          class="relative border border-gray-100 pl-2 mr-1 h-full flex-grow"
          type="text"
          name=""
          id=""
          placeholder="Find Guthub user by username"
          v-model="loginUser"
        />
        <button
          class="
            relative
            w-11
            h-full
            text-center
            bg-green-400
            text-sm
            font-semibold
            text-white
          "
          type="submit"
        >
          Go
        </button>
      </form>
      <!-- error -->
      <h2 v-if="unknownUser == true" class="text-red-500 font-medium mb-3">
        User not found
      </h2>
      <!-- loading component -->
      <div v-if="isLoading == true" class="" id="loading">
        <div
          class="
            bg-gray-50
            flex
            space-x-2
            p-5
            rounded-full
            justify-center
            items-center
          "
        >
          <div
            class="
              bg-blue-600
              p-2
              w-4
              h-4
              rounded-full
              animate-bounce
              blue-circle
            "
          ></div>
          <div
            class="
              bg-green-600
              p-2
              w-4
              h-4
              rounded-full
              animate-bounce
              green-circle
            "
          ></div>
          <div
            class="
              bg-red-600
              p-2
              w-4
              h-4
              rounded-full
              animate-bounce
              red-circle
            "
          ></div>
        </div>
        <p class="text-center my-1">Loading...</p>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div
    v-for="(user, index) in userData"
    :key="index"
    class="
      fixed
      top-0
      bottom-0
      right-0
      left-0
      bg-gray-900 bg-opacity-30
      flex
      justify-center
      text-black
      pt-28
    "
    id="modaldrop"
    @click="userData = []"
  >
    <div class="">
      <a :href="`https://github.com/${user.login}`" target="_blank">
        <div
          class="
            <!--
            w-72
            -->
            w-min-72
            max-w-lg
            h-24
            rounded-xl
            p-4
            bg-white
            transition-all
            hover:bg-green-200
            text-black
            hover:text-white
            flex flex-row
            items-center
          "
          id="modal-bo"
        >
          <div
            class="
              w-14
              h-14
              relative
              rounded-full
              shadow-sm
              border-4 border-green-500
            "
            id="avatar"
          >
            <img
              :src="user.avatarUrl"
              alt=""
              class="
                w-full
                h-full
                relative
                rounded-full
                shadow-sm
                border border-3 border-gray-50
              "
            />
          </div>
          <div class="flex flex-col justify-start flex-grow" id="name-repo">
            <h2 class="font-bold text-lg mx-2" id="ownerName">
              {{ user.name }}
            </h2>
            <h4 class="text-base" id="repocou">
              <span id="count" class="font-semibold">{{
                user.repositories.totalCount
              }}</span>
              Repositories
            </h4>
          </div>

          <p class="font-extrabold text-2xl px-2">></p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String,
  },
  data() {
    return {
      loginUser: "",
      userData: [],
      statusCode: Number,
      unknownUser: false,
      isLoading: false,
    };
  },
  methods: {
    async getData() {
      this.posts = [];
      this.statusCode = Number;
      this.isLoading = true;

      try {
        const response = await this.$http.post("/.netlify/functions/repoapi", {
          loginUser: this.loginUser,
        });
        // JSON responses are automatically parsed.
        this.userData = response.data.data;
        this.statusCode = response.status;
        this.isLoading = false;
      } catch (error) {
        this.posts = [];
        this.statusCode = error.response.status;
        this.isLoading = false;
        this.unknownUser = true;

        // remove unknown or invalid User
        if (this.unknownUser) {
          setTimeout(() => {
            this.unknownUser = false;
          }, 3500);
        }
      }
    },
    async created(e) {
      e.preventDefault();
      this.isLoading = true;
      await this.getData();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
