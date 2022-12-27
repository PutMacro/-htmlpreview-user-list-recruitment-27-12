<template>
  <ul class="pagination">
    <li>
      <!-- could add :disabled="currentPage < 2" -->
      <a href="#" class="btn" @click.prevent="currentPage -= 1">
        <span aria-hidden="true">&lsaquo;</span>
      </a>
    </li>
    <!-- could add :disabled="page == '...'" -->
    <li v-for="page in visiblePages" :class="{active: page == currentPage}">
      <a href="#" class="btn"  @click.prevent="currentPage = page">
        {{ page }}
      </a>
    </li>
    <li>
      <!-- could add  :disabled="currentPage == totalPages" -->
      <a href="#" class="btn" @click.prevent="currentPage += 1">
        <span aria-hidden="true">&rsaquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
      perPage: { type: Number, default: 25 },
      totalCount: { type: Number, default: 0 },
      value: { type: Number, default: 1 },
      paginationBreaker: { type: Number, default: 0 },
    },
    data() {
      return {
        currentPage: 1,
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalCount / this.perPage);
      },
      setCurrentPage() {
        if (this.value <= this.totalPages && this.value >= 1) {
          this.currentPage = this.value;
        } else if (this.value > this.totalPages) {
          this.currentPage = Math.max(this.totalPages, 1);
        } else if (this.value < 1) {
          this.currentPage = 1;
        }
      },
      visiblePages() {
        const pages     = [];
        const pagesFrom = this.currentPage - this.paginationBreaker;
        const pagesTo   = this.currentPage + this.paginationBreaker;
        for (let i = 1; i <= this.totalPages; i++) {
          if (!this.paginationBreaker) {
            pages.push(i);
          } else if (i == 2) {
            pages.push(i >= pagesFrom - 1 ? 2 : '...');
          } else if (i == this.totalPages - 1) {
            pages.push(i <= pagesTo ? this.totalPages - 1 : '...');
          } else if (i < 2 || i == this.totalPages || (pagesFrom <= i && pagesTo >= i)) {
            pages.push(i);
          }
        }
        return pages;
      },
    },
    watch: {
      currentPage() {
        this.$emit('input', this.currentPage);
      },
      value() {
        this.setCurrentPage;
      },
      totalCount() {
        this.setCurrentPage;
      },
      perPage() {
        this.setCurrentPage;
      },
    },
    mounted() {
      if (this.totalPages > 0) {
        this.setCurrentPage;
      }
    },
})
</script>

<style scoped>
.active>a {
  background: #446641 !important;
}
</style>