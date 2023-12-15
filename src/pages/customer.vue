<template>
  <q-page>

    <div class="row">
      <div class="col-md-1">
      </div>
      <div class="col-md-10">
        <q-card class="full-width q-my-xl" style="height: 80vh;">
          <q-card-section>
            <q-scroll-area style="height: 70vh; ">
              <p class="text-center text-bold" style="font-size: x-large;">CUSTOMER FORM</p>
              <q-separator class="q-my-lg" color="orange" inset />
              <q-form @submit.prevent="addCustomer">
                <div class="row">
                  <div class="col-md-6">
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="business" />
                        <span> Customer Type</span>
                      </p>

                      <q-card class="bg-light-blue-1 text-center text-bold" flat style="width: 90%;">
                        <q-card-section>
                          <q-radio class="text-blue" v-model="type" checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye" val="AGENCY" label="AGENCY" style="font-size: larger;" />
                          <q-radio class="text-blue" v-model="type" checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye" val="BRAND" label="BRAND" style="font-size: larger;" />
                          <q-radio class="text-blue" v-model="type" checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye" val="COMPANY" label="COMPANY" style="font-size: larger;" />
                          <q-radio class="text-blue" v-model="type" checked-icon="task_alt"
                            unchecked-icon="panorama_fish_eye" val="FREELANCER" label="FREELANCER"
                            style="font-size: larger;" />
                        </q-card-section>
                        <div>{{ type }}</div>
                      </q-card>
                    </div>
                    <div class="q-mt-md">
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="portrait" />
                        <span class="text-bold" style="font-size: medium;"> Customer Name</span>
                      </p>
                      <q-input v-model="customerName" class="q-my-md" dense outlined label="Customer Name"
                        style="width: 90%;" />
                    </div>
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="portrait" />
                        <span class="text-bold" style="font-size: medium;"> Contact Name</span>
                      </p>
                      <q-input v-model="contactName" class="q-my-md" dense outlined label="Contact Name"
                        style="width: 90%;" />
                    </div>
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="local_phone" />
                        <span class="text-bold" style="font-size: medium;"> Contact Phone Number</span>
                      </p>
                      <q-input v-model="phoneNumber" class="q-my-md" dense outlined label="Contact Phone Number"
                        style="width: 90%;" />
                    </div>
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="email" />
                        <span class="text-bold" style="font-size: medium;"> Company Email</span>
                      </p>
                      <q-input v-model="companyEmail" class="q-my-md" dense outlined label="Company Email"
                        style="width: 90%;" />
                    </div>
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="numbers" />
                        <span class="text-bold" style="font-size: medium;"> Company NPWP</span>
                      </p>
                      <q-input v-model="companyNPWP" class="q-my-md" dense outlined label="Company NPWP"
                        style="width: 90%;" />
                    </div>
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="home_filled" />
                        <span class="text-bold" style="font-size: medium;"> Company Address</span>
                      </p>
                      <q-input v-model="companyAdress" class="q-my-md" dense outlined label="Company Address"
                        style="width: 90%;" />
                    </div>
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="portrait" />
                        <span class="text-bold" style="font-size: medium;"> Finance Contact Name (Optional)</span>
                      </p>
                      <q-input v-model="finNameContact" class="q-my-md" dense outlined label="Finance Contact Name"
                        style="width: 90%;" />
                    </div>
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="local_phone" />
                        <span class="text-bold" style="font-size: medium;"> Finance Phone Number</span>
                      </p>
                      <q-input v-model="finPhone" class="q-my-md" dense outlined label="Finance Phone Number"
                        style="width: 90%;" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div>
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="wallpaper" />
                        <span class="text-bold" style="font-size: medium;"> Logo </span>
                      </p>
                      <q-uploader text-color="blue" color="light-blue-1" flat bordered style="width: 90%; height: 15vh;"
                        @added="logo" />
                    </div>
                    <div class="q-mt-md">
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="wallpaper" />
                        <span class="text-bold" style="font-size: medium;"> Akta Perusahaan </span>
                      </p>
                      <q-uploader text-color="blue" color="light-blue-1" flat bordered style="width: 90%; height: 15vh;"
                        @added="akta" />
                    </div>
                    <div class="q-mt-md">
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="wallpaper" />
                        <span class="text-bold" style="font-size: medium;"> NIB </span>
                      </p>
                      <q-uploader text-color="blue" color="light-blue-1" flat bordered style="width: 90%; height: 15vh;"
                        @added="nib" />
                    </div>
                    <div class="q-mt-md">
                      <p class="text-bold text-blue" style="font-size: medium;">
                        <q-icon name="wallpaper" />
                        <span class="text-bold" style="font-size: medium;"> NPWP </span>
                      </p>
                      <q-uploader text-color="blue" color="light-blue-1" flat bordered style="width: 90%; height: 15vh;"
                        @added="npwp" />
                    </div>
                    <div class="text-right q-mr-xl q-mt-md" style="width: 90%;">
                      <q-btn class="q-mx-sm" type="submit" color="secondary" label="Create" />
                      <q-btn color="secondary" label="Cancel" />
                    </div>
                  </div>
                </div>
              </q-form>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-1"></div>
    </div>
  </q-page>
</template>
<script>
import { ref } from 'vue'
import Swal from 'sweetalert2';

export default {
  setup() {

    return {
      type: ref(''),
      logo: ref(null),
      akta: ref(null),
      nib: ref(null),
      npwp: ref(null),
      customerName: ref(''),
      contactName: ref(''),
      phoneNumber: ref(''),
      companyEmail: ref(''),
      companyNPWP: ref(''),
      companyAdress: ref(''),
      finNameContact: ref(''),
      finPhone: ref(''),
    }
  },

  methods: {
    async addCustomer() {
      let formData = new FormData()
      if (this.logo && this.logo.files[0]) formData.append('file', this.logo.files[0])
      if (this.akta && this.akta.files[0]) formData.append('file', this.akta.files[0])
      if (this.nib && this.nib.files[0]) formData.append('file', this.nib.files[0])
      if (this.npwp && this.npwp.files[0]) formData.append('file', this.npwp.files[0])
      formData.append('name', this.customerName)
      formData.append('type', this.type)
      formData.append('contact', this.contactName)
      formData.append('phone', this.phoneNumber)
      formData.append('email', this.companyEmail)
      formData.append('npwp', this.companyNPWP)
      formData.append('address', this.companyAdress)
      formData.append('fincontact', this.finNameContact)
      formData.append('fincontact_phone', this.finPhone)


      const token = sessionStorage.getItem('token')
      try {
        const response = await this.$api.post("/customer/add", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        const status = response.status
        status ? this.$router.push("/order") : ""


      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid",

        });
      }
    },


  },

}
</script>
