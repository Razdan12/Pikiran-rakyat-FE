<template>
  <q-page>
    <div class="row q-mt-xl">
      <div class="col-md-2"></div>
      <div class="col-md-6">
        <q-form >
          <label>Nama Company</label>
          <q-input outlined v-model="name" label="name" />
          <label>type Company</label>
          <div>
            <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="AGENCY" label="AGENCY" style="font-size: larger;" />
            <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="BRAND" label="BRAND" style="font-size: larger;" />
            <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="COMPANY" label="COMPANY" style="font-size: larger;" />
            <q-radio class="text-blue" v-model="type" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
              val="FREELANCER" label="FREELANCER" style="font-size: larger;" />
          </div>
          <label>contact</label>
          <q-input outlined v-model="contact" label="contact" />
          <label>contact Phone</label>
          <q-input outlined v-model="contact_phone" label="contact phone" mask="(+62) ### - #### - ####" fill-mask />
          <label>email</label>
          <q-input outlined v-model="email" label="email" />
          <label>npwp</label>
          <q-input outlined v-model="npwp" label="npwp" />
          <label>addres</label>
          <q-input outlined v-model="addres" label="addres" />
          <label>fincontact</label>
          <q-input outlined v-model="fincontact" label="contact" />
          <label>fincontact Phone</label>
          <q-input outlined v-model="fincontact_phone" label="Finance contact phone" mask="(+62) ### - #### - ####" fill-mask />
            <q-btn class="text-right q-mt-md" push color="white" text-color="primary" label="Push" />
        </q-form>
      </div>
      <div class="col-md-4 q-pl-sm">
        <div>{{ name }}</div>
        <div>{{ type }}</div>
        <div>{{ contact }}</div>
        <div>{{ contact_phone }}</div>
        <div>{{ email }}</div>
        <div>{{ npwp }}</div>
        <div>{{ addres }}</div>
        <div>{{ fincontact }}</div>
        <div>{{ fincontact_phone }}</div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { ref } from 'vue'

export default {

  data() {
    return {
      nama: (''),
      type: (''),
      contact: (''),
      contact_phone: (''),
      email: (''),
      npwp: (''),
      addres: (''),
      fincontact: (''),
      fincontact_phone: (''),
    };
  },
  methods: {

  }

}
</script>
