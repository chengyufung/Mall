<template>
    <div class="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar'
}
// 思路：
// 1.如果在下方有一个单独的TabBar组件，你如何封装？
//     自定义TabBar组件，在App中使用
//     让TabBar处于底部，并且设置相关样式
//     定义插槽
// 2.TabBar中显示的内容由外界决定
//     flex布局评分TabBar
//     定义TabBarItem，并且定义两个插槽：图片、文字
// 3.自定义TabBarItem，可以传入图片和文字    
//     给两个插槽外层包装div，用于设置样式
//     填充插槽，实现底部TabBar的效果
</script>

<style>
.tab-bar {
  display: flex;
  background-color:azure;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-shadow:0 -1px 5px rgba(100,100,100,0.1);
}
</style>
