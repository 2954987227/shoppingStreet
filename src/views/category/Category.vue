<template>
    <div id="category">
      <ul class="content">
        <li>商品1</li>
        <li>商品2</li>
        <li>商品3</li>
        <li>商品4</li>
        <li>商品5</li>
        <li>商品6</li>
        <li>商品7</li>
        <li>商品8</li>
        <li>商品9</li>
        <li>商品10</li>
        <li>商品11</li>
        <li>商品12</li>
        <li>商品13</li>
        <li>商品14</li>
        <li>商品15</li>
        <li>商品16</li>
        <li>商品17</li>
        <li>商品18</li>
        <li>商品19</li>
        <li>商品20</li>
        <li>商品21</li>
        <li>商品22</li>
        <li>商品23</li>
        <li>商品24</li>
        <li>商品25</li>
        <li>商品26</li>
        <li>商品27</li>
        <li>商品28</li>
        <li>商品29</li>
        <li>商品30</li>
        <li>商品31</li>
        <li>商品32</li>
        <li>商品33</li>
        <li>商品34</li>
        <li>商品35</li>
        <li>商品36</li>
        <li>商品37</li>
        <li>商品38</li>
        <li>商品39</li>
        <li>商品40</li>
        <li>商品41</li>
        <li>商品42</li>
        <li>商品43</li>
        <li>商品44</li>
        <li>商品45</li>
        <li>商品46</li>
        <li>商品47</li>
        <li>商品48</li>
        <li>商品49</li>
        <li>商品50</li>
      </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Category",
        data() {
          return {
            scroll: null
          }
        },
        mounted() {
          this.scroll = new BScroll('#category', {
            //值为0，1不能实时侦测
            //值为2不能监听惯性滚动，3都可以
            probeType: 3,
            click: true,//scroll内可以监听按钮
            pullUpLoad: true //监听上拉加载更多
          })

          //实时监听
          this.scroll.on('scroll', position => {
            //console.log(position);
          })

          //上拉加载回调函数
          this.scroll.on('pullingUp', () => {
            console.log('上拉加载更多');

            this.scroll.finishPullUp() //可以多次上拉加载
          })

        }
    }
</script>

<style scoped>
  #category {
    height: 150px;
    background-color: #ff8198;

    overflow: hidden;
  }
</style>
