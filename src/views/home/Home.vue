<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" ref="hSwiper"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control"/>
    <ul>
      <li>哈哈哈1</li>
      <li>哈哈哈2</li>
      <li>哈哈哈3</li>
      <li>哈哈哈4</li>
      <li>哈哈哈5</li>
      <li>哈哈哈6</li>
      <li>哈哈哈7</li>
      <li>哈哈哈8</li>
      <li>哈哈哈9</li>
      <li>哈哈哈10</li>
      <li>哈哈哈11</li>
      <li>哈哈哈12</li>
      <li>哈哈哈13</li>
      <li>哈哈哈14</li>
      <li>哈哈哈15</li>
      <li>哈哈哈16</li>
      <li>哈哈哈17</li>
      <li>哈哈哈18</li>
      <li>哈哈哈19</li>
      <li>哈哈哈20</li>
      <li>哈哈哈21</li>
      <li>哈哈哈22</li>
      <li>哈哈哈23</li>
      <li>哈哈哈24</li>
      <li>哈哈哈25</li>
      <li>哈哈哈26</li>
      <li>哈哈哈27</li>
      <li>哈哈哈28</li>
      <li>哈哈哈29</li>
      <li>哈哈哈30</li>
      <li>哈哈哈31</li>
      <li>哈哈哈32</li>
      <li>哈哈哈33</li>
      <li>哈哈哈34</li>
      <li>哈哈哈35</li>
      <li>哈哈哈36</li>
      <li>哈哈哈37</li>
      <li>哈哈哈38</li>
      <li>哈哈哈39</li>
      <li>哈哈哈40</li>
      <li>哈哈哈41</li>
      <li>哈哈哈42</li>
      <li>哈哈哈43</li>
      <li>哈哈哈44</li>
      <li>哈哈哈45</li>
      <li>哈哈哈46</li>
      <li>哈哈哈47</li>
      <li>哈哈哈48</li>
      <li>哈哈哈49</li>
      <li>哈哈哈50</li>
      <li>哈哈哈51</li>
      <li>哈哈哈52</li>
      <li>哈哈哈53</li>
      <li>哈哈哈54</li>
      <li>哈哈哈55</li>
      <li>哈哈哈56</li>
      <li>哈哈哈57</li>
      <li>哈哈哈58</li>
      <li>哈哈哈59</li>
      <li>哈哈哈60</li>
      <li>哈哈哈61</li>
      <li>哈哈哈62</li>
      <li>哈哈哈63</li>
      <li>哈哈哈64</li>
      <li>哈哈哈65</li>
      <li>哈哈哈66</li>
      <li>哈哈哈67</li>
      <li>哈哈哈68</li>
      <li>哈哈哈69</li>
      <li>哈哈哈70</li>
      <li>哈哈哈71</li>
      <li>哈哈哈72</li>
      <li>哈哈哈73</li>
      <li>哈哈哈74</li>
      <li>哈哈哈75</li>
      <li>哈哈哈76</li>
      <li>哈哈哈77</li>
      <li>哈哈哈78</li>
      <li>哈哈哈79</li>
      <li>哈哈哈80</li>
      <li>哈哈哈81</li>
      <li>哈哈哈82</li>
      <li>哈哈哈83</li>
      <li>哈哈哈84</li>
      <li>哈哈哈85</li>
      <li>哈哈哈86</li>
      <li>哈哈哈87</li>
      <li>哈哈哈88</li>
      <li>哈哈哈89</li>
      <li>哈哈哈90</li>
      <li>哈哈哈91</li>
      <li>哈哈哈92</li>
      <li>哈哈哈93</li>
      <li>哈哈哈94</li>
      <li>哈哈哈95</li>
      <li>哈哈哈96</li>
      <li>哈哈哈97</li>
      <li>哈哈哈98</li>
      <li>哈哈哈99</li>
      <li>哈哈哈100</li>
    </ul>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navBar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

  import {getHomeMultidata} from "network/home";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 1, list: []},
          'news': {page: 1, list: []},
          'sell': {page: 1, list: []}
        }
      }
    },
    created() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    activated: function () {
      this.$refs.hSwiper.startTimer()
    },
    deactivated: function () {
      this.$refs.hSwiper.stopTimer()
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: deeppink;
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 5;
  }

  .tab-control {
    position: sticky;
    top: 43px;
  }

</style>
