<template>
<loader v-if="loading" />
  <div class="app-main-layout" v-else>
    <navbar @click="isOpen = !isOpen" />
    <sidebar v-model="isOpen" :key="locale"/>
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать новую запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/loader.vue'
import Navbar from '../components/app/navbar'
import Sidebar from '../components/app/sidebar'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: {
    Navbar, Sidebar
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так :с')
    }
  }
}
</script>
