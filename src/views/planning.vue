<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
    <loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">{{'emptyCategories' | localize}} <router-link to="/categories">{{'addNewCategory' | localize}}</router-link></p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} {{'from' | localize}} {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div class="determinate"
          :class="[cat.pregressColor]"
          :style="{width: cat.progressPercent + '%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import loader from '../components/app/loader.vue'
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter'
export default {
  components: { loader },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          total += +record.amount
          return total
        }, 0)
      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const pregressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPercent,
        pregressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  }
}
</script>
