<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Bill' | localize}}</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="loading" />
    <div v-else class="row">
      <homeBill
        :rates="currency.rates"
      />
      <homeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import homeBill from '@/components/homeBill'
import homeCurrency from '@/components/homeCurrency'

export default {
  metaInfo () {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  name: 'home',
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.info = await this.$store.dispatch('fetchInfo')
      this.loading = false
    }
  },
  components: {
    homeBill, homeCurrency
  }
}
</script>
