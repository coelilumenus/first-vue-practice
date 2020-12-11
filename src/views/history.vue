<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <loader v-if="loading" />
    <p class="center" v-else-if="!records.length">Записей пока нет. <router-link to="/record">Создать новую запись</router-link></p>
    <section v-else>
      <historyTable :records="records" />
    </section>
  </div>
</template>

<script>
import historyTable from '@/components/historyTable'
import loader from '../components/app/loader.vue'
export default {
  name: 'history',
  data: () => ({
    loading: true,
    recrods: [],
    categories: []
  }),
  async mounted () {
    // this.records = await this.$store.dispatch('fetchRecords')
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  },
  components: {
    historyTable,
    loader
  }
}
</script>
