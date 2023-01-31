<template>
  <el-menu
      router
      default-active="2"
      class="el-menu"
      unique-opend="true"
      active-text-color="#3963bc"
      background-color="rgb(25, 42, 94)"
      text-color="rgb(255,255,255)"
  >
    <el-sub-menu v-for="(item,index) in this.$router.options.routes" :key="index" :index="item.path"
                 class="el-sub-menu">
      <template #title>
        <span class="el-sub-menu-title">{{ item.name }}</span>
      </template>
      <el-menu-item v-for="(children) in item.children" :index="children.path" :key="children.id" id="test_id">
        {{ children.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script>
export default {
  name: "menu-tree",
  data() {
    return {
      menu_list: {
        "code": 0,
        "msg": null,
        "data": [
          {
            "id": "1",
            "parentId": 0,
            "title": "仪表盘",
            "path": "/dashboard",
            "icon": "dashboard",
            "sortNumber": 1,
            "status": "1"
          },
          {
            "id": "2",
            "parentId": 0,
            "title": "表单",
            "path": "/form/index",
            "icon": "form",
            "sortNumber": 2,
            "status": "1"
          },
          {
            "id": "3",
            "parentId": 0,
            "title": "nested",
            "path": "/nested",
            "icon": "nested",
            "sortNumber": 1,
            "status": "1"
          },
          {
            "id": "4",
            "parentId": 3,
            "title": "menu1",
            "path": "/menu1",
            "icon": null,
            "sortNumber": 1,
            "status": "1"
          },
          {
            "id": "7",
            "parentId": 3,
            "title": "menu2",
            "path": "/nested/menu2",
            "icon": null,
            "sortNumber": 2,
            "status": "1"
          },
          {
            "id": "5",
            "parentId": 4,
            "title": "menu1-1",
            "path": "/nested/menu1/menu1-1",
            "icon": null,
            "sortNumber": 1,
            "status": "1"
          },
          {
            "id": "6",
            "parentId": 4,
            "title": "menu1-2",
            "path": "/nested/menu1/menu1-2",
            "icon": null,
            "sortNumber": 2,
            "status": "1"
          }
        ]
      },
      requestMenus: [],
      requestMenus1: ['a', 1],
      temp1: []
    }
  },
  methods: {
    addRouteFn() {
      window.console.log('1111')
      this.$router.addRoute('home',{
        path: 'test_abc2',
        name: 'aaaaa',
        component: () => import( '@/view/home/test_abc2.vue'),
        meta: {
          name: "权限树",
          keepAlive: true,
          icon: "el-iton-umbrella"
        }
      })
      window.console.log(this.$router.options.routes)
    },
    menus(parentId) {
      const tree = []
      for (let i = 0; i < this.menu_list.data.length; i++) {
        const temp = this.menu_list.data[i]
        temp.meta = {title: temp.title, icon: temp.icon}
        if (temp.parentId === parentId) {
          // 递归子节点
          temp.children = this.menus(parseInt(temp.id))
          // if(temp.id === 3){
          //   console.log(temp.id)
          //   console.log(temp)
          // }
          tree.push(temp)
        }
      }
      return tree
    },
  },
  mounted() {
    // this.requestMenus = this.menus(0)
    // console.log(this.requestMenus)
    console.log(document.getElementById("test_id").innerText)
    // console.log('-------------------------2'+this.requestMenus)

  }
}
</script>

<style scoped>
.el-menu {
  border: none;
  --el-menu-hover-bg-color: rgb(67, 74, 80);
  --el-menu-text-color: white;
  --el-menu-bg-color: rgb(25, 42, 94);
}


</style>
