<template>
  <div>
    <div class="page-title">
      <h3>{{'Menu_Categories' | localize}}</h3>
    </div>
    <section>
      <loader v-if="loading" />
      <div class="row" v-else>
        <categoryCreate @created="addNewCategory" />
        <categoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">{{'emptyCategories' | localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import categoryCreate from '@/components/categoryCreate'
import categoryEdit from '@/components/categoryEdit'
import Loader from '../components/app/loader.vue'

export default {
  metaInfo () {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    categoryCreate, categoryEdit, Loader
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
