<template>
  <div class="bg-image">
    <q-page class="col flex justify-center items-center">
      <div class="tw-w-5/6 flex justify-center items-center">
        <q-card class="tw-w-full">
          <q-card-section class="tw-w-full">
            <div class="flex justify-center items-center">
              <div class="form ">
                <p
                  class="text-center text-blue-6 text-bold"
                  style="font-size: x-large"
                >
                  SALES INFORMATION SYSTEM <br />
                  <span class="text-blue-6" style="font-size: large"
                    >PIKIRAN RAKYAT MEDIA NETWORK</span
                  >
                </p>
                <div class="text-center ">
                  <q-img
                    class="q-my-xl"
                    src="../assets/lock.png"
                    style="width: 20%"
                  />
                </div>

                <div class="flex tw-flex-col justify-center item-center">
                  <div class="col-10">
                    <q-form
                      @submit.prevent="loginUser"
                      class="tw-w-full flex justify-center"
                    >
                      <q-input
                        v-model="email"
                        class="text-center"
                        bottom-slots
                        filled
                        type="text"
                        label="Username/Email"
                        style="width: 70%"
                      >
                        <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>

                      <q-input
                        v-model="password"
                        class="tw-w-full"
                        bottom-slots
                        filled
                        type="password"
                        label="Password"
                        style="width: 70%"
                      >
                        <template v-slot:prepend>
                          <q-icon name="key" />
                        </template>
                      </q-input>
                      <q-btn
                        type="submit"
                        color="blue-grey-6"
                        glossy
                        label="Login"
                        :disable="submit"
                        style="width: 40%"
                      />
                    </q-form>
                  </div>
                 
                </div>
              </div>
              <div class="bgImage">
                <q-img
                  class="full-width"
                  src="../assets/media.jpg"
                  flat
                />
              </div>
             
            </div>
          </q-card-section>
        </q-card>
        
      </div>
    </q-page>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  methods: {
    async loginUser() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      try {
        this.submit = true;
        const response = await this.$api.post("/user/login", loginData);
        const token = response.data.accessToken;
        const name = response.data.name;
        const email = response.data.email;
        const role = response.data.role;
        const id = response.data.uuid;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("id", id);

        if (role === "admin") {
          this.$router.push("/admin/customer");
        } else if (role === "sales" || role === "mitra") {
          this.$router.push("/sales/customer");
        }else if (role === "manager") {
          this.$router.push("/manager/customer");
        }else if (role === "finance") {
          this.$router.push("/finance/molist");
        }else if (role === "pic_artikel" || role === "pic_sosmed" || role === "pic_cpd" || role === "pic_cpm" || role === "pic_other_content") {
          this.$router.push("/prod/order-list");
        }else if (role === 'VP'){
          this.$router.push("/vp/order-list");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email atau Password salah!",
        });
      } finally {
        this.submit = false;
      }
    },
  },

  data() {
    return {
      email: "",
      password: "",
      submit: ref(false),
    };
  },
};
</script>

<style>
.bg-image {
  background-image: url("../assets/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.bg-image2 {
  background-image: url(".../assets/media.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.form, .bgImage{
  width: 50%;
}

@media (min-width: 768px) and (max-width: 1199px) {
  .bgImage {
    display: none;
  }
  .form{
    width: 100%;
  }
}

@media (max-width: 768px) {
  .bgImage {
    display: none;
  }
  .form{
    width: 100%;
  }
}
</style>
