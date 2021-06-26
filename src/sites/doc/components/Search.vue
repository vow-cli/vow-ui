<!--
 * @Author: genfa.zeng
 * @Date: 2021-06-26 18:44:50
 * @Description: 搜索框
-->
<template>
  <div class="search-box">
    <input
      v-model="data.searchVal"
      type="text"
      class="search-box-input"
      placeholder="搜索"
      @focus="onfocus"
      @keyup="choseList"
    />
    <ul v-show="data.searchList.length > 0" class="search-list">
      <li
        v-for="(item, index) in data.searchList"
        :key="index"
        :class="data.searchCurName == item.name ? 'cur' : ''"
        @click="checklist(item)"
      >
        <router-link :to="item.name.toLowerCase()">
          {{ item.name }}
          <span>{{ item.cName }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { defineComponent, reactive, onMounted, watch } from 'vue'
import { nav } from '@/config.json'
export default defineComponent({
  name: 'Search',
  setup() {
    const data = reactive({
      nav,
      navList: [],
      searchIndex: 0,
      searchList: [],
      searchVal: '',
      searchCName: '',
    })
    onMounted(() => {
      nav.forEach((item) => {
        item.packages.forEach((value) => {
          data.navList.push(value)
        })
      })
    })
    watch(
      () => data.searchVal,
      (sVal) => {
        if (sVal) {
          data.searchList = data.navList.filter((item) => {
            if (item.show === false) return false
            const rx = new RegExp(sVal, 'gi')
            return rx.test(item.name + ' ' + item.cName + '' + item.desc)
          })
        } else {
          data.searchCName = ''
          data.searchIndex = 0
          data.searchList = []
        }
      }
    )

    const checklist = () => {
      data.searchVal = ''
      data.searchCurName = ''
      data.searchIndex = 0
    }
    const choseList = (e) => {
      let searchIndex = data.searchIndex
      if (e.keyCode == 40) {
        searchIndex++
      }
      if (e.keyCode == 38) {
        searchIndex--
      }
      if (searchIndex < 0) {
        searchIndex = 0
      }
      const searchList = data.searchList
      if (searchList.length > 0) {
        const cName = searchList[searchIndex] && searchList[searchIndex].name
        if (cName) {
          data.searchCurName = cName
          data.searchIndex = searchIndex
          if (e.keyCode == 13) {
            data.$router.push({
              path: '/' + searchList[searchIndex].name,
            })
            data.searchCurName = ''
            data.searchIndex = 0
            data.searchVal = ''
          }
        }
      }
    }
    return {
      data,
      onfocus,
      choseList,
      checklist,
    }
  },
})
</script>
<style lang="scss">
.search-box {
  position: relative;
  width: 200px;
  height: 36px;
  line-height: 36px;
  &-input {
    height: 32px;
    font-size: 14px;
    vertical-align: middle;
    color: #67799d;
    border: 1px solid #cfd4db;
    border-radius: 32px;
    padding: 0 12px;
    &:focus {
      cursor: auto;
      border-color: #3683d6;
    }
  }
}
.search-list {
  background: #fff;
  position: absolute;
  width: 300px;
  list-style: none;
  border: 1px solid #f2f2f2;
  z-index: 99999;
  top: 27px;
  padding: 0;
  li {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    a {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      padding-left: 40px;
      text-decoration: none;
      color: #666;
    }
    &:hover {
      // background: #6096ff;
      color: #fa2c19;
      a {
        color: #fa2c19;
      }
    }
  }
  .cur {
    background: #fa2c19;
    color: #fff;
    &:hover {
      color: #fff;
      font-weight: bold;
      a {
        color: #fff;
      }
    }
    a {
      color: #fff;
    }
  }
}
</style>
